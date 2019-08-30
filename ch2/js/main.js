/**
  1. 不用的程式碼區塊用function包起來, 取名字才不容易撞名
  2. 盡量使用自定義的屬性來query DOM, 盡可能不要用class或tag name
     (但用id的話ok, 另外若tag name在網頁中只出現一次且具重要地位, 那也OK);
     因為日後若class或tag name要改名, 那你的js code就要做對應的改動, 會不方便.
     在此我們自定義的屬性是js-dom.
*/

function initNav() {
  var button = document.querySelector('#mobile-menu-button')
  var nav = document.querySelector('nav')
  button.addEventListener('click', function(e) {
    button.classList.toggle('active')
    nav.classList.toggle('active')
  })
}
initNav()

/**
  任務1
*/
// function initAddToCart() {
//   var buttons = document.querySelectorAll('[js-dom = "product-add"]')
//   var cartQuantity = document.querySelector('[js-dom = "cart-quantity"]')
//   for (var i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener('click', function(e) {
//       var number = parseInt(cartQuantity.textContent) + 1
//       cartQuantity.innerHTML= number
//     })
//   }
// }
// initAddToCart()


/**
  任務2
*/
// function initDialog() {
//   var cart = document.querySelector('[js-dom = "cart"]')
//   var overlay = document.querySelector('[js-dom = "overlay"]')
//   var closeDialog = document.querySelector('[js-dom = "close-dialog"]')
//   cart.addEventListener('click', function(e) {
//     overlay.classList.add('active')
//   })
//   overlay.addEventListener('click', function(e) {
//     e.stopPropagation()
//     if (e.target === overlay) {
//       overlay.classList.remove('active')
//     }
//   })
//   closeDialog.addEventListener('click', function(e) {
//     e.stopPropagation()
//     overlay.classList.remove('active')
//   })
// }
// initDialog()


/**
  解決任務1+2的妥善方案, 使用state -> render來管理, 另外, 每個商品最多訂10個, 若超過要擋下來
*/
// var state = { orderedProducts: {} }

// function getOrderedProductsSummary(products) {
//   var totalQuantity = 0
//   var totalPrice = 0
//   for (var key in products) {
//     totalQuantity += products[key].quantity
//     totalPrice += products[key].quantity * products[key].price
//   }
//   return {
//     totalQuantity: totalQuantity,
//     totalPrice: totalPrice,
//   }
// }

// function initAddToCart() {
//   var buttons = document.querySelectorAll('[js-dom = "product-add"]')
//   for (var i = 0; i < buttons.length; i++) {
//     addListenerForButton(buttons[i])
//   }

//   function addListenerForButton(button) {
//     button.addEventListener('click', function(e) {
//       updateSate(button)
//       renderCart()
//     })
//   }

//   function updateSate(button) {
//     var productDom = button.closest('[js-dom = "product"]')
//     var dataDoms = productDom.querySelector('[js-dom = "product-key-info"]').children
//     var products = state.orderedProducts
//     var id = dataDoms[2].textContent
//     if (products[id]) {
//       if (products[id].quantity >= 10) return
//       products[id].quantity += 1
//     } else {
//       products[id] = {
//         src: productDom.querySelector('[js-dom = "product-img"]').src,
//         title: dataDoms[0].textContent,
//         price: parseInt(dataDoms[1].textContent.replace('NT$', '')),
//         id: id,
//         quantity: 1,
//       }
//     }
//   }

//   function renderCart() {
//     var cartQuantity = document.querySelector('[js-dom = "cart-quantity"]')
//     var summary = getOrderedProductsSummary(state.orderedProducts)
//     cartQuantity.innerHTML = summary.totalQuantity
//   }
// }
// initAddToCart()

// function initDialog() {
//   var cart = document.querySelector('[js-dom = "cart"]')
//   var overlay = document.querySelector('[js-dom = "overlay"]')
//   var closeDialog = document.querySelector('[js-dom = "close-dialog"]')
//   var productList = document.querySelector('[js-dom = "dialog-product-list"')

//   cart.addEventListener('click', function(e) {
//     renderDialog()
//     overlay.classList.add('active')
//   })

//   overlay.addEventListener('click', function(e) {
//     e.stopPropagation()
//     if (e.target === overlay) {
//       overlay.classList.remove('active')
//     }
//   })

//   closeDialog.addEventListener('click', function(e) {
//     e.stopPropagation()
//     overlay.classList.remove('active')
//   })

//   function renderDialog() {
//     var products = state.orderedProducts
//     var summary = getOrderedProductsSummary(products)
//     overlay.querySelector('[js-dom = "dialog-total-quantity"]').innerHTML = summary.totalQuantity
//     overlay.querySelector('[js-dom = "dialog-total-price"]').innerHTML = summary.totalPrice

