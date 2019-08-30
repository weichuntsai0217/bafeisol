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
    var linkDom = document.querySelector('[js-dom = "link"]')
    var srcDom = document.querySelector('[js-dom = "img-list"]').children[0].children[0]
    var titleDom = document.querySelector('[js-dom = "title"]')
    var priceDom = document.querySelector('[js-dom = "price"]')
    var id = document.querySelector('[js-dom = "id"]').textContent.trim()
    var quantityDom = document.querySelector('[js-dom = "select"]')
    if (products[id]) {
      products[id].quantity = parseInt(quantityDom.value.trim())
    } else {
      products[id] = {
        src: srcDom.src.trim(),
        href: linkDom.getAttribute('href').trim(),
        title: titleDom.textContent.trim(),
        price: parseInt(priceDom.textContent.replace('NT$', '').trim()),
        id: id,
        quantity: parseInt(quantityDom.value.trim()),
      }
    }
  }
}

initNav()
initSearch()
initDialog()
initConfirmQuantity()