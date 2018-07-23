const localhostURL = 'http://localhost:5000/api'
const herokuURL = 'https://limitless-spire-56303.herokuapp.com/api'
const baseURL = window.location.href.includes('herokuapp') ? herokuURL : localhostURL

module.exports = {
  localhostURL,
  herokuURL,
  baseURL
}

