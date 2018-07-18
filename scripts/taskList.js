const axios = require('axios')
const taskListTemplate = require('./taskListTemplate')

function getTasks(token) {
  return axios.get('http://localhost:5000/api/lists', {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    console.log(res)
    const left = document.querySelector('#left')
    left.innerHTML =  taskListTemplate.getAllLists()
    const ul = document.querySelector('#all-lists')
    const lists = res.data.lists
    console.log(lists[0])
    
    lists.forEach(list => {
      const li = document.createElement('li')
      li.className = 'list-group-item'
      li.innerText = list.title
      ul.appendChild(li)
    })

    left.innerHTML += taskListTemplate.newTaskForm()


  })
}

module.exports = { getTasks }