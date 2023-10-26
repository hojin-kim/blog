---
layout: post
title:  "TeX Enabling on the Jekyll Github Pages"
date:   2022-01-17 21:19:00 +0900
category: blog
---

I enabled the MathJax $$\TeX$$ renderer on my Jekyll github page. 

For example, `$$\int_0^\infty \frac{\sin x }{x} dx = \frac{\pi}{2} $$` is rendered as

$$\int_0^\infty \frac{\sin x }{x} dx = \frac{\pi}{2}$$

How to (TL;DR): add the MathJax snippet in your html file which is imported in all pages of your site. To determine where to add the snippet, check `_layouts/default.html` or similar page.

How to (detail):
1. Basically, it is enough to add the following MathJax snippet at the end of the `<body>` tag (or `<head>` tag, etc.): 
```js
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
    I'm not to explain how the jekyll page is rendered in detail; naively, it says that the `head.html` file will be imported at {% raw %} `{%- include head.html -%}` {% endraw %}, and so on. To add the MathJax snippet at the end of the `<body>` tag, it would be okay to add it in this `default.html` file, but I'd rather add it at the end of the `footer.html` file. (I feel somewhat uncomfortable to modify the layout file.)
4. So, open `/_includes/footer.html` file and add the snippet at the very end of the file. 

To use the math equations, you can do as {% raw %}`$$ (your equation) $$`{% endraw %}. It is rendered as inline style when it is used inline, and as displaystyle when it is used in separate paragraph. For example, 

{% raw %}
```
Compare the inline style $$\sum_{i=1}^n i^2 = \frac{n(n+1)(n+\frac{1}{2})}{3}$$ and

$$\sum_{i=1}^n i^2 = \frac{n(n+1)(n+\frac{1}{2})}{3}$$ 

the display style.
```
{% endraw %}

Compare the inline style $$\sum_{i=1}^n i^2 = \frac{n(n+1)(n+\frac{1}{2})}{3}$$ and

$$\sum_{i=1}^n i^2 = \frac{n(n+1)(n+\frac{1}{2})}{3}$$ 

the display style.

--- 
update (2022-01-19)

I wrote that `$$...$$` will work for both inline & display math modes. However it doesn't work properly for the inline math equations in the title of posts. (I'm not sure why it works in post content.) So we need explicit delimiters for both inline mode and displaymath mode.

The default delimeter for inline math equation is `\\( ... \\)`. (Refer to the [MathJax documentatation](https://docs.mathjax.org/en/latest/options/input/tex.html).) Since single `$` sign is used frequently, it is not recommended to use this as delimeter in general situation. However, I think I'll not use `$` symbols for other uses, so I set  both of `$...$` and ``\\(...\\)`` as inline math delimeters. 

To do this, I added the following lines in `_includes/footer.html` file:

```html
<script>
  MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']] // Default is ['\\(', '\\)']
    },
  };
</script>
<!-- The below is the snippet added before.-->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

--- 
update (2023-10-26)

This blog uses MathJax for the $$\TeX$$ rendering, but it does not support some packages. I wanted to include some commutative diagrams with `tikz-cd`, so it was an issue. My workaround is simply to attach the pre-rendered SVG image of it. 

To get the standalone images of commutative diagrams, I used [tikz2svg](https://juan.benet.ai/blog/2014-03-09-tikz2svg/), which is dependent on [pdf2svg](https://formulae.brew.sh/formula/pdf2svg). 

I'm not sure if the scaling of SVG would align with the MathJax equations. This would be one of the TODOs.