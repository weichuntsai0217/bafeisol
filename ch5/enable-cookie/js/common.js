/**
  # 5-1 該如何保留購物車的資料?
  * 你發現, 把網頁關掉後再重新開啟, 先前選進購物車的商品資訊都會消失
  * 你發現, 在不同頁面切換(首頁, fashion, food, 搜尋頁面)後, 購物車中的商品資訊也會消失.
  * 在以上情境下, 我該如何保留購物車的商品資訊呢? 答案是使用Cookie
  * Cookie就是瀏覽器保存使用者狀態的機制; 瀏覽器可將使用者在不同網站的資料儲存在使用者的電腦上,
    這些存下來的資料稱為Cookie. 使用者下次開啟網頁時, 我們可以透過JavaScript讀取Cookie,
    進而得到使用者上次關閉網頁時的使用資訊 (例如上次關閉網頁時購物車的商品資訊).
  * 請注意, Cookie的資料是儲存在使用者端的電腦中(由瀏覽器管理), 而不是儲存在server上.
*/

/**
  ## 範例 1:
  設定和讀取Cookie
*/
// document.cookie = 'name=Jimmy Tsai'
// document.cookie = 'hobby=basketball' // 賦值時, "="的作用其實是新增一個key=value, 而非覆蓋
// document.cookie = 'car=honda'
// document.cookie = 'car=toyota' // 同樣的key, 後面蓋掉前面
// document.cookie = 'car=benz;path=/fashion' // 同樣的key, 可以存在在不同的路徑
// console.log(document.cookie) // 讀cookie時, 會將之前加入過的key=value全部包成一個string顯示且每個key=value之間用分號區隔.

/**
  ## 5-1 Quiz 1
  請將範例 1中設定cookie的code註解掉, 將網頁關掉再重開, 看一下console.log(document.cookie) 會印出什麼?
  另外, 在Chrome console中的'Application'也可以看到目前網站的cookie值.
*/

/**
  ## 範例 2:
  * cookie可以針對每一組key=value設定過期時間, 一旦過期, 則對應的key=value就會被刪除.
    - 可以使用關鍵字expires來設定一個未來時間點, 一旦過了這個時間點就過期,
      例如: expires=Mon, 13 Jan 2020 20:11:48 GMT.
    - 可以使用關鍵字max-age來設定從現在開始過了多少秒會過期,
      例如: max-age=600
  * Chrome console中的'Application'可以看到cookie中的每個key=value何時過期
*/
// document.cookie = 'name=Jimmy Tsai' // 沒設定, 則預設為整個瀏覽器關閉後過期
// document.cookie = 'hobby=basketball;expires=Mon, 13 Jan 2020 20:11:48 GMT' // 2020-01-13的晚上8點11分48秒後過期 (英國時區)
// document.cookie = 'car=toyota;max-age=600' // 600秒後過期
// document.cookie = 'color=yellow;max-age=1' // 1秒後過期
// console.log(document.cookie)

/**
  ## 5-1 Quiz 2:
  在Chrome console中的'Application', 不但可以看到cookie的每個key-value, 也可以刪掉cookie的key-value,
  請猜猜看要怎麼刪(提示: 滑鼠右鍵)
*/

/**
  # 5-2 server也可以透過response 來設定瀏覽器的cookie, 請見server.js
  * 按照以下步驟測試
    1. 開啟server端送cookie的code後先refresh網頁一次, 看一下結果
    2. 接著把server端送cookie的code關掉, 然後再refresh網頁一次, 再看看Step 1的結果是否還在.

*/

/**
  # 5-3 將cookie實際運用在我們要解決的問題
  * 我們也加了點js的code, 把訂單中聯絡人資訊也記在cookie中, 這樣使用者重開網頁後才不用重打聯絡資訊.
*/

function getCookieObj() {
  // 將cookie存的字串資訊轉成obj, 比較好用
  var obj = {}
  if (document.cookie) {
    var array = document.cookie.split(';')
    array.forEach(function(item) {
      var pair = item.split('=')
      obj[pair[0].trim()] = pair[1].trim()
    })
  }
  return obj
}