//     var productListDom = overlay.querySelector('[js-dom = "dialog-product-list"]')

//     while (productListDom.firstChild) {
//       productListDom.removeChild(productListDom.firstChild)
//     }

//     for (var key in products) {
//       productListDom.appendChild(getDialogProductDom(products[key]))
//     }

//     function getDialogProductDom(product) {
//       var tpl = [
//         '<div class="col-1-3 smart-grid-padding">',
//           '<div class="card row" js-dom="dialog-product">',
//             '<div class="card-image row">',
//               '<img src="" js-dom="dialog-product-img">',
//             '</div>',
//             '<div class="card-content row">',
//               '<div class="row key-info" js-dom="dialog-product-key-info">',
//                 '<p class="title"></p>',
//                 '<p class="price"></p>',
//                 '<p></p>',
//               '</div>',
//               '<div clas="row">',
//                 '<div class="col-1-3 select-wrapper">',
//                   '<select name="quantity" dir="rtl" js-dom="dialog-product-select">',
//                     '<option value="1">1</option>',
//                     '<option value="2">2</option>',
//                     '<option value="3">3</option>',
//                     '<option value="4">4</option>',
//                     '<option value="5">5</option>',
//                     '<option value="6">6</option>',
//                     '<option value="7">7</option>',
//                     '<option value="8">8</option>',
//                     '<option value="9">9</option>',
//                     '<option value="10">10</option>',
//                   '</select>',
//                 '</div>',
//                 '<div class="col-2-3">',
//                   '<button class="row" type="button" js-dom="dialog-product-delete">',
//                     '<i class="fas fa-trash-alt"></i>',
//                   '</button>',
//                 '</div>',
//               '</div>',
//             '</div>',
//           '</div>',
//         '</div>',
//       ].join('')
//       var parent = document.createElement('div')
//       parent.innerHTML = tpl
      
//       var productDom = parent.firstChild
//       productDom.querySelector('[js-dom = "dialog-product-img"]').setAttribute('src', product.src)
      
//       var dataDoms = productDom.querySelector('[js-dom = "dialog-product-key-info"]').children
//       dataDoms[0].textContent = product.title
//       dataDoms[1].textContent = 'NT$' + String(product.price)
//       dataDoms[2].textContent = product.id
      
//       var optionDoms = productDom.querySelector('[js-dom = "dialog-product-select"]').children
//       for (var i = 0; i < optionDoms.length; i++) {
//         if (parseInt(optionDoms[i].value) === product.quantity) {
//           optionDoms[i].selected = true
//           break
//         }
//       }

//       return productDom
//     }
//   }
// }
// initDialog()

/**
  任務3: 修改之前的code, 讓刪除商品生效
*/
// var state = { orderedProducts: {} }

// function getOrderedProductsSummary(products) {
//   var totalQuantity = 0
//   var totalPrice = 0
//   for (var key in products) {
//     totalQuantity += products[key].quantity
//     totalPrice += products[key].quantity * products[key].price
//   }
//   return {
//     totalQuantity: totalQuantity,
//     totalPrice: totalPrice,
//   }
// }

// function initAddToCart() {
//   var buttons = document.querySelectorAll('[js-dom = "product-add"]')
//   for (var i = 0; i < buttons.length; i++) {
//     addListenerForButton(buttons[i])
//   }

//   function addListenerForButton(button) {
//     button.addEventListener('click', function(e) {
//       updateSate(button)
//       renderCart()
//     })
//   }

//   function updateSate(button) {
//     var productDom = button.closest('[js-dom = "product"]')
//     var dataDoms = productDom.querySelector('[js-dom = "product-key-info"]').children
//     var products = state.orderedProducts
//     var id = dataDoms[2].textContent
//     if (products[id]) {
//       if (products[id].quantity >= 10) return
//       products[id].quantity += 1
//     } else {
//       products[id] = {
//         src: productDom.querySelector('[js-dom = "product-img"]').src,
//         title: dataDoms[0].textContent,
//         price: parseInt(dataDoms[1].textContent.replace('NT$', '')),
//         id: id,
//         quantity: 1,
//       }
//     }
//   }
// }
// function renderCart() {
//   var cartQuantity = document.querySelector('[js-dom = "cart-quantity"]')
//   var summary = getOrderedProductsSummary(state.orderedProducts)
//   cartQuantity.innerHTML = summary.totalQuantity
// }
// initAddToCart()

