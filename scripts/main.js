const login = require('./login')
const getTask = require('./taskList')

const token = window.localStorage.getItem('token')
if (!token) {
  login.createLogin()
} else {
  getTask.getTasks(token)
}