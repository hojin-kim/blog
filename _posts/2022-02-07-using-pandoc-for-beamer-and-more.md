---
layout:   post
title:    "Using pandoc for beamer and more / Pandoc 을 이용하여 beamer 및 기타 문서 만들기"
date:     2022-02-07 12:30:00 +0900
lastmod:  2022-02-07 12:30:00 +0900
category: miscellaneous
---
This post is written in English and Korean. Keep scrolling down or [click Here](#한국어) for the korean version.

이 포스트는 영어와 한국어로 작성되었습니다. 한국어로 읽으시려면 스크롤을 내리거나 [여기를 클릭](#한국어)하세요.

## English
I got to know [Pandoc](https://pandoc.org). This post is written to give a brief introduction on it. 

Pandoc is a tool that converts various types of documents to other types of documents, including markdown, latex (and beamer) files and their resulting pdf files, html, docx, pptx, etc. Making beamer file is not happy (at least) for me; the structured md file is much easier to make, edit and read. It would be a better and faster way to make a beamer.  to write a markdown file, convert it via pandoc, and edit some details. 

### How to use it 
I use MacOS; refer to other guides for windows, etc. 

1. [Install pandoc](https://pandoc.org/installing.html). I use MacOS, and `homebrew` worked fine. 
    ```
    $ brew install pandoc
    ```
    I have LaTeX installed on my machine. I didn't check if some more installation steps are needed for the machines without pre-installed LaTeX.
2. Write a markdown file. The example `test.md` file is suggested [below](#example-md-file-and-some-example-outputs).
  * You need some YAML header lines, defining the title, author, date, beamer style and etc.
  * Titles (or sections) for each slides are denoted with heading `#` and `##` etc.  
3. Open terminal, and run 
    ```
    $ pandoc -t beamer test.md -o presentation.pdf
    ```
    to generate the beamer pdf file. (Of course you can change the filenames as you want.) Now you have the resulting `presentation.pdf` file. 

    If you want another format, you can do 
      * `$pandoc test.md -o pdf.pdf` to generate a pdf file (via LaTeX),
      * replace `pdf.pdf` into `html.html` to generate an html file, 
      * into `docx.docx` for a docx file, 
      * into `tex.tex` for a raw tex file.
      * `$pandoc -t beamer test.md -o beamer.tex` generates a raw tex file for beamer. 

### Some remarks
* You can run pandoc online [here](https://pandoc.org/try/). Not all features are possible; for example you cannot get `.pdf` files. (You can get `.tex` files which generates `.pdf` files when compiled.)
* Some filetypes (e.g. html, tex) are generated as 'fragment', i.e. only the content are generated. If you run with `-s` option (for example `$ pandoc -s test.md --o html.html`) pandoc will generate the 'standalone' file, i.e. compliable `.tex` file with preamble lines, or valid `.html` file with `<head>` and `<body>` tags.
* To make the table of contents, add `toc: True` in YAML header, or run with `--toc` option. 
* You can use math equations with TeX math commands.
  * `$ equation $` will generate the (inline) math equations. 
  * For the display mode, `\[ equation \]` doesn't work properly. You have to use `$$ equation$$` .
* If you want to use section-title structures, define the sections and titles  with `#` and  `##` respectively and run with `--slide-level 2` option, for example
  ```
  $ pandoc -t beamer --slide-level 2 test.md -o presentation.pdf
  ```
* Every `#`-headers should be followed by a blank line.
* There are many more options for pandoc; refer to the [official documentation](https://pandoc.org/MANUAL.html); there is the [manual for the slides](https://pandoc.org/MANUAL.html#slide-shows) in the document.


## 한국어

[Pandoc](https://pandoc.org)에 대해서 알게 되어서 간단히 소개하는 글을 씁니다. 

Pandoc 은 여러 타입의 문서를 다른 타입의 문서로 변환해주는 프로그램입니다. (적어도) 저에게는 beamer 파일을 만드는 것이 유쾌하지는 않습니다. 구조적인 마크다운 파일을 만드는 것이 쓰고 편집하고 읽는 데에 훨씬 쉽습니다. 마크다운 파일을 간단하게 작성하고 바로 beamer로 변환해서 약간의 수정을 거쳐 사용하면 작업의 속도와 능률을 높일 수 있을 것 같습니다.

### 사용법
저는 MacOS를 씁니다. 윈도 등을 쓰시는 분은 다른 가이드 문서를 참고해주세요.

1. [Pandoc을 설치](https://pandoc.org/installing.html)하세요. 저는 MacOS를 쓰는데 `homebrew` 가 잘 작동했습니다. 
    ```
    $ brew install pandoc
    ```
    제 컴퓨터 환경에는 이미 LaTeX 등이 설치되어 있었습니다. LaTeX이 설치되어 있지 않은 환경에서 별도의 설치가 필요한지 확인해보지는 않았습니다.
2. Markdown 파일을 작성하세요. [아래](#example-md-file-and-some-example-outputs)에 있는 예시 `test.md` 문서를 참고하실 수 있습니다.
  * 제목, 저자, 날짜, beamer 스타일 등을 선언하기 위해 적절한 YAML header가 필요할 수 있습니다.
  * 각 슬라이드의 제목 (혹은 section)은 `#`, `##` 의 헤딩을 사용하여 작성하면 됩니다.
3. 터미널을 열고 다음을 실행하여 beamer pdf 파일을 생성하세요. 
    ```
    $ pandoc -t beamer test.md -o presentation.pdf
    ```
    (파일명은 당연히 적절하게 바꾸어도 됩니다.) 이제 `presentation.pdf` 파일이 생겼습니다. 

    다른 포맷의 결과물을 원하면, 
      * `$pandoc test.md -o pdf.pdf` 를 통해 LaTeX으로 생성된 pdf 파일을 얻을 수 있습니다.
      * `pdf.pdf` 를 `html.html` 로 바꾸면 html 문서를 얻습니다. 
      * `docx.docx` 는 docx 문서를 줍니다. 
      * `tex.tex` 는 `.tex` 파일을 줍니다. (이렇게 생성한 파일은 내용만 있고 필수적인 전처리부가 누락되어 있기 때문에 이 부분을 추가해주어야 합니다.)
      * `$pandoc -t beamer test.md -o beamer.tex` 는 beamer를 위한 `.tex` 파일을 생성합니다.    

### 노트
* [이 링크](https://pandoc.org/try/)에서 Pandoc을 온라인으로도 실행할 수 있습니다. 모든 기능이 제공되지는 않습니다. 예를 들면 `.pdf` 파일은 얻을 수 없습니다. (`.tex` 파일을 얻은 후에 직접 컴파일하여 `.pdf` 파일을 얻을 수 있습니다.)
* html, tex 등 몇 종류의 파일들은 '조각'(fragment)으로 생성됩니다. 즉 마크다운에서 제시된 내용들은 변환되지만 파일에 필수적인 부분은 누락될 수 있습니다. (예를 들면, 텍 파일의 전처리부는 생성되지 않습니다.) `-s` 옵션을 추가해서 실행하면 (예를 들어 `$ pandoc -s test.md --o html.html`) pandoc 은 독립된(standalone) 파일을 생성합니다. 즉 컴파일이 가능하도록 전처리부에 필요한 줄들이 모두 있는`.tex` 파일이나, `<head>`와 `<body>` 등을 모두 포함하는 정당한 `.html` 파일을 얻을 수 있습니다.
* YAML 헤더에 `toc: True`를 추가하면 목차가 생성됩니다. `--toc` 으로 실행해도 됩니다.
* TeX 수식 명령어를 사용하여 수식을 입력할 수 있습니다. 
  * `$ equation $` 은 (inline) TeX 수식을 생성합니다. 
  * displaymode 수식을 위해서는 `$$ equation$$` 를 사용해야 합니다. `\[ equation \]` 는 제대로 작동하지 않습니다. 
* section-title 구조를 사용하기 위해서는, section 과 각 슬라이드 제목을 각각 `#`와 `##` 로 선언하고 `--slide-level 2` 옵션을 추가하여 실행하면 됩니다. 즉, 터미널에서 다음과 같이 실행하면 됩니다. 
  ```
  $ pandoc -t beamer --slide-level 2 test.md -o presentation.pdf
  ```
* 모든 `#` 헤더 줄 직전에는 빈 줄을 남겨 두어야 합니다. 
* 많은 옵션과 설정들이 있습니다. [공식 문서](https://pandoc.org/MANUAL.html)를 참고하세요. 이 문서에는 [슬라이드 생성을 위한 매뉴얼](https://pandoc.org/MANUAL.html#slide-shows) 이 포함되어 있습니다. 

## Example md file and some example outputs
This is an example markdown file `my.md`.
```md 
---
title: How to use pandoc
subtitle: Markdown to Beamer and more
author: Hojin Kim
theme: Copenhagen
date: Feb 6, 2022

---

# What is Pandoc?
- [Pandoc](https://github.com/jgm/pandoc) is a Haskell library for converting from one markup format to another, and a command-line tool that uses this library. 

# Example: Markdown to Beamer
(For MacOS)

0. Install Pandoc.
1. Write a markdown file like this, and save it as `test.md`.
2. open terminal and run `$ pandoc -t beamer -o test.md presentation.pdf`
3. Now you have the resulting `presentation.pdf` file.

# Equations
Pandoc can also convert equations with `$inline$` and `$$displaymode$$`, like  $e^{i\pi}+1=0$ and $$\sin^2 x + \cos^2 = 1.$$
``` 
Following are the output files. 

### Beamer 
`$ pandoc -t beamer my.md -o beamer.pdf` generates [this file][beamer.pdf]. You can get the following raw file (without preambles) with 
`$ pandoc -t beamer my.md -o beamer.tex`. Use `-s` option to have all preamble lines. 
```tex
\begin{frame}{What is Pandoc?}
\protect\hypertarget{what-is-pandoc}{}
\begin{itemize}
\tightlist
\item
  \href{https://github.com/jgm/pandoc}{Pandoc} is a Haskell library for
  converting from one markup format to another, and a command-line tool
  that uses this library.
\end{itemize}
\end{frame}

\begin{frame}[fragile]{Example: Markdown to Beamer}
\protect\hypertarget{example-markdown-to-beamer}{}
(For MacOS)

\begin{enumerate}
\setcounter{enumi}{-1}
\tightlist
\item
  Install Pandoc.
\item
  Write a markdown file like this, and save it as \texttt{test.md}.
\item
  open terminal and run
  \texttt{\$\ pandoc\ -t\ beamer\ -o\ test.md\ presentation.pdf}
\item
  Now you have the resulting \texttt{presentation.pdf} file.
\end{enumerate}
\end{frame}

\begin{frame}[fragile]{Equations}
\protect\hypertarget{equations}{}
Pandoc can also convert equations with \texttt{\$inline\$} and
\texttt{\$\$displaymode\$\$}, like \(e^{i\pi}+1=0\) and
\[\sin^2 x + \cos^2 = 1.\]
\end{frame}
```


### Ordinary tex and pdf documents 
`pandoc my.md -o default.tex` generates the fragment `.tex` file as follows. 
{% raw %}
```tex
\hypertarget{what-is-pandoc}{%
\section{What is Pandoc?}\label{what-is-pandoc}}

\begin{itemize}
\tightlist
\item
  \href{https://github.com/jgm/pandoc}{Pandoc} is a Haskell library for
  converting from one markup format to another, and a command-line tool
  that uses this library.
\end{itemize}

\hypertarget{example-markdown-to-beamer}{%
\section{Example: Markdown to Beamer}\label{example-markdown-to-beamer}}

(For MacOS)

\begin{enumerate}
\def\labelenumi{\arabic{enumi}.}
\setcounter{enumi}{-1}
\tightlist
\item
  Install Pandoc.
\item
  Write a markdown file like this, and save it as \texttt{test.md}.
\item
  open terminal and run
  \texttt{\$\ pandoc\ -t\ beamer\ -o\ test.md\ presentation.pdf}
\item
  Now you have the resulting \texttt{presentation.pdf} file.
\end{enumerate}

\hypertarget{equations}{%
\section{Equations}\label{equations}}

Pandoc can also convert equations with \texttt{\$inline\$} and
\texttt{\$\$displaymode\$\$}, like \(e^{i\pi}+1=0\) and
\[\sin^2 x + \cos^2 = 1.\]
```
{% endraw %}
`pandoc my.md -o default.pdf` generates a corresponding [pdf file][default.pdf].

`pandoc my.md -o default.pdf -N` generates [this file][numbered_section.pdf]. The `-N` option will make the numbered sections.

### HTML 
`pandoc my.md -o html.html` generates the following fragment. 
```html
<h1 id="what-is-pandoc">What is Pandoc?</h1>
<ul>
<li><a href="https://github.com/jgm/pandoc">Pandoc</a> is a Haskell
library for converting from one markup format to another, and a
command-line tool that uses this library.</li>
</ul>
<h1 id="example-markdown-to-beamer">Example: Markdown to Beamer</h1>
<p>(For MacOS)</p>
<ol start="0" type="1">
<li>Install Pandoc.</li>
<li>Write a markdown file like this, and save it as
<code>test.md</code>.</li>
<li>open terminal and run
<code>$ pandoc -t beamer -o test.md presentation.pdf</code></li>
<li>Now you have the resulting <code>presentation.pdf</code> file.</li>
</ol>
<h1 id="equations">Equations</h1>
<p>Pandoc can also convert equations with <code>$inline$</code> and
<code>$$displaymode$$</code>, like <span
class="math inline"><em>e</em><sup><em>i</em><em>π</em></sup> + 1 = 0</span>
and <span
class="math display">sin<sup>2</sup><em>x</em> + cos<sup>2</sup> = 1.</span></p>
```

`pandoc -s my.md -o standalone.html` genetates [this html file][standalone.html]. 

### MS Office documents 
[docx][docx] and [pptx][pptx] are generated by `pandoc my.md -o docx.docx` and `pandoc my.md -o pptx.pptx` respectively.

---
[beamer.pdf]: /assets/attachments{{ page.url}}/beamer.pdf
[default.pdf]: /assets/attachments{{ page.url}}/default.pdf
[numbered_section.pdf]: /assets/attachments{{ page.url}}/numbered_section.pdf
[standalone.html]: /assets/attachments{{ page.url}}/standalone.html
[docx]: /assets/attachments{{ page.url}}/docx.docx
[pptx]: /assets/attachments{{ page.url}}/pptx.pptx