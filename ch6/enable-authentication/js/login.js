
var form = document.querySelector('[js-dom = "member-form"]')
var loginButton = document.querySelector('[js-dom = "login"]')
var signupButton = document.querySelector('[js-dom = "signup"]')

initSubmitButton(form, loginButton, '/session')
initSubmitButton(form, signupButton, '/user')

function initSubmitButton(form, button, action) {
  button.addEventListener('click', function (e) {
    form.method = 'post'
    form.action = action
    form.submit()
  })
}
