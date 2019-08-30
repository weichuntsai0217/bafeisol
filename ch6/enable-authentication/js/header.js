
function initSearch() {
  var button = document.querySelector('[js-dom = "search-button"]')
  button.addEventListener('click', function (e) {
    var condition = document.querySelector('[js-dom = "search-condition"]').value.trim()
    window.location = '/search?q=' + condition
  })
}

function initNav() {
  var button = document.querySelector('#mobile-menu-button')
  var nav = document.querySelector('nav')
  button.addEventListener('click', function(e) {
    button.classList.toggle('active')
    nav.classList.toggle('active')
  })
}

initSearch()
initNav()
