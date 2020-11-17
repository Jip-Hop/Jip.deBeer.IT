---
layout: compress
---

var store = [
  {%- for c in site.collections -%}
    {%- if forloop.last -%}
      {%- assign l = true -%}
    {%- endif -%}
    {%- assign docs = c.docs | where_exp:'doc','doc.search != false' -%}
    {%- for doc in docs -%}

      {%- capture teaser -%}
        {%- if doc.header.image -%}
          {% include image image_path=doc.header.image max_width=doc.header.max_width max_height=doc.header.max_height class="page__hero-image" loading="lazy"%}
        {%- elsif doc.header.assets_image -%}
          <img src="{{ doc.header.assets_image | relative_url }}" alt="" width="{{doc.header.max_width}}" height="{{doc.header.max_height}}" class="page__hero-image">
        {%- else -%}
          <img src="{{ site.teaser | relative_url }}" alt="" width=16 height=9 class="page__hero-image">
        {%- endif -%}
      {%- endcapture -%}

      {
        "title": {{ doc.title | jsonify }},
        "excerpt":
          {%- if site.search_full_content == true -%}
            {{ doc.content | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
            strip_html | strip_newlines | jsonify }},
          {%- else -%}
            {{ doc.content | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
            strip_html | strip_newlines | truncatewords: 50 | jsonify }},
          {%- endif -%}
        "tags": {{ doc.tags | jsonify }},
        "url": {{ doc.url | relative_url | jsonify }},
        "teaser": {{ teaser | strip_newlines | strip | jsonify }}
      }{%- unless forloop.last and l -%},{%- endunless -%}
    {%- endfor -%}
  {%- endfor -%}]
