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