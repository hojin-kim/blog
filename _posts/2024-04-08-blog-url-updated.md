---
layout: post
title:  "Update on Blog URL"
date:   2024-04-08 01:30:00 +0900
category: blog
---

TL;DR: The url for this blog has been updated; it used to be `hojin-kim.github.io` and is now `blog.hojin.kim`. Also, `hojin.kim/blog` or `hojin-kim.github.io/blog` will redirect to the new url.

---

## There is a .kim top-level domain

I discovered that `.kim` exists as a top-level domain. I checked that `hojin.kim` was not taken, and I bought it.

And then I was confused about what to do with it. Finally, after a lot of trial and error, I decided and set up the following urls:

- `hojin.kim` for the academic homepage hosted by my affiliation, and
- `blog.hojin.kim` for this blog.

This took much longer than it should have, so I'm writing this post to summarize the process and to remind myself in the future (or to help someone else who is in the same situation).

## Setting up the `hojin.kim` domain

I bought the domain from [Porkbun](https://porkbun.com/); one of my friends said that the price here is good. (I didn't double-check if it is, so you might want to check other providers as well).

I decided to use `hojin.kim` for my academic homepage [mathsci.kaist.ac.kr/~hjkim](http://mathsci.kaist.ac.kr/~hjkim). Here are the steps I took:

- The domain provider said that I needed an IPv4 address for the root domain setting. I had no idea about this; after some research, I came to know that the tilde home directory generally does not have a dedicated IP address.
- It seemed that some web server configurations might do this; after checking the corresponding Apache2 configurations on `[dept webserver]:[...]/apache2/sites-available/` (with my read-only permission), I concluded that the server policy did not seem to allow such configurations for individuals. This means that I cannot link my personal domain directly to the academic homepage.
- A quick workaround is a redirection. Instead of having another web server like AWS, I decided to use the GitHub page.
- `hojin-kim.github.io` was already taken for this blog. After some more trial and error, I renamed the repository from `hojin-kim.github.io` to `blog`, so the blog url at that point was `hojin-kim.github.io/blog`.
  
  I was stuck at this point for a while, especially with the `site.baseurl` feature. 

  Say the url for a post in the blog is `hojin-kim.github.io/blog/math/20200101-title`. Then `hojin-kim.github.io` is `url`, and `/blog` is the baseurl, which means that all urls are follwed by url+baseurl. (The followed /math/20200101-title stands for the precise location of the post, relative to the url+baseurl).

  Since my original plan was to set the blog url to `hojin.kim/blog`, I changed the repository name into `blog`, and also set the `baseurl : /blog` in `[repo-root]\_config.yml`. (Note that `some` repository is published under `github-id.github.io/some`). Because of this change, I had to do the overall fix of several Jekyll files and posts, since I haven't take care of `baseurl` feature before (as it was empty).

  However, at last, the blog url is set to `blog.hojin.kim`, and `site.baseurl` is set to be empty again.
- Then I created the new repository `hojin-kim.github.io` for the root GitHub page, published it, and set the custom domain to `hojin.kim`.
- I made some settings on the domain provider website. I set the `CMAME` record to
  - TYPE: `CNAME`,
  - HOST: `www.hojin.kim`,
  - ANSWER: `hojin-kim.github.io.`.
- The apex domain (`hojin.kim`) was automatically set by the domain provider; if you did it manually, it would be look like this:
  - TYPE: `A`,
  - HOST: `hojin.kim`,
  - ANSWER: The IPv4 address of the GitHub page, `185.199.[x].153` with $108 \le x \le 111$. (I have four items for the setting.)
- Everything worked fine at that point. This resulted in
  - `hojin.kim` for `hojin-kim.github.io`, which redirects to the academic homepage, and
  - `hojin.kim/blog` for this blog `hojin-kim.github.io/blog`.

## Setting up the subdomain

Up until this moment, I was thinking of using `hojin.kim/blog` for this blog. However, I realized that it would be better to use `blog.hojin.kim` for the blog. The reasons are:

- Inconsistent physical directory structure.
  
  `hojin.kim/blog` makes me think that the blog is a subdirectory of the homepage, which is not true (although I know that this is technically irrelevant).
- The permanent url for the posts will be confusing.

  The url for the posts will be `hojin.kim/blog/categoryname/subcatname/YYYYMMDD-post-title` which is not only too long but also consists of too deep directories. This was tolerable, but there was a more serious problem; since I have a category called `blog`, some posts would have urls like `hojin.kim/blog/blog/YYYYMMDD-post-title`, which is super ugly.

So I decided to use `blog.hojin.kim` for the blog. I spent other hours on this, which shouldn't take that long. Actually, the steps are simple.

- Edit your Jekyll files again if needed. For example, I changed the `url` of `_config.yml`.

  I checked that everything worked fine when tested locally, but there were still some problems when hosted on GitHub. You might have to check the source code for the rendered html files, and check that each asset file (like `css` files) is linked correctly.
- Publish the repository, and set the custom domain to `blog.hojin.kim`.
- Make some settings on the domain provider. I set the `CMAME` record to
  - TYPE: `CNAME`,
  - HOST: `blog.hojin.kim`,
  - ANSWER: `hojin-kim.github.io.`,

  This was another time-consuming step for me. First I set the ANSWER slot to `hojin.kim/blog`. Since the DNS check failed, I tried `hojin-kim.github.io/blog` and so on. I thought the DNS propagation would take some time, so I waited for hours, and the problem was not solved. After some research, I realized that the ANSWER slot should be `hojin-kim.github.io.`. Note the dot at the end; this indicates that the domain is a [Fully Qualified Domain Name (FQDN)](https://en.wikipedia.org/wiki/Fully_qualified_domain_name).

## Remaining TODOs

- [ ] The Google search result now points to the outdated urls; I should check the Google Search Console and update the Sitemap. -- However, who cares? I mean, I know this site is very rarely visited.
- [ ] Some minor settings, like Disqus comments etc.
  - [ ] Disqus
  - [x] Sitemap.xml
  - [x] Robots.txt
  - [ ] Google Analytics 
  - [ ] Broken links in previous posts or etc?
  - [ ] Some other?
- [x] ~~Check if the `baseurl` thing was necessary. The existence of two working urls, `blog.[...]` and `[...]/blog`, is not pleasant and I want to check if I can get rid of the `baseurl` setting and deprecate the `[...]/blog` url. Maybe I should check the settings `url` (for the base hostname) and `baseurl` on `\_config.yml`.~~
  * Updated: `baseurl` is now removed again, with `url: blog.hojin.kim`.