<h2 id="publications">Publications &amp; Preprints</h2>
<div class="publications">
{% assign groups = "published,preprint" | split: "," %}
{% for group in groups %}
<h3>{% if group == "published" %}Published{% else %}Preprints{% endif %}</h3>
<ol class="bibliography">
{% for paper in site.data.publications.main %}
{% if paper.group == group %}
{% assign paper_pdf = paper.pdf | default: "" %}
{% assign paper_code = paper.code | default: "" %}
{% assign paper_website = paper.website | default: "" %}
<li class="publication-entry{% if paper.image and paper.image != empty %} has-figure{% endif %}">
  {% if paper.image and paper.image != empty %}
  <div class="publication-visual">
    <a class="figure-link" href="{{ paper.image }}" aria-label="View full figure: {{ paper.image_alt | escape }}">
      <img class="paper-figure" src="{{ paper.image }}" alt="{{ paper.image_alt | escape }}" loading="lazy" width="{{ paper.image_width }}" height="{{ paper.image_height }}">
    </a>
    <span class="venue-badge">{{ paper.conference_short }}</span>
    {% if paper.image_credit and paper.image_credit != empty %}<small class="figure-credit">{{ paper.image_credit }}</small>{% endif %}
  </div>
  {% endif %}
  <div class="publication-details">
    <div class="title">{% if paper.pdf and paper.pdf != empty %}<a href="{{ paper.pdf }}">{{ paper.title }}</a>{% else %}{{ paper.title }}{% endif %}</div>
    {% if paper.authors and paper.authors != empty %}<div class="author">{{ paper.authors }}</div>{% endif %}
    <div class="periodical"><em>{{ paper.conference }}</em>{% if paper.notes and paper.notes != empty %} · <span class="contribution">{{ paper.notes }}</span>{% endif %}</div>
    {% if paper_pdf != "" or paper_code != "" or paper_website != "" %}<div class="links">
      {% if paper.pdf and paper.pdf != empty %}<a class="btn" href="{{ paper.pdf }}">Paper</a>{% endif %}
      {% if paper.code and paper.code != empty %}<a class="btn" href="{{ paper.code }}">Code</a>{% endif %}
      {% if paper.website and paper.website != empty %}<a class="btn" href="{{ paper.website }}">Website</a>{% endif %}
    </div>{% endif %}
  </div>
</li>
{% endif %}
{% endfor %}
</ol>
{% endfor %}
</div>
