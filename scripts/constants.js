const localhostURL = 'http://localhost:5000/api'
const herokuURL = 'https://task-manager-back-end.herokuapp.com/api'
const baseURL = window.location.href.includes('herokuapp') ? herokuURL : localhostURL

module.exports = {
  localhostURL,
  herokuURL,
  baseURL
}

