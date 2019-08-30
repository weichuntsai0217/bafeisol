var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = 1234

/**
  # 4-4 修改我們的網頁成ejs
*/
function getMockData(page, condition) { // 假裝是資料庫撈出來的資料
  var products = [
    {
      src: 'food/food-01.jpg',
      title: '香脆雞腿堡',
      price: 100,
      id: 'FOOD01',
      desc: '我是香脆雞腿堡，多汁美味又酥脆，大家都說讚！',
    },
    {
      src: 'food/food-02.jpg',
      title: '高纖大麥片',
      price: 200,
      id: 'FOOD02',
      desc: '我是高纖大麥片，清爽健康顧腸道，大家都說讚！',
    },
    {
      src: 'food/food-03.jpg',
      title: '薑汁啤酒',
      price: 300,
      id: 'FOOD03',
      desc: '我是薑汁啤酒，清涼有勁超爽快，大家都說讚！',
    },
    {
      src: 'food/food-04.jpg',
      title: '精緻雞腿便當',
      price: 400,
      id: 'FOOD04',
      desc: '我是精緻雞腿便當，料多實在又新鮮，大家都說讚！',
    },
    {
      src: 'food/food-05.jpg',
      title: '格紋鬆餅',
      price: 500,
      id: 'FOOD05',
      desc: '我是格紋鬆餅，香甜可口又酥脆，大家都說讚！',
    },
    {
      src: 'food/food-06.jpg',
      title: '檸檬水果茶',
      price: 600,
      id: 'FOOD06',
      desc: '我是檸檬水果茶，讓你盡情享受下午時光，大家都說讚！',
    },
    {
      src: 'fashion/fashion-01.jpg',
      title: '蕾絲洋裝',
      price: 1000,
      id: 'FASH01',
      desc: '我是蕾絲洋裝，優雅大方又好看，大家都說讚！',
    },
    {
      src: 'fashion/fashion-02.jpg',
      title: '高領毛衣',
      price: 2000,
      id: 'FASH02',
      desc: '我是高領毛衣，保暖又百搭，大家都說讚！',
    },
    {
      src: 'fashion/fashion-03.jpg',
      title: '酷炫帽T',
      price: 3000,
      id: 'FASH03',
      desc: '我是酷炫帽T，鮮豔又充滿活力，大家都說讚！',
    },
    {
      src: 'fashion/fashion-04.jpg',
      title: '皮衣外套',
      price: 4000,
      id: 'FASH04',
      desc: '我是皮衣外套，充滿硬派騎士作風，大家都說讚！',
    },
    {
      src: 'fashion/fashion-05.jpg',
      title: '休閒襯衫',
      price: 5000,
      id: 'FASH05',
      desc: '我是休閒襯衫，俐落隨性又帥氣，大家都說讚！',
    },
    {
      src: 'fashion/fashion-06.jpg',
      title: '休閒西裝',
      price: 6000,
      id: 'FASH06',
      desc: '我是休閒西裝，經典大方又時尚，大家都說讚！',
    },
  ]
  var mapping = {
    fashion: 'FASH',
    food: 'FOOD',
    search: 'SEARCH', // 假的id字首, 只是要和fashion, food, index做區隔
  }
  var prefix = mapping[page]
  if (prefix) {
    var res = []
    if (prefix === 'SEARCH') {
      // search頁面的data
      products.forEach(function (item) {
        for (key in item) {
          if (key !== 'src') {
            var str = String(item[key])
            if (str.indexOf(condition) !== -1) {
              res.push(item)
              break
            }
          }
        }
      })

    } else {
      // fashion或food頁面的data
      products.forEach(function (item) {
        if (item.id.startsWith(prefix)) {
          res.push(item)
        }
      })
    }
    return res
  } else {
    // index(首頁) 的data
    return products
  }
}

function getColumnData(page, condition) { // 將資料庫撈出來的資料分成4個column
  var products = getMockData(page || '/', condition || '')
  var columns = [[], [], [], []]
  for (var i = 0; i < products.length; i++) {
    var targetColumn = i % columns.length
    columns[targetColumn].push(products[i])
  }
  return columns
}

