---
layout: post
title:  "TeX Enabling on the Jekyll Github Pages"
date:   2022-01-17 21:19:00 +0900
categories: miscellaneous
---

I enabled the MathJax $$\TeX$$ renderer on my Jekyll github page. 

For example, `$$\int_0^\infty \frac{\sin x }{x} dx = \frac{\pi}{2} $$` is rendered as

$$\int_0^\infty \frac{\sin x }{x} dx = \frac{\pi}{2}$$

How to: 
1. Basically it is enough to add the following MathJax snippet at the end of the `<body>` tag (or `<head>` tag, etc.): 
```javascript
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```
This code is from the [MathJax website](https://www.mathjax.org/#gettingstarted).
2. Since you are customizing the jekyll theme, you need to copy the files in your theme gem file. For example, if you are using `minima` theme, check the installed location, for example, with termial command `$bundle info minima --path`. Copy & paste all directories in your github page home directory. 
3. Open `/_layouts/default.html` (with your text editor not web browser) to check the html structure. 
    ```html
    {% raw %}
    <!DOCTYPE html>
    <html lang="{{ page.lang | default: site.lang | default: "en" }}">

    {%- include head.html -%}

    <body>

        {%- include header.html -%}

        <main class="page-content" aria-label="Content">
        <div class="wrapper">
            {{ content }}
        </div>
        </main>

        {%- include footer.html -%}

    </body>

    </html>
    {% endraw %}
    ```
    I'm not to explain how the jekyll page is rendered. Naively, it says that the `head.html` file will be imported at {% raw %} `{%- include head.html -%}` {% endraw %}, and so on. To add the MathJax snippet at the end of the `<body>` tag, it would be okay to add it in this `default.html` file, but I'd rather add it at the end of the `footer.html` file. (I feel somewhat uncomfortable to modify the layout file.)
4. So, open `/_includes/footer.html` file and add the snippet at the very end of the file. 
5. To use the math equations, you can do as {% raw %}`$$ (your equation) $$`{% endraw %}.
