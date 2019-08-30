var path = require('path')
var express = require('express')
var app = express()
var port = 1234

/**
  # 4-1 沒送標準的HTML格式string, 則視為放在body
*/
// app.get('/', function (req, res) {
//   res.send('歡迎光臨光速買')
// })

// app.get('/fashion', function (req, res) {
//   res.send('這是時尚流行頁面')
// })

// app.get('/food', function (req, res) {
//   res.send('這是美食饗宴頁面')
// })


/**
  # 4-2 傳送標準的HTML格式string
*/
// app.get('/', function (req, res) {
//   res.send([
//     '<html>',
//       '<head>',
//         '<style>',
//           'h1 { color: red; }',
//         '</style>',
//       '</head>',
//       '<body>',
//         '<h1>',
//           '歡迎光臨光速買',
//         '</h1>',
//       '</body>',
//     '</html>',
//   ].join(''))
// })

// app.get('/fashion', function (req, res) {
//   res.send([
//     '<html>',
//       '<head>',
//         '<style>',
//           'h1 { color: blue; }',
//         '</style>',
//       '</head>',
//       '<body>',
//         '<h1>',
//           '這是時尚流行頁面',
//         '</h1>',
//       '</body>',
//     '</html>',
//   ].join(''))
// })

// app.get('/food', function (req, res) {
//   res.send([
//     '<html>',
//       '<head>',
//         '<style>',
//           'h1 { color: green; }',
//         '</style>',
//       '</head>',
//       '<body>',
//         '<h1>',
//           '這是美食饗宴頁面',
//         '</h1>',
//       '</body>',
//     '</html>',
//   ].join(''))
// })


/**
  # 4-2 開放主機內特定的資料夾供人存取靜態檔案 (日後將只拿來存取css, imgs, js, webfonts)

  __dirname => 目前這個檔案在電腦中的絕對路徑
*/
// var dir = path.join(__dirname, '../../ch2/proj-part-10-front-end-done') // 不用擔心斜線問題
// 上面這行等於 var dir = __dirname + '/../../ch2/proj-part-10-front-end-done'
// app.use(express.static(dir))


/**
  # 4-3 HTML = template + data
*/
// var folder = 'templates'
// app.set('views', path.join(__dirname, folder))
// app.set('view engine', 'ejs')
// app.get('/', function (req, res) {
//   res.render('index', {
//     title: '歡迎光臨光速買',
//     items: ['流行時尚', '美食饗宴'],
//   })
// })

app.listen(port, function () {
  console.log('Our warmup example listening on port ' + port + '.')
})
