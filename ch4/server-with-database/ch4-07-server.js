var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var app = express()
var port = 1234

/**
  # 4-7 將Backend接上MySQL
  * 改完code後, 你發現有callback hell; 對於如何避免寫出callback hell, 請參考Appendix
*/

function getColumnData(products) { // 將資料庫撈出來的資料分成4個column
  var columns = [[], [], [], []]
  for (var i = 0; i < products.length; i++) {
    var targetColumn = i % columns.length
    columns[targetColumn].push(products[i])
  }
  return columns
}

function reshapeProduct(product) {
  // 將撈出來的資料轉成適合render的形狀(格式)
  var res = {}
  var other = JSON.parse(product.other)
  res.title = product.title
  res.price = product.price
  res.originalPrice = product.originalPrice
  res.id = product.id
  res.spec = {
    '商品型號': product.id,
    '廠商名稱': product.company,
  }
  for (key in other) {
    res.spec[key] = other[key]
  }
  res.spec['原產地'] = product.source
  res.otherInfo = {
    desc: product.desc,
    srcs: [product.src, product.src] // 偷個懶, 就不另外設定第二張圖了.
  }
  return res
}

function setStatic(app) {
  var root = path.join(__dirname, '../../ch2/proj-part-10-front-end-done')
  var folders = ['/css', '/imgs', '/js', '/webfonts'] // 一定要有斜線
  folders.forEach(function(folder) {
    var dir = path.join(root, folder)
    app.use(folder, express.static(dir))
  })
}

function setTemplate(app) {
  var templateDir = path.join(__dirname, '../server/templates')
  app.set('views', templateDir)
  app.set('view engine', 'ejs')
}

function changeKeys(result, keyMap) {
  result.forEach(function (item){
    for (oldKey in keyMap) {
      newKey = keyMap[oldKey]
      item[newKey] = item[oldKey]
      delete item[oldKey]
    }
  })
}

app.use(bodyParser.json())
setStatic(app)
setTemplate(app)

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'store',
  port: 3306,
})

con.connect(function(err) {
  if (err) throw err
  app.get('/', function (req, res) {
    var sql = 'SELECT * FROM `products` ORDER BY `price`'
    con.query(sql, function (err, result, fields) {
      if (err) throw err
      changeKeys(result, { img_src: 'src', description: 'desc' })
      var page = 'index'
      res.render('main', {
        page: page,
        condition: '',
        topFig: {
          h: '恣意享樂，盡在光速買！',
          p: '',
        },
        mainHeading: true,
        columns: getColumnData(result),
      })
    })
  })

  app.get('/fashion', function (req, res) {
    var sql = 'SELECT * FROM `products` WHERE `id` LIKE \'%FASH%\' ORDER BY `price`'
    con.query(sql, function (err, result, fields) {
      if (err) throw err
      changeKeys(result, { img_src: 'src', description: 'desc' })
      var page = 'fashion'
      res.render('main', {
        page: page,
        condition: '',
        topFig: {
          h: '率性穿搭，任你揮灑！',
          p: '',
        },
        mainHeading: false,
        columns: getColumnData(result),
      })
    })
  })

  app.get('/food', function (req, res) {
    var sql = 'SELECT * FROM `products` WHERE `id` LIKE \'%FOOD%\' ORDER BY `price`'
    con.query(sql, function (err, result, fields) {
      if (err) throw err
      changeKeys(result, { img_src: 'src', description: 'desc' })
      var page = 'food'
      res.render('main', {
        page: page,
        condition: '',
        topFig: {
          h: '大口咬下，就是爽快！',
          p: '漢堡商品全館五折起，要買要快！',
        },
        mainHeading: false,
        columns: getColumnData(result),
      })
    })
  })

  app.get('/search', function (req, res) {
    var conditions = []
    for (var i = 0; i < 4; i++) {
      conditions.push('%' + req.query.q + '%')
    }
    var sql = mysql.format(
      'SELECT * FROM `products` WHERE `title` LIKE ? OR `price` LIKE ? OR `id` LIKE ? OR `description` LIKE ? ORDER BY `price`',
      conditions
    )
    con.query(sql, function (err, result, fields) {
      if (err) throw err
      changeKeys(result, { img_src: 'src', description: 'desc' })
      var page = 'search'
      res.render('main', {
        page: page,
        condition: req.query.q,
        topFig: null,
        mainHeading: false,
        columns: getColumnData(result),
      })
    })
  })

  app.get('/products/:id', function (req, res) {
    var sql = mysql.format(
      'SELECT * FROM `products`, `product_details` WHERE `products`.`id` = `product_details`.`id` AND `products`.`id` = ?',
      [req.params.id]
    )
    con.query(sql, function (err, result, fields) {
      if (err) throw err
      var page = 'productView'
      changeKeys(result, { img_src: 'src', description: 'desc', original_price: 'originalPrice' })
      var target = result[0]
      res.render(page, {
        page: page,
        condition: '',
        product: reshapeProduct(target),
      })
    })
  })

  app.post('/confirm-payment', function (req, res) {
    // console.log(req.body)
    res.status(200).json({
      message: '付款成功！訂單細節已寄至您的信箱。',
    })
  })

  app.listen(port, function () {
    console.log('Our app listening on port ' + port + '.')
  })
})