// function initDialog() {
//   var cart = document.querySelector('[js-dom = "cart"]')
//   var overlay = document.querySelector('[js-dom = "overlay"]')
//   var closeDialog = document.querySelector('[js-dom = "close-dialog"]')
//   var productList = document.querySelector('[js-dom = "dialog-product-list"')

//   cart.addEventListener('click', function(e) {
//     renderDialog()
//     overlay.classList.add('active')
//   })

//   overlay.addEventListener('click', function(e) {
//     e.stopPropagation()
//     if (e.target === overlay) {
//       overlay.classList.remove('active')
//     }
//   })

//   closeDialog.addEventListener('click', function(e) {
//     e.stopPropagation()
//     overlay.classList.remove('active')
//   })

//   function initDeleteButtons() {
//     var deleteButtons = document.querySelectorAll('[js-dom = "dialog-product-delete"]')
//     for (var i = 0; i < deleteButtons.length; i++) {
//       addListenerForDeleteButton(deleteButtons[i])
//     }

//     function updateStateAfterDelete(button) {
//       var productDom = button.closest('[js-dom = "dialog-product"]')
//       var dataDoms = productDom.querySelector('[js-dom = "dialog-product-key-info"]').children
//       var products = state.orderedProducts
//       var id = dataDoms[2].textContent
//       delete products[id]
//     }

//     function addListenerForDeleteButton(button) {
//       button.addEventListener('click', function (e) {
//         updateStateAfterDelete(button)
//         renderCart()
//         renderDialog()
//       })
//     }
//   }

//   function renderDialog() {
//     var products = state.orderedProducts
//     var summary = getOrderedProductsSummary(products)
//     overlay.querySelector('[js-dom = "dialog-total-quantity"]').innerHTML = summary.totalQuantity
//     overlay.querySelector('[js-dom = "dialog-total-price"]').innerHTML = summary.totalPrice

//     var productListDom = overlay.querySelector('[js-dom = "dialog-product-list"]')

//     while (productListDom.firstChild) {
//       productListDom.removeChild(productListDom.firstChild)
//     }

//     for (var key in products) {
//       productListDom.appendChild(getDialogProductDom(products[key]))
//     }

//     initDeleteButtons()

//     function getDialogProductDom(product) {
//       var tpl = [
//         '<div class="col-1-3 smart-grid-padding">',
//           '<div class="card row" js-dom="dialog-product">',
//             '<div class="card-image row">',
//               '<img src="" js-dom="dialog-product-img">',
//             '</div>',
//             '<div class="card-content row">',
//               '<div class="row key-info" js-dom="dialog-product-key-info">',
//                 '<p class="title"></p>',
//                 '<p class="price"></p>',
//                 '<p></p>',
//               '</div>',
//               '<div clas="row">',
//                 '<div class="col-1-3 select-wrapper">',
//                   '<select name="quantity" dir="rtl" js-dom="dialog-product-select">',
//                     '<option value="1">1</option>',
//                     '<option value="2">2</option>',
//                     '<option value="3">3</option>',
//                     '<option value="4">4</option>',
//                     '<option value="5">5</option>',
//                     '<option value="6">6</option>',
//                     '<option value="7">7</option>',
//                     '<option value="8">8</option>',
//                     '<option value="9">9</option>',
//                     '<option value="10">10</option>',
//                   '</select>',
//                 '</div>',
//                 '<div class="col-2-3">',
//                   '<button class="row" type="button" js-dom="dialog-product-delete">',
//                     '<i class="fas fa-trash-alt"></i>',
//                   '</button>',
//                 '</div>',
//               '</div>',
//             '</div>',
//           '</div>',
//         '</div>',
//       ].join('')
//       var parent = document.createElement('div')
//       parent.innerHTML = tpl
      
//       var productDom = parent.firstChild
//       productDom.querySelector('[js-dom = "dialog-product-img"]').setAttribute('src', product.src)
      
//       var dataDoms = productDom.querySelector('[js-dom = "dialog-product-key-info"]').children
//       dataDoms[0].textContent = product.title
//       dataDoms[1].textContent = 'NT$' + String(product.price)
//       dataDoms[2].textContent = product.id
      
//       var optionDoms = productDom.querySelector('[js-dom = "dialog-product-select"]').children
//       for (var i = 0; i < optionDoms.length; i++) {
//         if (parseInt(optionDoms[i].value) === product.quantity) {
//           optionDoms[i].selected = true
//           break
//         }
//       }

//       return productDom
//     }
//   }
// }
// initDialog()

/**
  任務4
*/
// var state = { orderedProducts: {} }

