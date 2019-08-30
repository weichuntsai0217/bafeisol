var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var cookieParser = require('cookie-parser')
var crypto = require('crypto')
var uuidv4 = require('uuid/v4')
var env = require('process').argv[2] || 'develop'
// # ch8-1 引入compression模組
var compression = require('compression')
var app = express()
var port = 1234

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
  var root = env === 'production'
    ? path.join(__dirname, 'dist')
    : path.join(__dirname, '../../ch2/proj-part-10-front-end-done')
  var folders = ['/css', '/imgs', '/webfonts'] // 一定要有斜線
  folders.forEach(function(folder) {
    var dir = path.join(root, folder)
    app.use(folder, express.static(dir))
  })
  if (env === 'production') {
    app.use('/js', express.static(path.join(__dirname, 'dist/js'))) // 使用同目錄的js
  } else {
    app.use('/js', express.static(path.join(__dirname, '../../ch6/enable-authentication/js'))) // 使用同目錄的js
  }
}

function setTemplate(app) {
  var templateDir = path.join(__dirname, '../bundle-fe/templates')
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

function checkAuth(req, res, next) {
  var sid = req.cookies.sid
  var sql = mysql.format(
    'SELECT * FROM `sessions` WHERE `sid` = ?;',
    [sid],
  )
  con.query(sql, function (err, result, fields) {
    if (err) throw err
    req.user = result.length === 0
      ? null // 因為ejs不能接受undefined, 所以設為null
      : result[0]
    next()
  })
}

function createNewSession(res, account) {
  var sid = uuidv4() + '-' + Date.now()
	var sqlCreateSession = mysql.format(
		'INSERT INTO `sessions` (`sid`, `account`) VALUES (?, ?);',
		[sid, account]
	)
  con.query(sqlCreateSession, function (err, result, fields) {
    if (err) throw err
		setResCookie(res, 'sid', sid)
		res.redirect('/')
  })
}

function deleteSession(req, res) {
	if (req.user) {
    var sid = req.user.sid
    var sqlDeleteSession = mysql.format(
      'DELETE FROM `sessions` WHERE `sid` = ?;',
      [sid]
    )
    con.query(sqlDeleteSession, function (err, result, fields) {
      if (err) throw err
      setResCookie(res, 'sid', undefined, true)
      res.redirect('/')
    })
	} else {
    res.redirect('/')
  }
}

function getPasshash(password, salt) {
	var hash = crypto.createHash('sha256')
  return hash.update(password + salt).digest('hex')
}

function setResCookie(res, key, value, needToClear) {
  if (needToClear) {
    res.clearCookie(key)
  } else {
    res.cookie(key, value, { path: '/', maxAge:  365 * 24 * 60 * 60 * 1000 })
  }
}

function renderLogin(req, res, error) {
	var page = 'login'
	res.render(page, {
    env: env,
		page: page,
    user: req.user,
		error: error,
		condition: '',
	})
}

function getOrderedProducts(data) {
  var orderedProducts = {}
	if (data.length) {
		data.forEach(function (item) {
			orderedProducts[item.product_id] = {
        href: '/products/' + item.product_id,
				src: '/imgs/' + item.img_src,
				title: item.title,
				price: item.price,
        id: item.product_id,
				quantity: item.quantity,
			}
		})
	}
  return orderedProducts
}

function getOrderedProductId(account, productId) {
  return account + '-' + productId
}

app.use(compression())  // 使用compression模組, 讓response的資料都先用gzip壓縮後再傳送
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('我愛光速買'))
app.use(checkAuth)
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
    // res.cookie('from-server-hello', 'hello', { path: '/', maxAge:  600000 })
    var sql = 'SELECT * FROM `products` ORDER BY `price`'
    con.query(sql, function (err, result, fields) {
      if (err) throw err
      changeKeys(result, { img_src: 'src', description: 'desc' })
      var page = 'index'
      res.render('main', {
        env: env,
        page: page,
        user: req.user,
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

  app.get('/login', function (req, res) {
    if (req.user) {
      res.redirect('/')
    } else {
      var page = 'login'
      res.render(page, {
        env: env,
        page: page,
        user: req.user,
        error: '',
        condition: '',
      })
    }
  })

  app.get('/fashion', function (req, res) {
    var sql = 'SELECT * FROM `products` WHERE `id` LIKE \'%FASH%\' ORDER BY `price`'
    con.query(sql, function (err, result, fields) {
      if (err) throw err
      changeKeys(result, { img_src: 'src', description: 'desc' })
      var page = 'fashion'
      res.render('main', {
        env: env,
        page: page,
        user: req.user,
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
        env: env,
        page: page,
        user: req.user,
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
        env: env,
        page: page,
        user: req.user,
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
        env: env,
        page: page,
        user: req.user,
        condition: '',
        product: reshapeProduct(target),
      })
    })
  })

  app.post('/confirm-payment', function (req, res) {
    if (req.user) {
      var account = req.user.account
      var sql = mysql.format(
        'DELETE FROM `ordered_products` WHERE `account` = ?;',
        [account]
      )
      con.query(sql, function (err, result, fields) {
        res.status(200).json({
          message: '付款成功！訂單細節已寄至您的信箱。',
        })
      })
    } else {
      res.status(401).send()
    }
  })

  app.get('/logout', deleteSession)

  app.post('/session', function (req, res) {
    var password = req.body.password
    if (password.length < 8) {
      renderLogin(req, res, '密碼過短. 密碼至少要8碼.')
    } else if (password.length > 32) {
      renderLogin(req, res, '密碼過長. 密碼最多是32碼.')
    } else {
      var account = req.body.account
			var sqlGetUSer = mysql.format(
				'SELECT * from `users` WHERE `account` = ?',
				[account]
			)
			con.query(sqlGetUSer, function (err, result, fields) {
        if (err) throw err
				if (result.length === 0) {
					renderLogin(req, res, '帳號' + account + '不存在, 請先註冊' + account + '.')
				} else {
          targetUser = result[0]
          var testPasshash = getPasshash(password, targetUser.salt)
          if (testPasshash === targetUser.passhash) {
            createNewSession(res, account)
          } else {
            renderLogin(req, res, '密碼不正確.')
          }
				}
			})
    }
  })

  app.post('/user', function (req, res) {
		var password = req.body.password
		if (password.length < 8) {
			renderLogin(req, res, '密碼過短. 密碼至少要8碼.')
		} else if (password.length > 32) {
			renderLogin(req, res, '密碼過長. 密碼最多是32碼.')
		} else {
			var account = req.body.account
			var sqlCheckUSer = mysql.format(
				'SELECT `account` from `users` WHERE `account` = ?',
				[account]
			)
			con.query(sqlCheckUSer, function (err, result, fields) {
				if (err) throw err
				if (result.length === 0) { // 帳號沒有重複
					var salt = crypto.randomBytes(32).toString('hex')
					var passhash = getPasshash(password, salt)
					var sqlCreateUser = mysql.format(
						'INSERT INTO `users` (`account`, `passhash`, `salt`) VALUES (?, ?, ?);',
						[account, passhash, salt],
					)
					con.query(sqlCreateUser, function (err, result, fields) {
						if (err) throw err
            var sqlCreateOrder = mysql.format(
							'INSERT INTO `contacts` (`account`,`email`) VALUES (?, ?);',
							[account, account],
            )
            con.query(sqlCreateOrder, function (err, result, fields) {
						  if (err) throw err
						  createNewSession(res, account)
            })
					})
				} else {
					renderLogin(req, res, '帳號' + account + '已存在, 請使用別的email註冊.')
				}
			})
		}
  })

  app.get('/order', function (req, res) {
    if (req.user) {
      var sql = mysql.format(
        'SELECT * FROM `contacts` WHERE `account` = ?',
        [req.user.account]
      )
      con.query(sql, function (err, contacts, fields) {
        if (err) throw err
        var sqlJoin = mysql.format(
          'SELECT `ordered_products`.`product_id`, `ordered_products`.`quantity`, `products`.`img_src`, `products`.`title`, `products`.`price` FROM `ordered_products`, `products` WHERE `ordered_products`.`account` = ? AND `ordered_products`.`product_id` = `products`.`id`;',
          [req.user.account]
        )
        con.query(sqlJoin, function (err, srcData, fields) { // srcData = the source data of orderedProducts
					changeKeys(
						contacts,
						{ 
						  card_zone1: 'cardZone1',
						  card_zone2: 'cardZone2',
						  card_zone3: 'cardZone3',
						  card_zone4: 'cardZone4',
						  card_sec: 'cardSec',
						  card_exp_month: 'cardExpMonth',
						  card_exp_year: 'cardExpYear',
						}
					)
          var order = contacts[0]
          order.orderedProducts = getOrderedProducts(srcData)
					res.status(200).json(order)
        })
		  })
    } else {
      res.status(401).send()
    }
  })

  app.put('/order-quantity', function (req, res) {
    if (req.user) {
      var account = req.user.account
      var productId = req.body.id
      var quantity = req.body.quantity
      var id = getOrderedProductId(account, productId)
      var sql = mysql.format(
        'REPLACE INTO `ordered_products` (`id`, `account`, `product_id`, `quantity`) VALUES (?, ?, ?, ?)',
        [id, account, productId, quantity]
      )
      con.query(sql, function (err, result, fields) {
        res.status(204).send()
      })
    } else {
      res.status(401).send()
    }
  })

  app.delete('/order-quantity', function (req, res) {
    if (req.user) {
      var account = req.user.account
      var productId = req.body.id
      var id = getOrderedProductId(account, productId)
      var sql = mysql.format(
        'DELETE FROM `ordered_products` WHERE `id` = ?;',
        [id]
      )
      con.query(sql, function (err, result, fields) {
        res.status(204).send()
      })
    } else {
      res.status(401).send()
    }
  })

  app.put('/order-contact', function (req, res) {
    if (req.user) {
      var key = req.body.key
      var value = req.body.value
      var account = req.user.account
      var sql = mysql.format(  
        'UPDATE `contacts` SET ?? = ? WHERE `account` = ?;',
        [key, value, account]
      )
      con.query(sql, function (err, result, fields) {
        res.status(204).send()
      })
    } else {
      res.status(401).send()
    }
  })

  app.get('/*', function(req, res) {
    // 使用者從瀏覽器網址打下任何不合法的route, 都會被重新導向回首頁'/'
    res.redirect('/')
  })

  app.listen(port, function () {
    console.log('The environment is', env)
    console.log('Our app listening on port ' + port + '.')
  })
})

