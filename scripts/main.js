const token = window.localStorage.getItem('token')
const login = require('./login')
//const getTask = require('./taskList')

if(!token) {
    login.createLogin()
} else {
    console.log('IN CREATE')
}