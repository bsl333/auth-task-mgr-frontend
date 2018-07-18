(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function login() {
  return `
  <form class="border loginForm">
    <h1 class="border-bottom">Login</h1>
    <div class="form-group mx-5">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" class="form-control">
    </div>
    <div class="form-group mx-5">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" class="form-control">
    </div>

    <button type="submit" class="btn btn-primary mb-3">Login!</button>
  </form>
  `
}

function register() {
  return `
  <form class="border registerForm">
    <h1 class="border-bottom">Register</h1>
    <div class="form-group mx-5">
      <label for="regEmail">Email</label>
      <input type="email" name="email" id="regEmail" class="form-control">
    </div>
    <div class="form-group mx-5">
      <label for="regPassword">Password</label>
      <input type="password" name="password" id="regPassword" class="form-control">
    </div>

    <button type="submit" class="btn btn-primary mb-3">Login!</button>
  </form>
  `
}

module.exports = {
  login,
  register
}
},{}],2:[function(require,module,exports){
const loginTemplate = require('./loginTemplate')

const loginBtn = document.querySelector('#toggleLogin')
const registerBtn = document.querySelector('#toggleRegister')

loginBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const centerDiv = document.querySelector('#center')
    centerDiv.innerHTML = loginTemplate.login()
    location.hash = '/login'
}) 

registerBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const centerDiv = document.querySelector('#center')
    centerDiv.innerHTML = loginTemplate.register()
    location.hash = '/register'
})

const token = localStorage.getItem('token')
if (!token) {
    const centerDiv = document.querySelector('#center')
    centerDiv.innerHTML = loginTemplate.login()
    location.hash = '/login'
}
},{"./loginTemplate":1}]},{},[2]);
