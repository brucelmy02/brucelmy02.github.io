# Render this site's content with the same Liquid/Markdown building blocks as Jekyll.
require 'yaml'
require 'json'
require 'fileutils'
require 'securerandom'
ROOT = File.expand_path('..', __dir__)
%w[liquid-4.0.4 kramdown-1.17.0 sass-3.4.25].each do |name|
  $LOAD_PATH.unshift(File.join(ROOT, '.preview-gems', 'gems', name, 'lib'))
end
require 'liquid'
require 'kramdown'
require 'sass'

Dir.chdir(ROOT)
output = File.expand_path(ARGV.fetch(0, '.preview'))

def strip_front_matter(text)
  text.sub(/\A---[ \t]*\r?\n.*?^---[ \t]*\r?\n/m, '')
end

def expand_includes(text, base, stack = [])
  text.gsub(/\{%\s*include_relative\s+([^%]+?)\s*%\}/) do
    path = File.expand_path(Regexp.last_match(1).strip, base)
    raise 'Include must be within the project' unless path.start_with?(ROOT + '/')
    raise "Recursive include: #{path}" if stack.include?(path)
    expand_includes(File.read(path), File.dirname(path), stack + [path])
  end
end

module PreviewFilters
  def relative_url(input)
    base = @context.registers[:site].fetch('baseurl', '').to_s.sub(%r{/$}, '')
    "#{base}/#{input.to_s.sub(%r{\A/}, '')}"
  end
end
Liquid::Template.register_filter(PreviewFilters)
site = YAML.load_file('_config.yml')
site['data'] = {}
Dir['_data/**/*.{yml,yaml,json}'].sort.each do |path|
  keys = path.sub('_data/', '').sub(/\.(yml|yaml|json)$/, '').split('/')
  target = site['data']
  keys[0...-1].each { |key| target = (target[key] ||= {}) }
  target[keys.last] = YAML.load_file(path)
end
body = expand_includes(strip_front_matter(File.read('index.md')), ROOT)
body = Liquid::Template.parse(body, error_mode: :strict).render!(
  {'site' => site}, registers: {site: site})
body = Kramdown::Document.new(body).to_html
html = Liquid::Template.parse(File.read('_layouts/homepage.html'), error_mode: :strict).render!(
  {'site' => site, 'content' => body}, registers: {site: site})
styles = {}
Dir['assets/css/*.scss'].each do |path|
  styles[path.sub(/\.scss$/, '.css')] = Sass::Engine.new(
    strip_front_matter(File.read(path)), syntax: :scss,
    load_paths: [File.join(ROOT, '_sass')], style: :expanded).render
end
# Every successful build shares its token with the server, including --build-only.
revision = SecureRandom.uuid
# Only the local preview gets this reload script; published templates stay clean.
reload = <<~HTML
  <script>
  (() => {
    let revision = #{revision.to_json};
    setInterval(async () => {
      try {
        const response = await fetch('/__preview/version', {cache: 'no-store'});
        if (!response.ok) return;
        const next = (await response.json()).revision;
        if (next === null) return;
        if (revision !== undefined && next !== revision) location.reload();
        revision = next;
      } catch (_) {}
    }, 1000);
  })();
  </script>
HTML
html = html.sub('</body>', reload + '</body>')
# Parse and compile before replacing the last successfully generated page.
FileUtils.mkdir_p(output)
File.open(File.join(output, '.build.lock'), 'w') do |lock|
  lock.flock(File::LOCK_EX)
  FileUtils.cp_r('assets', output)
  # Copying alone leaves removed source files available in the preview.
  Dir.glob(File.join(output, 'assets', '**', '*'), File::FNM_DOTMATCH).each do |path|
    next if ['.', '..'].include?(File.basename(path))
    relative = path.sub(output + '/', '')
    next if File.exist?(File.join(ROOT, relative)) || styles.key?(relative)
    FileUtils.rm_rf(path)
  end
  destination = File.join(output, 'resume.pdf')
  FileUtils.rm_f(destination)
  FileUtils.cp('resume.pdf', destination) if File.exist?('resume.pdf')
  styles.each { |path, css| File.write(File.join(output, path), css) }
  temporary = File.join(output, 'index.html.new')
  File.write(temporary, html)
  File.rename(temporary, File.join(output, 'index.html'))
  temporary = File.join(output, 'revision.json.new')
  File.write(temporary, {'revision' => revision}.to_json)
  File.rename(temporary, File.join(output, 'revision.json'))
end
