const axios = require('axios')

const taskListTemplate = require('./taskListTemplate')
const { herokuURL } = require('./constants')

function getTasks(token, index = 0) {
  return axios.get(`${herokuURL}/lists`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      const { lists } = res.data
      // LEFT PANEL
      generateLists(lists, index)
      // CENTER/RIGHT PANEL: only render first list to start
      generateTasks(lists[index])
      createTask()
      setActiveList(lists[index], index)
    })
}

function generateLists(lists, index) {
  window.location.hash = `/lists/${lists[index].id}`
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
      li.innerHTML = taskListTemplate.doingCards(task.title, task.description, task.id)
      doingUL.appendChild(li)
    } else {
      li.innerHTML = taskListTemplate.completedCards(task.title, task.description, task.id)
      completedUL.appendChild(li)
    }
  })

  addEventListenersToBtns()
}

function createTask() {
  const form = document.querySelector('#newTask')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const [listId] = window.location.href.split('/').slice(-1)

    const newTitle = document.querySelector('#title').value
    const newDesc = document.querySelector('#description').value
    const token = localStorage.getItem('token')
    return axios(`${herokuURL}/lists/${listId}/tasks`,
      { 
        headers: { authorization: `Bearer ${token}`},
        data: { title: newTitle, description: newDesc, list_id: listId },
        method: 'POST'
      } //explicit list id but needs to be from selection
    ).then(() => {
      getTasks(localStorage.getItem('token'), getActiveListIndex())
    })
  })

}

function addEventListenersToBtns() {
  const doingBtns = Array.from(document.querySelectorAll('#center a'))
  const completedBtns = Array.from(document.querySelectorAll('#right a'))
  const token = localStorage.getItem('token')

  doingBtns.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault()
      const [listId] = window.location.href.split('/').slice(-1)
      const taskId = event.target.getAttribute('task-id')

      const options = {
        headers: { authorization: `Bearer ${token}`},
        data: { completed: true },
        method: 'PATCH'
      }
      axios(`${herokuURL}/lists/${listId}/tasks/${taskId}`, options)
        .then(() => getTasks(token, getActiveListIndex()))
  
    })

    completedBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault()
        const [listId] = window.location.href.split('/').slice(-1)
        const taskId = event.target.getAttribute('task-id')
        const options = {
          headers: { authorization: `Bearer ${token}` },
          method: 'DELETE'
        }
        axios(`${herokuURL}/lists/${listId}/tasks/${taskId}`, options)
          .then(() => getTasks(token, getActiveListIndex()))
      })
    })
  })
}

function getActiveListIndex() {
  const li = document.querySelector('#left ul li.active')
  return parseInt(li.getAttribute('index'))
}

function setActiveList(list, index) {
  const listId = list.id
  const lis = Array.from(document.querySelectorAll('#left ul li'))
  lis.forEach(li => li.classList.remove('active'))
  const [li] = lis.filter(li => li.getAttribute('index') == index)
  li.classList.add('active')
  
}

module.exports = { getTasks, createTask }