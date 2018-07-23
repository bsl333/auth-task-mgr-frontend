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
    return axios.post('http://localhost:5000/api/users/login', body)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
       
      })
      .catch(e => {
        const centerDiv = document.querySelector('#center')
        centerDiv.innerHTML += loginTemplate.invalidLogin()
        console.log(e)
      })

  })
}
module.exports = { createLogin }