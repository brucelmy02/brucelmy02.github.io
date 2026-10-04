"""Regression checks using isolated copies; never modify homepage content."""
import importlib.util
import io
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('preview', ROOT / 'scripts/preview.py')
preview = importlib.util.module_from_spec(spec)
spec.loader.exec_module(preview)


class PreviewTests(unittest.TestCase):
    def setUp(self):
        (ROOT / '.preview').mkdir(exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(dir=ROOT / '.preview')
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        for name in ('scripts', '_layouts', '_includes', '_sass', '_data', 'assets'):
            shutil.copytree(ROOT / name, self.root / name)
        for name in ('index.md', '_config.yml'):
            shutil.copy2(ROOT / name, self.root / name)
        (self.root / '.preview-gems').symlink_to(ROOT / '.preview-gems')
        self.output = self.root / '.preview'

    def render(self, success=True):
        result = subprocess.run(
            ['ruby', str(self.root / 'scripts/render_preview.rb'), str(self.output)],
            cwd=self.root, env=dict(os.environ, GEM_HOME=str(self.root / '.preview-gems'),
                                    GEM_PATH=str(self.root / '.preview-gems')),
            capture_output=True, text=True)
        self.assertEqual(result.returncode == 0, success,
                         f'exit {result.returncode}: {result.stderr} {result.stdout}')
        return (self.output / 'index.html').read_text()

    def test_blank_optional_links_and_analytics(self):
        config = self.root / '_config.yml'
        text = config.read_text()
        for key in ('google_scholar', 'github_link', 'canonical', 'avatar'):
            text = re.sub(r'^' + key + r':.*$', key + ': ""', text, flags=re.M)
        config.write_text(text)
        html = self.render()
        self.assertNotIn('href=""', html)
        self.assertNotIn('src=""', html)
        self.assertNotIn('google-analytics.com', html)
        self.assertNotIn('ai-cv', html)
        self.assertIn('social-icon-static', html)

    def test_blank_paper_links(self):
        papers = self.root / '_data/publications.yml'
        papers.write_text(json.dumps({'main': [{
            'title': 'Test paper', 'group': 'preprint',
            'pdf': '', 'code': '', 'website': '', 'image': ''}]}))
        html = self.render()
        self.assertNotIn('href=""', html)
        self.assertNotIn('src=""', html)
        self.assertNotIn('class="links"', html)

    def test_deleted_files_are_removed_from_output(self):
        asset = self.root / 'assets/probe.txt'
        asset.write_text('temporary asset')
        resume = self.root / 'resume.pdf'
        resume.write_bytes(b'temporary CV')
        self.render()
        self.assertTrue((self.output / 'assets/probe.txt').exists())
        self.assertTrue((self.output / 'resume.pdf').exists())
        asset.unlink()
        resume.unlink()
        self.render()
        self.assertFalse((self.output / 'assets/probe.txt').exists())
        self.assertFalse((self.output / 'resume.pdf').exists())

    def test_separate_builds_publish_matching_distinct_revisions(self):
        previous_output = preview.OUTPUT
        self.addCleanup(setattr, preview, 'OUTPUT', previous_output)
        preview.OUTPUT = self.output
        revisions = []
        for _ in range(2):
            html = self.render()
            handler = preview.Handler.__new__(preview.Handler)
            handler.path = '/__preview/version'
            handler.wfile = io.BytesIO()
            handler.send_response = lambda *args: None
            handler.send_header = lambda *args: None
            handler.end_headers = lambda: None
            handler.do_GET()
            revision = json.loads(handler.wfile.getvalue())['revision']
            self.assertIsNotNone(revision)
            embedded = re.search(r'let revision = (.+);', html).group(1)
            self.assertEqual(json.loads(embedded), revision)
            revisions.append(revision)
        self.assertNotEqual(*revisions)

    def test_failed_build_preserves_previous_page(self):
        html = self.render()
        (self.root / '_config.yml').write_text('invalid: [')
        self.assertEqual(self.render(success=False), html)


if __name__ == '__main__':
    unittest.main()
