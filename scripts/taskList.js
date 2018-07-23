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
      console.log('THIS', res.data)
      const { lists } = res.data
      
      generateLists(lists)

      //CENTER PANEL
      const center = document.querySelector('#center')
      center.innerHTML = taskListTemplate.centerTasks()
      const doingUL = document.querySelector('#doingUL')

      //FOR CENTER PANEL
      // let tasks = res.tasks

      // console.log('TASKS: ', userID)
      lists[0].tasks.forEach(task => {
        //console.log('task.title:', task.title)
        const doingLi = document.createElement('li')
        doingLi.innerHTML += taskListTemplate.doingCards(task.title, task.description)
        doingUL.appendChild(doingLi)
      })
    })

    center.innerHTML = doingUL



  left.innerHTML += taskListTemplate.newTaskForm()

  // const newTask = document.querySelector("newTask")


  // newTask.addEventListener('submit', (event) => {
  //   event.preventDefault()

  //   console.log('IN ADD E LISTENER')
  //   createTaskList(token, listId)
  // })
}

function generateLists(lists) {
  const left = document.querySelector('#left')
  left.innerHTML = taskListTemplate.getAllLists()
  const ul = document.querySelector('#all-lists')

  const userID = lists[0].user_id
  console.log(userID)
  window.location.hash = `/login/${userID}`
  lists.forEach((list, idx) => {
    const li = document.createElement('li')
    li.className = 'list-group-item'
    li.innerText = list.title
    li.setAttribute('index', idx)
    ul.appendChild(li)
    li.addEventListener('click', () => {
      console.log('clicked', li.classList)
      
      // CHANGE THIS LINE BELOW
      Array.from(document.querySelector('#all-lists').children).forEach(child => child.classList.remove('active'))
      li.classList.add('active')

    })
  })

  ul.firstElementChild.classList = 'list-group-item active'
}


function createTask(token, listId) {
  const newTitle = document.querySelector('#title').value
  const newDesc = document.querySelector('#description').value


  console.log('IN CREATE TASK', token)

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