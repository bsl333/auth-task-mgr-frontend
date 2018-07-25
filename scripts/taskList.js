const axios = require('axios')

const taskListTemplate = require('./taskListTemplate')
const { herokuURL } = require('./constants')

function getTasks(token, listId) {
  return axios.get(`${herokuURL}/lists`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      allTasksBtn()
      const { lists } = res.data
      let listIndex = lists.findIndex(list => list.id === listId)
      listIndex = listIndex > -1 ? listIndex : 0
      // LEFT PANEL
      if (lists.length === 0) {
        generateLists(lists, listIndex)
        createTask()
      } else {
        generateLists(lists, listIndex)
        // CENTER/RIGHT PANEL: only render first list to start
        generateTasks(lists[listIndex])
        createTask()
        setListToActive(lists[listIndex], listIndex)
      }
    })
}

function generateLists(lists, index) {
  if (lists.length === 0) {
    window.location.hash = `/lists`
    const left = document.querySelector('#left')
    const div = document.createElement('div')
    div.innerHTML = taskListTemplate.newTaskForm()
    left.appendChild(div)
  } else {

    window.location.hash = `/lists/${lists[index].id}`
    const left = document.querySelector('#left')
    left.innerHTML = taskListTemplate.getAllLists()
    const ul = document.querySelector('#all-lists')

    lists.forEach((list) => {
      const li = document.createElement('li')
      li.className = 'list-group-item'
      li.innerText = list.title
      // li.innerHTML += `<button type="button" class="btn btn-danger float-right">delete <span class="badge">7</span></button>
      // `
      li.setAttribute('list-id', list.id)
      ul.appendChild(li)
      li.addEventListener('click', () => {
        generateTasks(list)
        window.location.hash = `/lists/${list.id}`
        setListToActive(list)
      })
    })
    const div = document.createElement('div')
    div.innerHTML = taskListTemplate.newTaskForm()
    left.appendChild(div)
    ul.firstElementChild.classList = 'list-group-item active'
  }
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
        headers: { authorization: `Bearer ${token}` },
        data: { title: newTitle, description: newDesc, list_id: listId },
        method: 'POST'
      }
    ).then(() => {
      getTasks(localStorage.getItem('token'), getActiveListId())
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
        headers: { authorization: `Bearer ${token}` },
        data: { completed: true },
        method: 'PATCH'
      }
      axios(`${herokuURL}/lists/${listId}/tasks/${taskId}`, options)
        .then(() => getTasks(token, getActiveListId()))

    })
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
        .then(() => getTasks(token, getActiveListId()))
    })
  })
}

function getActiveListId() {
  const li = document.querySelector('#left ul li.active')
  return parseInt(li.getAttribute('list-id'))
}

function setListToActive(list) {
  const lis = Array.from(document.querySelectorAll('#left ul li'))
  lis.filter(li => li.getAttribute('list-id') != list.id).forEach(formatInactiveLists)
  const [li] = lis.filter(li => li.getAttribute('list-id') == list.id)
  li.classList.add('active')
  if (li.firstElementChild) li.firstElementChild.remove()
}

function formatInactiveLists(li) {
  li.classList.remove('active')
  if (!li.firstElementChild) {
    const btn = document.createElement('button')
    btn.className = 'btn btn-danger float-right btn-sm'
    btn.setAttribute('list-id', li.getAttribute('list-id'))
    btn.textContent = 'Delete'
    btn.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      const token = localStorage.getItem('token')
      const listId = event.target.getAttribute('list-id')
      const options = {
        headers: { authorization: `Bearer ${token}` },
        method: 'DELETE'
      }
      axios(`${herokuURL}/lists/${listId}`, options)
        .then(() => getTasks(token))
    })

    li.appendChild(btn)

  }
}

function allTasksBtn() {
  document.querySelector('#allTasks').addEventListener('click', (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    getTasks(token)
  })
}

module.exports = { getTasks, createTask }