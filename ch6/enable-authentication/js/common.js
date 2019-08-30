
function getInitState() {
  return {
    orderedProducts: {},
    account: '',
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
}

var state = getInitState()
reqGetOrder()

renderDialogForm()
initDialogForm()

function renderDialogForm() {
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
  })
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
    var timeout = undefined
    item.addEventListener('input', function (e) {
      state[key] = e.target.value
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        reqPutOrderContact(key, e.target.value)
      }, 600)
    })
  })
}

function request(method, path, formData, getOnComplete) {
  xhr = new XMLHttpRequest()
  if (typeof getOnComplete === 'function') {
    xhr.addEventListener('load', getOnComplete(xhr))
  }
  xhr.open(method, path)
  xhr.setRequestHeader('Content-Type', 'application/json')
  if (formData) {
    xhr.send(JSON.stringify(formData))
  } else {
    xhr.send()
  }
}

function reqGetOrder() {
  request('GET', '/order', undefined, getOnComplete)
  function getOnComplete(xhr) {
    return function () {
      var status = xhr.status
      var res = JSON.parse(xhr.response)
      if (status === 200) {
        for (key in res) {
          state[key] = res[key] || ''
        }
        renderCart()
        renderDialogForm()
      }
    }
  }
}

function reqPutOrderQuantity(product) {
  // product = {
  //   id: 'FOOD01',
  //   quantity: 3,
  // }
  request('PUT', '/order-quantity', product)
}

function reqDeleteOrderQuantity(product) {
  // product = {
  //   id: 'FOOD01',
  // }
  request('DELETE', '/order-quantity', product)
}

function reqPutOrderContact(key, value) {
  request('PUT', '/order-contact', { key: key, value: value })
}

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
      var id = dataDoms[2].textContent.trim()
      delete products[id]
      reqDeleteOrderQuantity({ id: id })
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
      reqPutOrderQuantity({ id: id, quantity: products[id].quantity })
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
    }

    function getOrderFormData() {
      var formDom = document.querySelector('[js-dom = "order-form"]')
      var formData = {
        name: formDom.querySelector('#name').value.trim(),
        mobile: formDom.querySelector('#mobile').value.trim(),
        email: formDom.querySelector('#email').value.trim(),
        address: formDom.querySelector('#address').value.trim(),
        cardZone1: formDom.querySelector('#cardZone1').value.trim(),
        cardZone2: formDom.querySelector('#cardZone2').value.trim(),
        cardZone3: formDom.querySelector('#cardZone3').value.trim(),
        cardZone4: formDom.querySelector('#cardZone4').value.trim(),
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