// function getOrderedProductsSummary(products) {
//   var totalQuantity = 0
//   var totalPrice = 0
//   for (var key in products) {
//     totalQuantity += products[key].quantity
//     totalPrice += products[key].quantity * products[key].price
//   }
//   return {
//     totalQuantity: totalQuantity,
//     totalPrice: totalPrice,
//   }
// }

/**
  index/fashion/food only - START
*/
// function initAddToCart() {
//   var buttons = document.querySelectorAll('[js-dom = "product-add"]')
//   for (var i = 0; i < buttons.length; i++) {
//     addListenerForButton(buttons[i])
//   }

//   function addListenerForButton(button) {
//     button.addEventListener('click', function(e) {
//       updateSate(button)
//       renderCart()
//     })
//   }

//   function updateSate(button) {
//     var productDom = button.closest('[js-dom = "product"]')
//     var dataDoms = productDom.querySelector('[js-dom = "product-key-info"]').children
//     var products = state.orderedProducts
//     var id = dataDoms[2].textContent
//     if (products[id]) {
//       if (products[id].quantity >= 10) return
//       products[id].quantity += 1
//     } else {
//       products[id] = {
//         src: productDom.querySelector('[js-dom = "product-img"]').src,
//         title: dataDoms[0].textContent,
//         price: parseInt(dataDoms[1].textContent.replace('NT$', '')),
//         id: id,
//         quantity: 1,
//       }
//     }
//   }
// }
// initAddToCart()
/**
  index/fashion/food only - END
*/

// function renderCart() {
//   var cartQuantity = document.querySelector('[js-dom = "cart-quantity"]')
//   var summary = getOrderedProductsSummary(state.orderedProducts)
//   cartQuantity.innerHTML = summary.totalQuantity
// }


// function initDialog() {
//   var cart = document.querySelector('[js-dom = "cart"]')
//   var overlay = document.querySelector('[js-dom = "overlay"]')
//   var closeDialog = document.querySelector('[js-dom = "close-dialog"]')
//   var productList = document.querySelector('[js-dom = "dialog-product-list"')

//   cart.addEventListener('click', function(e) {
//     renderDialog()
//     overlay.classList.add('active')
//   })

//   overlay.addEventListener('click', function(e) {
//     e.stopPropagation()
//     if (e.target === overlay) {
//       overlay.classList.remove('active')
//     }
//   })

//   closeDialog.addEventListener('click', function(e) {
//     e.stopPropagation()
//     overlay.classList.remove('active')
//   })

//   function initDeleteButtons() {
//     var deleteButtons = document.querySelectorAll('[js-dom = "dialog-product-delete"]')
//     for (var i = 0; i < deleteButtons.length; i++) {
//       addListenerForDeleteButton(deleteButtons[i])
//     }

//     function updateStateAfterDelete(button) {
//       var productDom = button.closest('[js-dom = "dialog-product"]')
//       var dataDoms = productDom.querySelector('[js-dom = "dialog-product-key-info"]').children
//       var products = state.orderedProducts
//       var id = dataDoms[2].textContent
//       delete products[id]
//     }

//     function addListenerForDeleteButton(button) {
//       button.addEventListener('click', function (e) {
//         updateStateAfterDelete(button)
//         renderCart()
//         renderDialog()
//       })
//     }
//   }

//   function initSelect() {
//     var selects = document.querySelectorAll('[js-dom = "dialog-product-select"]')
//     for (var i = 0; i < selects.length; i++) {
//       addListenerForSelect(selects[i])
//     }

//     function addListenerForSelect(select) {
//       select.addEventListener('change', function (e) {
//         updateStateAfterSelect(select)
//         renderCart()
//         renderDialog()
//       })
//     }

//     function updateStateAfterSelect(select) {
//       var productDom = select.closest('[js-dom = "dialog-product"]')
//       var dataDoms = productDom.querySelector('[js-dom = "dialog-product-key-info"]').children
//       var products = state.orderedProducts
//       var id = dataDoms[2].textContent
//       products[id].quantity = parseInt(select.value)
//     }
//   }

//   function renderDialog() {
//     var products = state.orderedProducts
//     var summary = getOrderedProductsSummary(products)
//     overlay.querySelector('[js-dom = "dialog-total-quantity"]').innerHTML = summary.totalQuantity
//     overlay.querySelector('[js-dom = "dialog-total-price"]').innerHTML = summary.totalPrice

//     var productListDom = overlay.querySelector('[js-dom = "dialog-product-list"]')

//     while (productListDom.firstChild) {
//       productListDom.removeChild(productListDom.firstChild)
//     }

//     for (var key in products) {
//       productListDom.appendChild(getDialogProductDom(products[key]))
//     }

