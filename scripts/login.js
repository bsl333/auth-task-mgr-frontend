const loginTemplate = require('./loginTemplate')
const { getTasks } = require('./taskList')
const { herokuURL } = require('./constants')

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




function createLogin() {
  const centerDiv = document.querySelector('#center')
  centerDiv.innerHTML = loginTemplate.login()
  location.hash = '/login'


  const loginForm = document.querySelector('#loginForm')
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const body = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    return axios.post(`${herokuURL}/users/login`, body)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        return res.data.token
      })
      .then(token => {
        getTasks(token)
      })
      .catch(e => {
        const centerDiv = document.querySelector('#center')
        centerDiv.innerHTML += loginTemplate.invalidLogin()
        setTimeout(() => createLogin(), 2000) 
        console.log(e)
      })

  })
}
module.exports = { createLogin }