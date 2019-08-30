var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = 1234

app.use(bodyParser.json())
app.use('/js', express.static(path.join(__dirname, 'dist/js')))

app.get('/rest/all-products', function (req, res) {
  res.status(200).json({
    products: [
      { title: '漢堡', price: 100 },
      { title: '啤酒', price: 300 },
      { title: '洋裝', price: 1000 },
      { title: '外套', price: 2000 },
    ]
  })
})

app.get('/rest/fashion-products', function (req, res) {
  res.status(200).json({
    products: [
      { title: '洋裝', price: 1000 },
      { title: '外套', price: 2000 },
    ]
  })
})

app.get('/rest/food-products', function (req, res) {
  res.status(200).json({
    products: [
      { title: '漢堡', price: 100 },
      { title: '啤酒', price: 300 },
    ]
  })
})

app.get('/rest/*', function (req, res) {
  res.status(404).send()
})

app.get('/fashion', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.get('/food', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.get('/*', function(req, res) {
  res.redirect('/')
})

app.listen(port, function () {
  console.log('Our app is listening at', port)
})
