---
layout: post
title:  "Subcategory for Jekyll Github pages"
date:   2022-01-19 22:30:00 +0900
category: blog
---
Now this blog has subcategories. Check [math](https://blog.hojin.kim/category/math) category page and its subcategory [math/number-theory](https://blog.hojin.kim/category/math/number-theory) category page. The depth of subcategories can be greater than 2.

I don't like the way I implemented this feature, so I don't want to explain it in detail. Check the [difference](https://github.com/hojin-kim/blog/commit/a44f42d5ab9325a0d684d625407e7e10ce74a54c) to see the changes.

In brief, 
* I defined the category structures like `math/number-theory`. The `category` key of each post can be given like `category: math` or `category: math/number-theory`, etc.
* I added the directories to resemble the category structure and corresponding `.md` files in `_categories/`. For example, the category structure for now is
    ```
    blog
    math
       └number-theory
    miscellaneous
    ```
  and the corresponding `_categories/` structure is 

    ```
    _categories/
              └math/
                  └number-theory.md
              └blog.md
              └math.md
              └miscellaneous.md
    ```
    (Note that the slash symbol at the end of `(directory_name)/` means that it is a directory, not a file.)
  
  Each file in `_categories/` has new key `parent_category` whose value is all of its ancestors (from top level to lower level). For example, `_categories/math/number-theory.md` file has 
  ```
    ---
    catname: "math/number-theory"
    parent_category: ["math"]
    layout: "category"
    permalink: "category/math/number-theory"
    ---
  ```
  
*  I modified `_layouts/category.html`, `category.md` files.
    * The `_layouts/category.html` file shows the list of post under the category. Now,
        * it makes the hyperlinks to all of its ancestors category in heading, and 
        * it shows the list of its descendant categories (if it has any).
    * The `category.md` file shows the list of all categories of the blog. Now,
        * it shows the list of all categories with tree-like structure with indentation.

Possible issues on this implementation:
* I think there are no `startswith`-like command for strings in Jekyll. I used `contains` instead; this means that I cannot make subcategory with another category name. For example, `math/history-of-mathematics` category will cause some problems.
* `_layouts/category.html` file uses both of the string for category, for example `math/number-theory`, and the list of its ancestors, for example `["math"]`. This is absurd, and the structure can be simplified. 
  * (2022.1.20.) Now the variable `parent_category` of category page is not used.

--- 
Minor update on 8th April 2024: Some urls have been updated since the blog url has been changed.