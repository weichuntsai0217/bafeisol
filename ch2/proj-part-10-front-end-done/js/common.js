var state = { orderedProducts: {} }

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
    }
  }

  function initConfirmPayment() {
    var button = document.querySelector('[js-dom = "confirm-payment"]')
    button.addEventListener('click', function (e) {
      var formData = getOrderFormData()
      requestConfirmPayment(formData)
      // console.log(2) // 讓讀者猜印出1, 2, 3的順序, 1在onComplete裡
      // console.log(3)
      /**
        要跟讀者說明透過xhr和不透過xhr(例如從網址列, 從css tag, 從js tag) 發出去的都是http request, 
        不管哪種方式發的, 對server來說都沒差, 都是http request, server就是負責撈和回對應的data,
        有差的只是瀏覽器在接收到response後預設的行為(重繪部分網頁 vs 重繪整個網頁 vs 讀取css或js檔).

        Chrome console的network可以把xhr打勾來看看只透過xhr發送的http request.
      */
      /**
        跟讀者說明為何會有這種async的設計:
        1. 網路傳輸等待的時間, 遠高於cpu執行指令的時間 (至少是1000倍以上)
        2. 因為cpu在網路傳輸時是閒置的, javascript為了不要浪費cpu資源,
           於是javascript讓cpu繼續執行後續的程式碼, 直到網路傳輸完成後,
           再馬上跳去執行onComplete.
        3. 順帶一提, 從硬碟讀檔案到記憶體(memory)時, cpu也是閒置的,
           且讀取時間也是遠高於cpu執行指令的時間, 
           因此你可以想像, 若你今天寫的是個桌面應用程式(而非網頁程式), 這個程式要從存在硬碟的檔案讀資料使用時,
           也應該會有類似async的設計(要不要等).
      */
      /**
        後面再找章節跟讀者解釋load相關的event, 並講解same-origin policy.
      */
    })

    function requestConfirmPayment(formData) {
      xhr = new XMLHttpRequest()
      xhr.addEventListener('load', onComplete) // 等待server端回的reponse都接收完畢後, 才會執行onComplete
      xhr.open('POST', '/confirm-payment')
      xhr.setRequestHeader('Content-Type', 'application/json') // 瀏覽器送給server的資料格式是json.
      xhr.setRequestHeader('Accept', 'application/json') // server回覆給瀏覽器的資料, 只接受json.
      xhr.send(JSON.stringify(formData)) // object要轉成string才可以送出
      function onComplete() {
        // console.log(1)
        var status = xhr.status
        var res = xhr.response
        /**
          讓讀者認識status code,
          請讀者改變server.js回的status code來看看有什麼變化,
          每個status都要帶讀者從Chrome console看status code後面的text
          重點: 要跟Backend工程師講好, 每個route要送什麼data才是合法的, 並且不要誤用status code的語意
        */
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
