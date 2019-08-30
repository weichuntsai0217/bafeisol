function initAddToCart() {
  var buttons = document.querySelectorAll('[js-dom = "product-add"]')
  for (var i = 0; i < buttons.length; i++) {
    addListenerForButton(buttons[i])
  }

  function addListenerForButton(button) {
    button.addEventListener('click', function(e) {
      preventAll(e)
      updateSate(button)
      renderCart()
    })
  }

  function updateSate(button) {
    var productDom = button.closest('[js-dom = "product"]')
    var dataDoms = productDom.querySelector('[js-dom = "product-key-info"]').children
    var products = state.orderedProducts
    var id = dataDoms[2].textContent.trim()
    if (products[id]) {
      if (products[id].quantity >= 10) return
      products[id].quantity += 1
    } else {
      products[id] = {
        src: productDom.querySelector('[js-dom = "product-img"]').src.trim(),
        href: productDom.querySelector('[js-dom = "product-link"]').getAttribute('href').trim(),
        title: dataDoms[0].textContent.trim(),
        price: parseInt(dataDoms[1].textContent.replace('NT$', '').trim()),
        id: id.trim(),
        quantity: 1,
      }
    }
  }
}

initNav()
initSearch()
initDialog()
initAddToCart()