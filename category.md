---
layout: default
---
<h2>List of categories in this blog</h2>
<ul style="list-style-type: none; margin-left: 0">
{% assign categories = site.categories %}
{% for post in categories %}
    {% assign parent_categories = post.catname | split: "/" %}
    <li> {% for idx in parent_categories %} &nbsp; {% if forloop.rindex==1 %} &nbsp; - {% endif %}{% endfor %}
    <a class="category-name" href="{{ post.permalink }}">{{ post.title }}</a>
    </li>
{% endfor %}
</ul>