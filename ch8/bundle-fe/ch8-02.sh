#!/bin/bash

# ch8-02: 先npm init, 再使用npm install 安裝以下模組
npm init -y
npm install precss autoprefixer cssnano postcss postcss-cli --save
# precss 讓你可以在css中設定變數, 幫助你寫css code
# autoprefixer 自動幫css加vendor前綴, 讓你不用擔心一些css語法跨瀏覽器的問題, 例如: -webkit-...
# cssnano 幫你壓縮css, 並可選擇是否移除註解
# postcss 是以上這些套件的大總管
# postcss-cli 讓你可以從command line透過postcss執行這些套件功能, 但使用前要先設定postcss.config.js
# postcss地雷: postcss的postcss.config.js檔要和package.json在同一個目錄, 且餵給postcss的css檔案必須要在package.json所在的目錄或其子目錄, 否則下npm run時可能會找不到package.json中browserslist的設定

npm install uglify-js --save
# uglify-js 可以幫你醜化和壓縮js檔案
