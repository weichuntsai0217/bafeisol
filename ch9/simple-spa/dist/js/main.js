
function getHeader() {
  var header =  document.createElement('header')
  header.appendChild(getH1())
  header.appendChild(getNav())
  return header
}

function getH1() {
  var h1 = document.createElement('h1')
  h1.innerHTML = '<a href="/">光速買</a>'
  return h1
}

function getNav() {
  var nav = document.createElement('nav')
  nav.innerHTML = '<ul><li><a href="/fashion">流行時尚</a></li><li><a href="/food">美食饗宴</a></li></ul>'
  return nav
}

function initHeader() {
  var links = document.querySelectorAll('header a')
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      var pathname = e.target.getAttribute('href')
      var path = state.routeMap[pathname]
      var newPathname = window.location.origin + pathname
      window.history.pushState({}, pathname, newPathname) // 把新的網址放到瀏覽器的網址輸入列.
      request('GET', path)
    })
  })
}

window.onpopstate = function () {
  // 此為點擊瀏覽器的"回上一頁"對應的callback
  var path = state.routeMap[window.location.pathname]
  request('GET', path)
}

function request(method, path) {
  xhr = new XMLHttpRequest()
  xhr.addEventListener('load', onComplete)
  xhr.open(method, path)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send()
  function onComplete() {
    var status = xhr.status
    var res = JSON.parse(xhr.response)
    if (status === 200) {
      state.products = res.products
      renderMain()
    } else {
      alert('Server發生錯誤，請稍後再試')
    }
  }
}

function getMain() {
  return document.createElement('main')
}

function renderMain() {
  var products = state.products
  var main = document.querySelector('main')
  while (main.firstChild) {
    main.firstChild.remove()
  }
  var ul = document.createElement('ul')
  products.forEach(function(p) {
    var li = document.createElement('li')
    li.innerHTML = p.title + ': NT$' + p.price
    ul.appendChild(li)
  })
  main.appendChild(ul)
}

function initApp() {
  var app = document.querySelector('#app-root')
  var path = state.routeMap[window.location.pathname]
  app.appendChild(getHeader())
  app.appendChild(getMain())
  initHeader()
  if (path) request('GET', path)
}

function getInitState() {
  return {
    routeMap: {
      '/': '/rest/all-products',
      '/fashion': '/rest/fashion-products',
      '/food': '/rest/food-products',
    },
    products: [],
  }
}

var state = getInitState()
initApp()