function getProductDetail(id) {
  var productDetails = [
    {
      id: 'FOOD01',
      originalPrice: 200,
      company: '光速好食有限公司',
      source: '台灣',
      other: '{"製造日期":"2019-07-01","賞味期限":"2020-07-01","容量":"97.3g","成份":"雞腿肉, 蘿美生菜, 糖, 麥芽糊精, 鹽, 辣椒粉, 磷酸二澱粉,棕櫚油, 紅蘿蔔, 檸檬酸鐵, 調味劑(磷酸二鈉,檸檬酸,琥珀酸二鈉),天然香辛料(芥末、薑黃), 維生素E, 維生素A, 維生素B2"}',
    },
    {
      id: 'FOOD02',
      originalPrice: 200,
      company: '光速好食有限公司',
      source: '台灣',
      other: '{"製造日期":"2019-07-02","賞味期限":"2020-07-02","容量":"98.3g","成份":"大麥片, 糖粉"}',
    },
    {
      id: 'FOOD03',
      originalPrice: 300,
      company: '光速好食有限公司',
      source: '台灣',
      other: '{"製造日期":"2019-07-03","賞味期限":"2020-07-03","容量":"99.3g","成份":"小麥, 酵母"}',
    },
    {
      id: 'FOOD04',
      originalPrice: 400,
      company: '光速好食有限公司',
      source: '台灣',
      other: '{"製造日期":"2019-07-04","賞味期限":"2020-07-04","容量":"100.3g","成份":"米, 雞腿肉"}',
    },
    {
      id: 'FOOD05',
      originalPrice: 500,
      company: '光速好食有限公司',
      source: '台灣',
      other: '{"製造日期":"2019-07-05","賞味期限":"2020-07-05","容量":"101.3g","成份":"麵粉, 雞蛋"}',
    },
    {
      id: 'FOOD06',
      originalPrice: 600,
      company: '光速好食有限公司',
      source: '台灣',
      other: '{"製造日期":"2019-07-06","賞味期限":"2020-07-06","容量":"102.3g","成份":"檸檬, 茶葉"}',
    },
    {
      id: 'FASH01',
      originalPrice: 1000,
      company: '光速服飾有限公司',
      source: '美國',
      other: '{"尺寸":"S","顏色":"紫色"}',
    },
    {
      id: 'FASH02',
      originalPrice: 2000,
      company: '光速服飾有限公司',
      source: '美國',
      other: '{"尺寸":"M","顏色":"淺灰"}',
    },
    {
      id: 'FASH03',
      originalPrice: 3000,
      company: '光速服飾有限公司',
      source: '美國',
      other: '{"尺寸":"黃色","顏色":"S"}',
    },
    {
      id: 'FASH04',
      originalPrice: 4000,
      company: '光速服飾有限公司',
      source: '美國',
      other: '{"尺寸":"L","顏色":"咖啡色"}',
    },
    {
      id: 'FASH05',
      originalPrice: 5000,
      company: '光速服飾有限公司',
      source: '美國',
      other: '{"尺寸":"M","顏色":"灰色"}',
    },
    {
      id: 'FASH06',
      originalPrice: 6000,
      company: '光速服飾有限公司',
      source: '美國',
      other: '{"尺寸":"M","顏色":"灰和藍"}',
    },
  ]
  var products = getMockData('/', '')
  var target = {}
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      target = products[i]
      break
    }
  }
  for (var i = 0; i < productDetails.length; i++) {
    if (productDetails[i].id === id) {
      target.originalPrice = productDetails[i].originalPrice
      target.company = productDetails[i].company
      target.source = productDetails[i].source
      target.other = productDetails[i].other
      break
    }
  }
  return target
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
  var templateDir = path.join(__dirname, 'templates')
  app.set('views', templateDir)
  app.set('view engine', 'ejs')
}

app.use(bodyParser.json())
setStatic(app)
setTemplate(app)

app.get('/', function (req, res) {
  var page = 'index'
  res.render('main', {
    page: page,
    condition: '',
    topFig: {
      h: '恣意享樂，盡在光速買！',
      p: '',
    },
    mainHeading: true,
    columns: getColumnData(page),
  })
})

app.get('/fashion', function (req, res) {
  var page = 'fashion'
  res.render('main', {
    page: page,
    condition: '',
    topFig: {
      h: '率性穿搭，任你揮灑！',
      p: '',
    },
    mainHeading: false,
    columns: getColumnData(page),
  })
})

app.get('/food', function (req, res) {
  var page = 'food'
  res.render('main', {
    page: page,
    condition: '',
    topFig: {
      h: '大口咬下，就是爽快！',
      p: '漢堡商品全館五折起，要買要快！',
    },
    mainHeading: false,
    columns: getColumnData(page),
  })
})

app.get('/search', function (req, res) {
  var page = 'search'
  var condition = req.query.q
  res.render('main', {
    page: page,
    condition: condition,
    topFig: null,
    mainHeading: false,
    columns: getColumnData(page, condition),
  })
})

app.get('/products/:id', function (req, res) {
  var page = 'productView'
  var target = getProductDetail(req.params.id)
  res.render(page, {
    page: page,
    condition: '',
    product: reshapeProduct(target),
  })
})

app.post('/confirm-payment', function (req, res) {
  // console.log(req.body)
  res.status(200).json({
    hello: 'world',
    howAre: 'you',
  })
})

app.listen(port, function () {
  console.log('Our app listening on port ' + port + '.')
})
