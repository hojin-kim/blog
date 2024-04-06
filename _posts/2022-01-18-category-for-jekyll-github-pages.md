---
layout: post
title:  "Category for Jekyll Github pages"
date:   2022-01-18 22:20:00 +0900
category: blog
---
Now this blog has categories. 

There will be several ways, and here is how I did it. (I tried to write it in detail; I wish this helps somebody, especially, me after few years.) 

I omitted some css settings etc., so the result may be different from the one you see, and may looks bad. You can refer to my [github repo](https://github.com/hojin-kim/hojin-kim.github.io) to see the full codes. 

1. Set your `_config.yml` file. Add the following lines:

    ```yaml
    collections:
        categories:
            output: true
    ```

    Refer to [this link](https://jekyllrb.com/docs/collections/) to know what the collections are. 
    
    We are making `categories` collection with `output: true` option. This option means that we will have the page of each category, for example [(blog-url)/category/miscellaneous]({{ site.url }}/{{ site.baseurl }}category/miscellaneous) for the '<span class="category-name">miscellaneous</span>' category. Let's call them 'category pages'.
    
    The category page will show the list of posts in corresponding category.

2. Now determine the set of categories you want. 
    In this moment, I think two categories, <span class='category-name'> miscellaneous</span> and <span class='category-name'>blog</span>, are enough. Of course you can add more later. 
    
    I set `category` as the key for category assigning. You can simply put `category: blog` or `category: miscellaneous` in the front matter of each post. For example, front matter of this page is as follows:

    ```markdown
    ---
    layout: post
    title:  "Added category features on GitHub Pages"
    date:   2022-01-18 22:20:00 +0900
    category: blog
    ---
    ```

    Later, we can pick the cateory of certain post with Liquid command like {% raw %}`{{ page.category }}`{% endraw %} in other files.


3.  I want the category pages (see 1.) to show the list of posts under each category. To this, make a directory `/_categories/`, and two files `blog.md` and `miscellaneous.md` in it. For example, `/_categories/miscellaneous.md` file is as follows:

    ```markdown
    ---
    catname: "miscellaneous"
    layout: "category"
    permalink: "category/miscellaneous"
    ---
    ```
    
    (Note that I set the key of the category as `catname`. There are no reason to avoid `category`, but I felt somewhat uncomfortable to use the same key for ordinary posts.)

    `permalink` sets the url of this file as `(your-blog-url)/category/miscellaneous`. I want to locate 'category page' for <span class='category-name'>miscellaneous</span> category here. 
    
    The category pages need their own layout to show the post lists; so I set `layout: category`. Now, we have to make `/_layout/category.html` file.

    (If you want to add another category, you have to make new `.md` file here.)

4.  Make `/_layout/category.html` file. The file is as follows:

    {% raw %}
    ```html
    ---
    layout: default
    ---
    
    <h2> List of posts under category {{ page.catname }} </h2>
    {% assign filtered_posts = site.posts | where: 'category', page.catname %}
    <ul>
    {% for post in filtered_posts %}
        <li> {{ post.date | date_to_string}} <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
    </ul>
    <hr>
    
    <h2> See all categories <a href="{{ site.baseurl }}/category">here</a></h2>
    ```
    {% endraw %}

    Let me explain this part by part. 
    *   I want to make a heading saying "List of posts under category (category name)". 
        {% raw %}
        ```html 
        <h2> List of posts under category {{ page.catname }} </h2>
        ```
        {% endraw %}
        does this. 
        
        Here, `page` refers to the `/_categories/miscellaneous.md` file. So, `page.catname` is `miscellaneous`. (Similar for `.../blog.md` file.) By this you can generate the appropriate heading for each category. 
    *   I want to make a list of posts under each category. 
        {% raw %}
        ```html
        {% assign filtered_posts = site.posts | where: 'category', page.catname %}
        <ul>
        {% for post in filtered_posts %}
            <li> {{ post.date | date_to_string}} <a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
        </ul>
        ```
        {% endraw %}

        Here, `page.catname` is 'miscellaneous', and `site.posts` is the list of all posts in `/_posts/` directory. The first line filters the list of posts with `category : miscellaneous` and call the filtered list as `filtered_posts`.
        
        The for loop `for post in filtered_posts` follows. For each post in filtered posts, the date (conveted into short format) and the title with link are shown. Note that `<ul> <li> ... </li> </ul>` is the standard HTML tag for list of items.

    *   Finally, I want to show the list of all categories in this blog. It can be given in this category page, but I thought that individuall page for the list of all categories can be exist. Since the category pages will be located in `(blog-url)/category/(category-name)`, I want `(blog-url)/category` to show the list of all category. Although there are no such page yet, we can make 
        {% raw %}`<h2> See all categories <a href="{{ site.baseurl }}/category">here</a></h2>`{% endraw %}
        line here.
    
5.  Make a file `/category.md` in the top level. This page should show the list of all categories. This can be done in almost same way explained in 4 above.

    {% raw %}
    ```html 
    <ul>
    {% assign categories = site.categories | sort: "title" %}
    {% for post in categories %}
        <li> <a href="{{ post.url }}">{{ post.title }}</a>
        </li>
    {% endfor %}
    </ul>
    ```
    {% endraw %}
    
    Since the `.md` files for all categories are in `/_categories/`, you can list the `.md` files with `site.categories`. Full `.md` file is as follows:

    {% raw %}
    ```html 
    ---
    layout: default
    ---
    <h2>List of categories in this blog</h2>
    <ul>
    {% assign categories = site.categories | sort: "title" %}
    {% for post in categories %}
        <li> <a class="category-name" href="{{ post.url }}">{{ post.title }}</a>
        </li>
    {% endfor %}
    </ul>
    ```
    {% endraw %}

The main structure for the category is done. I made some minor changes; 

{:start="6"}
6. Each post should show in what category they are; See `/_layouts/post.html`, especially the following part:
    
    {% raw %}
    ```html
    {%- if page.category -%}
        • posted on  <a class="category-name" href="{{ site.baseurl }}/category/{{ page.category | escape }}">{{ page.category | escape }}</a> 
    {%- endif -%}
    ```
    {% endraw %}

7. There is a list of recent posts in the [main page]({{ site.url | escape}}/{{site.baseurl}}). With the date of each posts, the category of each post are now shown in the list. See `/_layouts/home.html', especially the following part: 
    
    {% raw %}
    ```html
    <span class="post-meta">{{ post.date | date: date_format }}{% if post.category %} &nbsp/&nbsp in 
          <a class="category-name" href="{{ site.baseurl }}/category/{{ post.category }}"> {{ post.category }} </a>{% endif %}

    </span>
    ```
    {% endraw %}

8. To distinguish the style for the category names, I made a new css class in `_sass/minima/_layout.scss`.
    
    ```css
    .category-name{
    font-variant-caps:all-small-caps;
    font-weight: bold;
    }
    ```

    So the category names are shown bold and in smallcaps. I covered all the category names with `<span class="category-name">` and `</span>`. 