function setCookie(key, value, needStringify) {
  if (needStringify) {
    value = JSON.stringify(value)
  }
  document.cookie = key + '=' + value + ';path=/' + ';max-age=604800' // 604800秒 = 7天
}

function getInitState(cookieObj) {
  var res = {
    orderedProducts: {},
    name: '',
    mobile: '',
    email: '',
    address: '',
    cardZone1: '',
    cardZone2: '',
    cardZone3: '',
    cardZone4: '',
    cardSec: '',
    cardExpMonth: '',
    cardExpYear: '',
  }
  for (key in cookieObj) {
    if (key === 'orderedProducts') {
      if (cookieObj.orderedProducts && (typeof cookieObj.orderedProducts === 'string')) {
        try {
          res.orderedProducts = JSON.parse(cookieObj.orderedProducts)
        } catch (e) {
          console.log('orderedProducts parse error, use empty object {} as default value.')
        }
      }
    } else {
      res[key] = cookieObj[key] || ''
    }
  }
  return res
}

var state = getInitState(getCookieObj())
renderCart()
initDialogForm()

function getOrderedProductsSummary(products) {
  var totalQuantity = 0
  var totalPrice = 0
  for (var key in products) {
    totalQuantity += products[key].quantity
    totalPrice += products[key].quantity * products[key].price
  }
  return {
    totalQuantity: totalQuantity,
    totalPrice: totalPrice,
  }
}

function preventAll(e) {
  e.stopPropagation()
  e.preventDefault()
}

function initDialogForm() {
  var formDom = document.querySelector('[js-dom = "order-form"]')
  var fields = [
    formDom.querySelector('#name'),
    formDom.querySelector('#mobile'),
    formDom.querySelector('#email'),
    formDom.querySelector('#address'),
    formDom.querySelector('#cardZone1'),
    formDom.querySelector('#cardZone2'),
    formDom.querySelector('#cardZone3'),
    formDom.querySelector('#cardZone4'),
    formDom.querySelector('#cardSec'),
    formDom.querySelector('#cardExpMonth'),
    formDom.querySelector('#cardExpYear'),
  ]
  fields.forEach(function (item) {
    var key = item.getAttribute('id')
    item.value = state[key]
    item.addEventListener('input', function (e) {
      state[key] = e.target.value
      setCookie(key, e.target.value)
    })
  })
}

function renderCart() {
  var cartQuantity = document.querySelector('[js-dom = "cart-quantity"]')
  var summary = getOrderedProductsSummary(state.orderedProducts)
  cartQuantity.innerHTML = summary.totalQuantity
}

function initNav() {
  var button = document.querySelector('#mobile-menu-button')
  var nav = document.querySelector('nav')
  button.addEventListener('click', function(e) {
    button.classList.toggle('active')
    nav.classList.toggle('active')
  })
}

function initSearch() {
  var button = document.querySelector('[js-dom = "search-button"]')
  button.addEventListener('click', function (e) {
    var condition = document.querySelector('[js-dom = "search-condition"]').value.trim()
    window.location = '/search?q=' + condition
  })
}

