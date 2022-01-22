---
layout: post
title:  "Setting LaTeX environment in vscode / vscode 에서 LaTeX 환경 설정하기"
date:   2022-01-22  22:30:00 +0900
category: misc
---
This post is written in English and Korean. Keep scrolling down or [click Here](#한국어) for the korean version.

이 포스트는 영어와 한국어로 작성되었습니다. 한국어로 읽으시려면 스크롤을 내리거나 [여기를 클릭](#한국어)하세요.

## English
I have used vscode for making LaTeX documents. (I recommend it! I had used TeXShop, which is also good one, but I found vscode more convinient; especially if 
* you are going to write some codes located in server-side (not in your own computer), or 
* you want to enjoy the powerful auto-completion tool [_Github Copilot_](https://copilot.github.com), or 
* you want to keep track your files via git, or 
* you want to use one editor for `.tex`, jupyter notebooks, and any other codes, 

then vscode would be the perfect choice in this moment.)

Today I set some enviroments, which I want to make a record here. 

My work environment is as follows: If you are window user, this post would be not helpful to you. 
- MacOS Monterey (12.1)
- vscode (1.63.2)
- LaTeX Workshop (v8.23.0)

### Installation
* Install [vscode](https://code.visualstudio.com). 
* Install vscode extension [LaTeX workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop). 

(This is enough for the default usage.)

### (Optional) Setting the default .sty or .bib files
Usually, I have copied one of my previous `.tex` file to make a new `.tex` file, since there are tens or hundreds of lines I one to use in each `.tex` file. This is not only inconvinient, but also cause some potential problems.

For example: 
* Sometimes I update some temporary lines in the preamble (which is useful only in a certain document) and these unnecessary lines will be accumulated in the follwing `.tex` files. 
* Also, sometimes I don't copy the most-recent `.tex` file to make a new `.tex` file, since I have many `.tex` files in many directories; then sometimes the preamble is out-dated, so i have to search for the command I have once defined in somewhere of my `.tex` files, and even worse, sometimes I redefine some command with same function in different name, or redefine some command with same name but with different function. When this happens, it is hard to memorize my custom commands, and it will be a disaster to merge such files in one `.tex` file.
* Similar problems might be caused in managing the `.bib` bibtex reference files. When you use several bibtex file, it would be horrible to merge two or more files in one `.tex` file (especially, when their citation keys are incohrent. It would be good idea to rely on some reference managers like `Mendeley`.) 

To avoid these problems, it would be good idea to manage a default `.sty` file[^sty_en]  and `.bib` file. When you want to update the preamble, update `.sty` file if the update is useful in future documents, and write the command in the preamble of the `.tex` file if the update is only for the current document[^prob_en]. 

However, it will give rise a new problem; where to put those files? How to remember their locations? Should I edit the importing line (like `\usepackage{../path/to/mystyle}`) in the `.tex` file whenever I move the location of my `.tex` file? 

There is an easy solution; you can set some environment variables and vscode setting. You can set the environment variables so that the TeX system can refer to the appropriate `.sty` file and `.bib` files. Also, you can set the vscode setting so that vscode can give a proper suggestion of custom command and citation key, or not to print some wrong error messages regarding on the custom commands. 

You can do as follows:
1. Set a location for style file and bibtex databse file: 
    * I made `~/.tex_configs/` directory, and put `mystyle.sty` file and `refs.bib` file in it. You can choose your own one.
2. Set environment variables: 
    * We are to edit the shell-rc file (like `~/.bash_profile` or `~/.zshrc`, etc, depeding on what shell you are using.) 
        * If you are not sure, you are using bash (because it is the default.). You can check it by typing `echo $SHELL` in the terminal.
    * Open corresponding rc file, and add the following two lines at the first line of the file:
        * `export TEXINPUTS=.:$HOME/.tex_configs:$TEXINPUTS`
        * `export BIBINPUTS=.:$HOME/.tex_configs:$BIBINPUTS`
        
        Note that the directory should be match with the one you made in 1. 

    Note that the shell which you set in 1. and the shell which the vscode is using might be different. They should be same in the default setting, but there are some possibilities, like you have changed this setting before for some other purpose. You might have to edit the corresponding rc file in such cases (or reset the vscode setting on it.)
    
    Also, the vscode might not using the shell you have chosen. Search `Automation profile` and edit `settings.json` file by adding `"terminal.integrated.defaultProfile.osx": "zsh" (or your shell)` at the very before of the last `}` in the file.

3. Set the vscode setting to suggest proper suggestion of custom command and citation key: 
    * Open the Settings. (`Command + ,`)
    * Search `texinputs` and edit `Latex-workshop › Latex: Tex Dirs`: add `~/tex_configs/` to `TeX Dirs`, and 
    * Similarly, search `bibinputs` and add `~/tex_configs/` to `Bib Dirs`.
    
    (You might have to restart vscode to make the setting take effect.)

4. When making new `.tex` file, Simply open a new file with vscode and start with 
    ```LaTeX 
    \documentclass{amsart} % or any other documentclass you like
    \usepackage{mystyle} % the .sty file you created & located in `$TEXINPUTS`
    \title{your awesome title}
    \begin{document}
    ...
    \bibliographystyle{amsplain}
    \bibliography{refs} % the .bib file you created & and located in `$BIBINPUTS`
    \end{document}
    ```

You can make a individual `.sty` files for your research, teaching, for beamer file, and other purposes. 

Now we are done. Happy $\TeX$ing with vscode!
        
## 한국어
저는 LaTeX 문서 편집을 위해 vscode 를 사용해 왔습니다. (추천합니다! TeXShop도 사용해 봤는데, 물론 좋은 소프트웨어이지만, 저에게는 vscode 가 더 잘 맞았습니다. 특히, 
* 서버에 있는 코드를 편집해야 하거나 
* [_Github Copilot_](https://copilot.github.com)과 같은 강력한 자동완성 툴을 사용하고 싶거나 
* git을 사용해서 문서의 편집을 추적하고 싶거나
* `.tex` 파일, jupyter 노트북, 그외 작성하는 다른 모든 코드를 한 에디터에서 편집하고 관리하고 싶거나

하다면, 현재로서는 vscode가 가장 좋은 소프트웨어일 것으로 생각합니다.)

오늘 몇가지 환경설정을 했는데요, 나중을 위해 여기 기록해두려고 합니다. 

저의 기본적인 작업 환경은 다음과 같습니다. window 사용자에게 이 글이 얼마나 도움이 될지는 잘 모르겠습니다.
- MacOS Monterey (12.1)
- vscode (1.63.2)
- LaTeX Workshop (v8.23.0)

### 설치
* [vscode](https://code.visualstudio.com) 를 설치하세요.
* vscode 확장 [LaTeX workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop)를 설치하세요. 

(기본적인 사용을 위해서는 여기까지가 끝입니다.)

### (Optional) 기본 .sty 파일과 .bib 파일을 설정하기
보통은, 저는 원래 만들어 두었던 `.tex` 파일 하나를 복사해서 새로운 `.tex` 파일을 만드는 편이었습니다. 전처리부에 있는 수십~수백줄의 코드를 가지고 다니기 위해서였는데요... 이것은 불편할 뿐더더러 잠재적인 여러 문제들을 발생시킬 수 있는 위험성이 있습니다. 

예를 들면, 
* 특정한 문서에서만 유용한 임시 명령어를 선언할 때가 있는데, 이 명령어가 다른 문서로 계속 누적될 가능성이 있습니다. 
* 또한 `.tex` 파일이 여기저기 많기 때문에 항상 가장 최신의 문서를 가져오지는 않게 됩니다. 가끔은 오래된 문서를 복제해서 시작하고, 그러면 예전에 선언한 명령을 다시 찾아다녀야 할 때도 있고요. 더 나쁘게는 전과 동일한 일을 하는 코드를 다른 명령어로 선언하거나, 전과 다른 일을 하는 코드를 동일한 명령어로 선언할 가능성이 있습니다. 이렇게 되면 custom 명령어를 기억하기도 어렵게 되고, 이렇게 흩어진 파일들을 나중에 합칠때 끔찍한 일이 생길 가능성이 있습니다. 
* `.bib` 형식의 bibtex 참고문헌 파일을 관리할 때도 비슷한 문제가 발생할 수 있습니다. 프로젝트마다 여러 bibtex 파일을 가지고 다니면 나중에 이런 문서들을 병합할 때 문제가 발생할 수 있습니다. (특히 citation key가 겹치는 경우가 문제가 될 것입니다. 사실 이를 위해서는 `Mendeley`와 같은 참고문헌 관리 도구의 도움을 받는 것이 좋을 수 있습니다.)

이런 문제를 해결하기 위해, 공통 `.sty` 스타일 문서[^sty_kr]와 공통 `.bib` bibtex database 문서를 관리하는 것이 좋은 해결책일 수 있습니다. 가끔 전처리부를 업데이트할 때는, 향후에 계속 사용할 명령어는 이 공통 `.sty` 파일에 추가하고, 해당 `.tex` 문서에서만 사용할 명령어는 그 문서에만 따로 추가하면 됩니다.[^prob_kr]

그런데 이 방법은 또다른 문제를 야기할 수 있습니다. `.sty` 파일과 `.bib` 파일은 어디에 두어야 할까요? 이 위치를 어떻게 안 잊어버릴 수 있을까요? 파일의 경로를 옮길 때마다 `\usepackage{../path/to/mystyle}`와 같은 `.sty` 파일을 불러오는 줄을 수정해 주어야 할까요? 

쉬운 방법이 있습니다. 환경변수와 vscode 설정 파일을 변경해주면 됩니다. `.sty` 파일과 `.bib` 파일을 어디서 불러올 지를 TeX 시스템에게 알려주기 위해 환경 변수를 설정하고, vscode가 적절한 명령어와 citation key 를 제안하고 엉뚱한 에러메시지를 출력하지 않도록 하기 위해 vscode 가 적절한 `.sty` 파일과 `.bib` 파일을 참고할 수 있도록 vscode 의 설정을 편집해 주면 됩니다. 

구체적으로는 다음과 같이 합니다. 
1. style 파일과 bibtex database 파일을 위치시킬 경로를 하나 만듭니다. 
    * 저는 `~/.tex_configs/` 디렉토리를 만들고 여기에 `mystyle.sty` 파일과 `refs.bib` 파일을 넣었습니다. 이것은 편한 대로 바꾸셔도 됩니다.
2. 환경변수를 설정합니다. 이것은 TeX 시스템이 바르게 작동하도록 하는 과정입니다.
    * 환경변수를 설정하기 위해 shell 설정 파일을 수정할 것입니다. (`~/.bash_profile` 나 `~/.zshrc` 같은 파일입니다. 어떤 shell을 사용하는지에 따라 다릅니다.)
        * 확실하지 않다면 아마 bash를 쓰고 계실 가능성이 높습니다. 터미널에 `echo $SHELL` 를 실행하면 무슨 셸을 사용하는지 알 수 있습니다. 
    * 맞는 설정 파일을 열고, 다음 두줄을 설정 파일 최상단에 복사 붙여넣기 합니다.
        * `export TEXINPUTS=.:$HOME/.tex_configs:$TEXINPUTS`
        * `export BIBINPUTS=.:$HOME/.tex_configs:$BIBINPUTS`
        
        `export ...` 에서 추가하는 디렉토리가 1.에서 설정한 것과 맞아야 합니다. 

    한편, vscode 가 사용하는 셸이 위에서 환경변수를 설정한 셸과 다를 수 있습니다. (보통은 같을 텐데, 앞서서 다른 작업을 위해 vscode에서 사용하는 셸을 변경해 둔 경우가 있으실 수도 있습니다. 이런 경우에는 다시 vscode 에서 사용하는 셸을 맞는 것으로 바꾸거나 (`command + ,` 설정에서 ` defaultprofile` 를 검색하여 설정) 혹은 vscode에서 사용하기로 한 셸과 맞는 셸 설정 파일을 변경해주면 됩니다. 

3. vscode 에 관련 설정을 추가합니다. 이것은 vscode가 적절한 명령어나 citation key를 제안하고, 잘못된 에러 메시지를 띄우지 않도록 설정하는 과정입니다.
    * 설정을 엽니다. (`Command + ,`)
    * `texinputs`를 검색해서 `TeX Dirs`를 설정합니다. `Latex-workshop › Latex: Tex Dirs` 설정에 `~/tex_configs/`를 추가하면 됩니다.
    * 비슷하게 `bibinputs`를 검색해서 `Bib Dirs`를 설정합니다. 똑같이 `~/tex_configs/` 를 추가하면 됩니다.
    
    (이후에 vscode를 한번 재실행해야 할 수 있습니다.)

4. 이제, 아무 위치에 새로운 `.tex` 파일을 만들고 vscode로 다음과 같이 시작하면 됩니다. 
    ```LaTeX 
    \documentclass{amsart} % or any other document class you like
    \usepackage{mystyle} % `$TEXINPUTS` 위치에 넣어 둔 custom .sty파일 이름
    \title{your awesome title}
    \begin{document}
    ...
    \bibliographystyle{amsplain} % or any other bibliography style you like
    \bibliography{refs} % `$BIBINPUTS` 위치에 넣어둔 custom .bib파일 이름
    \end{document}
    ```

각 용도에 맞게 연구용, 수업 자료용, beamer 용 및 기타 용도에 대한 `.sty` 파일들을 따로 만들 수도 있을 것입니다.

이것으로 끝입니다. vscode로 즐거운 $\TeX$질 하세요~

---

[^sty_en]: `.sty` file is a collection of TeX preamble lines. You can simply import this file with `\usepackage` command to import the preamble lines in this file.
[^prob_en]: One should be careful not to declare the same command names in both `.sty` and any `.tex` files. I'm not sure if there is a good tool to avoid such situations. One possible workaround would be to fix a prefix for temporary commands in each `.tex` files, for example, start all temporary commands with x, and not to start the commands in `.sty` file with x. I'm not sure if it is the best way to do it. It would be better to write a simple code to check the consistency and run it sometimes.

[^sty_kr]: 전처리부의 코드들을 모아놓은 파일이라고 생각하면 됩니다. 나중에 `\usepackage` 명령어로 이 파일에 있는 모든 전처리부 코드를 불러올 수 있습니다.

[^prob_kr]: `.sty` 파일을 업데이트할 때, 예전에 `.tex` 코드에서 사용한 적이 있는 명령어를 사용하지 않도록 주의하여야 합니다. 이런 일을 도와줄 수 있는 좋은 도구가 있는지는 모르겠습니다. 한가지 방법은 특정 파일에서만 사용하는 임시 명령어의 prefix를 정해주는 것일 텐데요, 예를 들면 임시 명령어는 항상 x로 시작하게 하고 공통 명령어는 x로 시작하지 않도록 하면 되겠습니다. 이것이 가장 좋은 방법일지는 모르겠습니다. 명령어 통일성을 검사하는 코드를 만들어서 가끔 돌려 보는 것이 더 좋을 수도 있겠습니다.