//     initSelect()
//     initDeleteButtons()

//     function getDialogProductDom(product) {
//       var tpl = [
//         '<div class="col-1-3 smart-grid-padding">',
//           '<div class="card row" js-dom="dialog-product">',
//             '<div class="card-image row">',
//               '<img src="" js-dom="dialog-product-img">',
//             '</div>',
//             '<div class="card-content row">',
//               '<div class="row key-info" js-dom="dialog-product-key-info">',
//                 '<p class="title"></p>',
//                 '<p class="price"></p>',
//                 '<p></p>',
//               '</div>',
//               '<div clas="row">',
//                 '<div class="col-1-3 select-wrapper">',
//                   '<select name="quantity" dir="rtl" js-dom="dialog-product-select">',
//                     '<option value="1">1</option>',
//                     '<option value="2">2</option>',
//                     '<option value="3">3</option>',
//                     '<option value="4">4</option>',
//                     '<option value="5">5</option>',
//                     '<option value="6">6</option>',
//                     '<option value="7">7</option>',
//                     '<option value="8">8</option>',
//                     '<option value="9">9</option>',
//                     '<option value="10">10</option>',
//                   '</select>',
//                 '</div>',
//                 '<div class="col-2-3">',
//                   '<button class="row" type="button" js-dom="dialog-product-delete">',
//                     '<i class="fas fa-trash-alt"></i>',
//                   '</button>',
//                 '</div>',
//               '</div>',
//             '</div>',
//           '</div>',
//         '</div>',
//       ].join('')
//       var parent = document.createElement('div')
//       parent.innerHTML = tpl
      
//       var productDom = parent.firstChild
//       productDom.querySelector('[js-dom = "dialog-product-img"]').setAttribute('src', product.src)
      
//       var dataDoms = productDom.querySelector('[js-dom = "dialog-product-key-info"]').children
//       dataDoms[0].textContent = product.title
//       dataDoms[1].textContent = 'NT$' + String(product.price)
//       dataDoms[2].textContent = product.id
      
//       var optionDoms = productDom.querySelector('[js-dom = "dialog-product-select"]').children
//       for (var i = 0; i < optionDoms.length; i++) {
//         if (parseInt(optionDoms[i].value) === product.quantity) {
//           optionDoms[i].selected = true
//           break
//         }
//       }

//       return productDom
//     }
//   }
// }
// initDialog()

/**
  任務5: product-view
*/
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

/**
  product-view only - START
*/
function initConfirmQuantity() {
  var button = document.querySelector('[js-dom = "confirm-quantity"]')
  addListenerForButton(button)

  function addListenerForButton(button) {
    button.addEventListener('click', function(e) {
      updateSate()
      renderCart()
    })
  }

  function updateSate() {
    var products = state.orderedProducts
    var srcDom = document.querySelector('[js-dom = "img-list"]').children[0].children[0]
    var titleDom = document.querySelector('[js-dom = "title"]')
    var priceDom = document.querySelector('[js-dom = "price"]')
    var id = document.querySelector('[js-dom = "id"]').textContent
    var quantityDom = document.querySelector('[js-dom = "select"]')
    if (products[id]) {
      products[id].quantity = parseInt(quantityDom.value)
    } else {
      products[id] = {
        src: srcDom.src,
        title: titleDom.textContent,
        price: parseInt(priceDom.textContent.replace('NT$', '')),
        id: id,
        quantity: parseInt(quantityDom.value),
      }
    }
  }
}
initConfirmQuantity()
/**
  product-view only - END
*/

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
      var id = dataDoms[2].textContent
      products[id].quantity = parseInt(select.value)
    }
  }

  function renderDialog() {
    var products = state.orderedProducts
    var summary = getOrderedProductsSummary(products)
    overlay.querySelector('[js-dom = "dialog-total-quantity"]').innerHTML = summary.totalQuantity
    overlay.querySelector('[js-dom = "dialog-total-price"]').innerHTML = summary.totalPrice

    var productListDom = overlay.querySelector('[js-dom = "dialog-product-list"]')

    while (productListDom.firstChild) {
      productListDom.removeChild(productListDom.firstChild)
    }

    for (var key in products) {
      productListDom.appendChild(getDialogProductDom(products[key]))
    }

    initSelect()
    initDeleteButtons()

    function getDialogProductDom(product) {
      var tpl = [
        '<div class="col-1-3 smart-grid-padding">',
          '<div class="card row" js-dom="dialog-product">',
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
          '</div>',
        '</div>',
      ].join('')
      var parent = document.createElement('div')
      parent.innerHTML = tpl
      
      var productDom = parent.firstChild
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
initDialog()