function initDialog() {
  var cart = document.querySelector('[js-dom = "cart"]')
  var overlay = document.querySelector('[js-dom = "overlay"]')
  var closeDialog = document.querySelector('[js-dom = "close-dialog"]')
  var productList = document.querySelector('[js-dom = "dialog-product-list"')

  cart.addEventListener('click', function(e) {
    renderDialog()
    overlay.classList.add('active')
  })

  overlay.addEventListener('click', function(e) {
    e.stopPropagation()
    if (e.target === overlay) {
      overlay.classList.remove('active')
    }
  })

  closeDialog.addEventListener('click', function(e) {
    e.stopPropagation()
    overlay.classList.remove('active')
  })

  initConfirmPayment()

  function initDeleteButtons() {
    var deleteButtons = document.querySelectorAll('[js-dom = "dialog-product-delete"]')
    for (var i = 0; i < deleteButtons.length; i++) {
      addListenerForDeleteButton(deleteButtons[i])
    }

    function updateStateAfterDelete(button) {
      var productDom = button.closest('[js-dom = "dialog-product"]')
      var dataDoms = productDom.querySelector('[js-dom = "dialog-product-key-info"]').children
      var products = state.orderedProducts
      var id = dataDoms[2].textContent
      delete products[id]
      setCookie('orderedProducts', products, true)
    }

    function addListenerForDeleteButton(button) {
      button.addEventListener('click', function (e) {
        preventAll(e)
        updateStateAfterDelete(button)
        renderCart()
        renderDialog()
      })
    }
  }

  function initSelect() {
    var selects = document.querySelectorAll('[js-dom = "dialog-product-select"]')
    for (var i = 0; i < selects.length; i++) {
      addListenerForSelect(selects[i])
    }

    function addListenerForSelect(select) {
      select.addEventListener('click', preventAll)

      select.addEventListener('change', function (e) {
        updateStateAfterSelect(select)
        renderCart()
        renderDialog()
      })
    }

    function updateStateAfterSelect(select) {
      var productDom = select.closest('[js-dom = "dialog-product"]')
      var dataDoms = productDom.querySelector('[js-dom = "dialog-product-key-info"]').children
      var products = state.orderedProducts
      var id = dataDoms[2].textContent.trim()
      products[id].quantity = parseInt(select.value)
      setCookie('orderedProducts', products, true)
    }
  }

  function initConfirmPayment() {
    var button = document.querySelector('[js-dom = "confirm-payment"]')
    button.addEventListener('click', function (e) {
      var formData = getOrderFormData()
      requestConfirmPayment(formData)
    })

    function requestConfirmPayment(formData) {
      xhr = new XMLHttpRequest()
      xhr.addEventListener('load', onComplete)
      xhr.open('POST', '/confirm-payment')
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.send(JSON.stringify(formData))
      function onComplete() {
        var status = xhr.status
        var res = xhr.response
        if (status === 200) {
          console.log(res)
          console.log(status, '=> 表示request成功且有資料要回給瀏覽器後續使用. 例如搜尋')
          UpdateStateAfterPaymentSuccess()
          renderCart()
          renderDialog()
          overlay.classList.remove('active')
        } else if (status === 204) {
          console.log(status, '=> 表示request成功但沒有資料要回給瀏覽器使用. 例如改密碼.')
        } else if (status === 400) {
          console.log(status, '=> 表示request失敗, 原因是送給server的data格式不正確. 例如formData少送一個key "email"給server.')
        } else if (status === 401) {
          console.log(status, '=> 表示request失敗, 原因是使用者沒有權限. 例如需要登入的網站但使用者沒登入.')
        } else if (status === 404) {
          console.log(status, '=> 表示request失敗, 原因是無此資源(網頁不存在 或 server不開放), 例如打錯網址.')
        } else if (status === 500) {
          console.log(status, '=> 表示request失敗, 原因是server內部有不明的錯誤(Internal Server Error).')
        } else {
          console.log(status, '=> 表示request失敗, 原因是請再參考其他status code的列表.')
        }
      }
    }

    function UpdateStateAfterPaymentSuccess() {
      state.orderedProducts = {}
      setCookie('orderedProducts', '')
    }

    function getOrderFormData() {
      var formDom = document.querySelector('[js-dom = "order-form"]')
      var cardNumber = [
        formDom.querySelector('#cardZone1').value.trim(),
        formDom.querySelector('#cardZone2').value.trim(),
        formDom.querySelector('#cardZone3').value.trim(),
        formDom.querySelector('#cardZone4').value.trim(),
      ].join()
      var formData = {
        name: formDom.querySelector('#name').value.trim(),
        mobile: formDom.querySelector('#mobile').value.trim(),
        email: formDom.querySelector('#email').value.trim(),
        address: formDom.querySelector('#address').value.trim(),
        cardNumber: cardNumber,
        cardSec: formDom.querySelector('#cardSec').value.trim(),
        cardExpMonth: formDom.querySelector('#cardExpMonth').value.trim(),
        cardExpYear: formDom.querySelector('#cardExpYear').value.trim(),
        orderedProducts: {},
      }
      var ops = state.orderedProducts
      for (key in ops) { // key 就是product id
        formData.orderedProducts[key] = { // 只需要price和quantity, 節省流量
          price: ops[key].price,
          quantity: ops[key].quantity,
        }
      }
      return formData
    }
  }

  function renderDialog() {
    var totalCols = 3 // totalCols is total columns
    var products = state.orderedProducts
    var summary = getOrderedProductsSummary(products)
    overlay.querySelector('[js-dom = "dialog-total-quantity"]').innerHTML = summary.totalQuantity
    overlay.querySelector('[js-dom = "dialog-total-price"]').innerHTML = summary.totalPrice

    var productListDom = overlay.querySelector('[js-dom = "dialog-product-list"]')

    while (productListDom.firstChild) {
      productListDom.removeChild(productListDom.firstChild)
    }

    for (var i = 0; i < totalCols; i++) {
      productListDom.appendChild(getColDom(totalCols))
    }

    var colDoms = productListDom.children
    var counter = 0
    for (var key in products) {
      var index = counter % totalCols
      colDoms[index].appendChild(getDialogProductDom(products[key]))
      counter++ 
    }

    initSelect()
    initDeleteButtons()

    function getColDom(totalCols) { // ColDom is column dom.
      var tpl = '<div class="col-1-' + totalCols + ' smart-grid-padding"></div>'
      var parent = document.createElement('div')
      parent.innerHTML = tpl
      return parent.firstChild
    }

    function getDialogProductDom(product) {
      var tpl = [
        '<div class="card row" js-dom="dialog-product">',
          '<a href="" js-dom="dialog-product-link">',
            '<div class="card-image row">',
              '<img src="" js-dom="dialog-product-img">',
            '</div>',
            '<div class="card-content row">',
              '<div class="row key-info" js-dom="dialog-product-key-info">',
                '<p class="title"></p>',
                '<p class="price"></p>',
                '<p></p>',
              '</div>',
              '<div clas="row">',
                '<div class="col-1-3 select-wrapper">',
                  '<select name="quantity" dir="rtl" js-dom="dialog-product-select">',
                    '<option value="1">1</option>',
                    '<option value="2">2</option>',
                    '<option value="3">3</option>',
                    '<option value="4">4</option>',
                    '<option value="5">5</option>',
                    '<option value="6">6</option>',
                    '<option value="7">7</option>',
                    '<option value="8">8</option>',
                    '<option value="9">9</option>',
                    '<option value="10">10</option>',
                  '</select>',
                '</div>',
                '<div class="col-2-3">',
                  '<button class="row" type="button" js-dom="dialog-product-delete">',
                    '<i class="fas fa-trash-alt"></i>',
                  '</button>',
                '</div>',
              '</div>',
            '</div>',
          '</a>',
        '</div>',
      ].join('')
      var parent = document.createElement('div')
      parent.innerHTML = tpl
      
      var productDom = parent.firstChild
      productDom.querySelector('[js-dom = "dialog-product-link"]').setAttribute('href', product.href)
      productDom.querySelector('[js-dom = "dialog-product-img"]').setAttribute('src', product.src)
      
      var dataDoms = productDom.querySelector('[js-dom = "dialog-product-key-info"]').children
      dataDoms[0].textContent = product.title
      dataDoms[1].textContent = 'NT$' + String(product.price)
      dataDoms[2].textContent = product.id
      
      var optionDoms = productDom.querySelector('[js-dom = "dialog-product-select"]').children
      for (var i = 0; i < optionDoms.length; i++) {
        if (parseInt(optionDoms[i].value) === product.quantity) {
          optionDoms[i].selected = true
          break
        }
      }

      return productDom
    }
  }
}
