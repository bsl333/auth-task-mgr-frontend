const axios = require('axios')

const taskListTemplate = require('./taskListTemplate')
const { herokuURL } = require('./constants')

function getTasks(token) {
  return axios.get(`${herokuURL}/lists`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      const { lists } = res.data
      // LEFT PANEL
      generateLists(lists)
      // CENTER/RIGHT PANEL: only render first list to start
      generateTasks(lists[0])


    })
}

function generateLists(lists) {
  window.location.hash = `/lists/${lists[0].id}`
  const left = document.querySelector('#left')
  left.innerHTML = taskListTemplate.getAllLists()
  const ul = document.querySelector('#all-lists')

  lists.forEach((list, idx) => {
    const li = document.createElement('li')
    li.className = 'list-group-item'
    li.innerText = list.title
    li.setAttribute('index', idx)
    ul.appendChild(li)
    li.addEventListener('click', () => {
      generateTasks(list)
      // remove active classes from all lis except selected
      const lis = Array.from(document.querySelector('#all-lists').children)
      window.location.hash = `/lists/${list.id}`
      lis.forEach(child => child.classList.remove('active'))
      li.classList.add('active')
    })
  })
  const div = document.createElement('div')
  div.innerHTML = taskListTemplate.newTaskForm()
  left.appendChild(div)
  ul.firstElementChild.classList = 'list-group-item active'
}

function generateTasks({ tasks }) {
  const center = document.querySelector('#center')
  center.innerHTML = taskListTemplate.centerTasks()
  const doingUL = document.querySelector('#doing-ul')

  const right = document.querySelector('#right')
  right.innerHTML = taskListTemplate.completedTasks()
  completedUL = document.querySelector('#completed-ul')

  tasks.forEach(task => {
    const li = document.createElement('li')
    if (!task.completed) {
      li.innerHTML = taskListTemplate.doingCards(task.title, task.description)
      doingUL.appendChild(li)
    } else {
      li.innerHTML = taskListTemplate.completedCards(task.title, task.description)
      completedUL.appendChild(li)
    } //
  })
}

function createTask(token, listId) {
  const newTitle = document.querySelector('#title').value
  const newDesc = document.querySelector('#description').value
  return axios.post(`${herokuURL}/lists/${listId}/tasks/`,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    }, { title: newTitle, description: newDesc, list_id: 3 }  //explicit list id but needs to be from selection
  ).then(res => {
    console.log(res)
  })

}



module.exports = { getTasks, createTask }