---
layout: default
---
<h2>List of categories in this blog</h2>
<ul style="list-style-type: none; margin-left: 0">
{% assign categories = site.categories%}
{% for post in categories %}
    <li> {% for idx in post.parent_category %} &nbsp; -&nbsp; {% endfor %}
    <a class="category-name" href="{{ post.url }}">{{ post.title }}</a>
    </li>
{% endfor %}
</ul>