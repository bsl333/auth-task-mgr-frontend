const axios = require('axios')

const loginTemplate = require('./loginTemplate')
const { getTasks } = require('./taskList')
const { herokuURL } = require('./constants')



function createNavBar() {
  const main = document.querySelector('#nb')

    main.innerHTML = loginTemplate.NavBarLoginTemplate()
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
      centerDiv.innerHTML = ''
      centerDiv.innerHTML = loginTemplate.register()
      registerNewUSer()
      location.hash = '/register'
    })
}

function createNavBarTasks() {
  const navbar = document.querySelector('#nb')

  navbar.innerHTML = loginTemplate.NavBarTaskTemplate()
  // const allTaskBtn = document.querySelector('#')
  // const newListBtn = document.querySelector('#')
  const logoutBtn = document.querySelector('#logout')

  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault()
    localStorage.removeItem('token')
    createLogin()
    location.hash = '/login'
    createNavBar()
    document.querySelector('#left').innerHTML = ''
    document.querySelector('#right').innerHTML = ''
  })
}



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
        createNavBarTasks()
      })
      .catch(e => {
        const centerDiv = document.querySelector('#center')
        centerDiv.innerHTML += loginTemplate.invalidLogin()
        setTimeout(() => createLogin(), 2000) 
        console.log(e)
      })

  })
}

function registerNewUSer() {
  const centerDiv = document.querySelector('#center')
  centerDiv.innerHTML = loginTemplate.register()
  location.hash = '/register'


  const regForm = document.querySelector('#registerForm')
  regForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const body = {
      first_name: event.target.fName.value,
      last_name: event.target.lName.value,
      email: event.target.email.value,
      password: event.target.password.value
    }
    return axios.post(`${herokuURL}/users/signup`, body)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        return res.data.token
      })
      .then(token => {
        getTasks(token)
        createNavBarTasks()
      })
      .catch(e => {
        const centerDiv = document.querySelector('#center')
        centerDiv.innerHTML += loginTemplate.invalidLogin()
        setTimeout(() => createLogin(), 2000)
        console.log(e)
      })

  })

}

module.exports = { createLogin, createNavBar, createNavBarTasks, registerNewUSer }