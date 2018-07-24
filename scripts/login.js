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
      // centerDiv.innerHTML = loginTemplate.login()
      createLogin()
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
  const centerDiv = document.querySelector('#center')
  const leftDiv = document.querySelector('#left')
  const rightDiv = document.querySelector('#right')

  console.log(centerDiv)
  navbar.innerHTML = loginTemplate.NavBarTaskTemplate()
  // const allTaskBtn = document.querySelector('#')
  const newListBtn = document.querySelector('#newList')
  const logoutBtn = document.querySelector('#logout')

  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault()
    localStorage.removeItem('token')
    createLogin()
    location.hash = '/login'
    createNavBar()
    leftDiv.innerHTML = ''
    rightDiv.innerHTML = ''
  })

  newListBtn.addEventListener('click', (event) => {
    event.preventDefault()
    console.log('IN ADD NEW LIST')
    centerDiv.innerHTML = ''
    leftDiv.innerHTML = ''
    rightDiv.innerHTML = ''
    //centerDiv.innerHTML = loginTemplate.createNewListTemplate()
    addNewList()
  })  
}

function addNewList() {
  const centerDiv = document.querySelector('#center')
  centerDiv.innerHTML = loginTemplate.createNewListTemplate()
  const newListForm = document.querySelector('#newListForm')
  const token = window.localStorage.getItem('token')
  
  newListForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const body = {
      title: document.querySelector('#newListTitle').value
    }
    console.log('Sending:' , body)

    return axios(`${herokuURL}/lists`, {
      headers: {authorization: `Bearer ${token}`},
        data: body,
        method: 'POST'})
    .then(() => {
        console.log('New List Created, rebuild')
        createNavBarTasks()
        getTasks(token)
      }).catch(e => {
        console.log(e)
      })
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


module.exports = { createLogin, createNavBar, createNavBarTasks }