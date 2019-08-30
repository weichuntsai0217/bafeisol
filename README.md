
<h1 align="center">光速成為網頁前端工程師</h1>

<p align="center">我們是來解決問題的，不是來學習的。</p>

# 目標與課程概述

`bafeisol = Become a front-end engineer in the speed of light.`

網頁前端工程師（簡稱前端工程師）的目標就是要開發出網頁程式，提供使用者介面，讓使用者可以透過這個網頁程式去使用特定的網路服務。
例如我們每天在用的Google搜尋引擎，就是網頁程式的一個例子。

* 簡介課程如何安排，步調和概念為何
* 畫個圖讓讀者理解前端後端在一個網路服務中各司何職, 要用實際的網頁例子解釋
* 把需求細分，並將每個需求需要的工具列出來
* 告訴讀者，你不可能只需要會前端，你也要有基本的後端和資料庫知識才能跟其他工程師溝通。
* 告訴讀者，你一定要動手做才會進步。
* 每個章節都要有關鍵字整理表，並在影片中要示範怎麼透過關鍵字找到自己要的資訊（好的老師不只是教學生怎麼釣魚，還要教學生在沒有老師的情況下要怎麼辦）
* 若可能的話，每個章節要附關鍵字列表


# 工作環境準備


# 前端（front-end）

# 寫出你的第一個網頁 - 用一個範例貫通所有概念
* chrome可以讀取local電腦上的html檔，也可以讀取放在特定網址的html檔（後者是我們一般上網時的狀況）
* 馬上透過一個範例來讓讀者有感覺(要提醒讀者，這個範例是看一個大盤，小地方不理解沒關係，後面深究時會再細講)
  - 先寫HTML的部分
  - 再寫CSS的部分
  - 最後補上JavaScript
* 跟讀者說, 寫html跟打word差不多, 差別只在於
  - html要特別用不同的tag來表達文章的結構, word不特別需要
  - html透過css來改變樣式, word則是透過點選畫面上提供的各種功能來改變樣式
* 讓讀者首次接觸chrome的"檢查"功能
* 讓讀者知道如何寫註解(comment) for HTML, CSS, JavaScript
* 這個範例的結構再review一次，每張投影片show一個層級
  - `doctype` + `<html>`
  - `<head>`
    - `meta`
    - `title`
    - `style`
  - `<body>`: 真正會被render的內容都放在body內(除了script不會被render)
    - 非script tag
    - script tag
* 要有隨堂考試


## 教學重點
以目標為導向，目標分成幾個project為小目標來執行，每個project後要summary和整理從project中學到的東西，
每章結束後要有總整理的文件

## HTML - 網頁的文章結構
* 稍微細一點介紹html tag的general 結構和html elements
網頁就是用來呈現資訊以及和使用者互動，在呈現資訊時就跟寫文章一樣，
我們寫文章時會有標題、內文．．．等不同的文章結構，對於這些不同的結構
我們使用不同的tag來區別(例如標題用`<h>` 文章段落用`<p>`。
* 不同的tag
  - 語意不同
  - style不同
  - 和使用者互動所提供的介面可能不同
  - 擁有的屬性可能不同
重點在於SEO（Search Engine Optimization）。
雖說不同的tag 其 style也不同, 但幾乎都可以透過CSS來進行style的改變, 因此tag的重點並不在於style

* 在`<meta>` tag內要講UTF-8的設定以及為何要設定這個，讓讀者試試設定成其他的文字編碼並看看會不會出現亂碼
* 介紹"render"這個術語
* 要交代html的樹狀結構，這對CSS Selector 和 JavaScript 找DOM都有幫助
  - parent, child, ancestor, descendant,

## CSS - 網頁的**樣式（style）**
* class的使用情境
  - 同樣的tag卻需要不同的style
  - 不同的tag需要相同的style
  - 1個tag可以使用多個class, 代表它既屬於a類, 也同時屬於b, c, d 類
* 色碼小常識, 6碼或3碼色瑪如何對應rgba (ex: `#1f8dd6`)
* css selector
* display 為 block 的 element 的 vertical margin (margin-top and margin-bottom)陷阱 - [margin collapse](https://www.sitepoint.com/collapsing-margins/)，但display為inline 或 inline-block
* display 為 inline-block 的 element, 會出現不預期的空白，例如
```
<html>
  <head>
    <style>
      div {
        width: 50%;
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <div></div>
      這樣會有空白
    <div></div>
      這樣會有空白
    <div>
      這樣不會有空白
    </div><div>
      這樣不會有空白
    </div>
  </body>
</html>
```
* 掌握layout者得天下
* Responsive Design:
  - 一定要加這行`<meta name="viewport" content="width=device-width, initial-scale=1">`, 否則在手機上看起來變成
    等比例縮小（要demo）
  - 關鍵是橫的變成直的。
  - 小icon的圖不用縮放，但大的圖要
  - 文字
* 把CSS獨立成一個檔案
* 練習使用css framework
* 字型檔
  - local電腦上的字型檔
  - 網路字型
* fontawesome

## 利用Chrome 來除錯
* 玩玩看Chrome的"檢查"功能

## JavaScript - 讓網頁動起來
讓網頁動起來的步驟超簡單
1. 找到DOM。
2. 為DOM添加監聽事件。
3. 決定事件觸發時要執行甚麼動作。

* 要把UI看成state machine，使用者的每個動作都是只是在改變state，瀏覽器再按照新的state把畫面render出來
* 不同的`<script>`其實都是在run同一個js程式
* 把JavaScript獨立成一個檔案
* js是single thread
* Bootstrap 4

# 後端（back-end）
* 解釋網路是如何運作
* 畫個圖讓讀者理解前端後端在一個網路服務中各司何職, 要用實際的網頁例子解釋

# 資料庫（database）

# http vs https

# 身份認證（Authentication）
* 在傷口上灑鹽 - 密碼與salt
* 不要存密碼在資料庫，只能存hash過的字串和salt

# 完成一個有前端+後端+資料庫+身份認證的網站
* 必須要有一個cookie或session storage來讓user維持登入狀態

# 版本控制（version control）

# 唯快不破 - 最佳化你的網頁
* 增加CSS效能的寫法
* bundle tool - webpack
* 壓縮HTML
* 壓縮CSS
* 壓縮JavaScript
* 後端使用gzip

# 寫程式心得分享
* 剛起步時，專注在那些不容易有變化的部分/技能
* 別被framework迷惑
* 了解整個文化圈
* 有一定熟悉後，再來追新的framework

# 恭喜你，你現在不只會開發網站

HTML/CSS，JavaScript不但可以開發網站, 還可以開發桌面應用程式（Desktop Applications）

# 參考文獻
* [w3schools.com](https://www.w3schools.com/html/default.asp)
