function getAllLists() {
  return `
  <h3>All Lists</h3>
  <ul class="list-group" id="all-lists">
  </ul>
  `
}

function centerTasks() {
  return `
  <h3>Doing</h3>
  <ul id="doing-ul"></ul>
  `

}

function completedTasks() {
  return `
  <h3>Completed</h3>
  <ul id="completed-ul"></ul>
  `

}

function newTaskForm() {
  return `
  <form class="mt-5 bg-dark p-3 text-white" id="newTask">
    <h4>Create New Task</h4>
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" name="title" id="title" class="form-control">
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <input type="text" name="description" id="description" class="form-control">
    </div>

    <button class="btn btn-primary">Create New Task</button>
  </form>
  `
}

function doingCards(title, desc) {
  return `  
  <div class="card text-center">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${desc}</p>
      <a href="#" class="btn btn-success btn-max-width">Complete</a>
    </div>
  </div>
  `
}

function completedCards (title, desc) {
  return `  
  <div class="card text-center">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${desc}</p>
      <a href="#" class="btn btn-danger btn-max-width">Remove</a>
    </div>
  </div>
  `
}

module.exports = {
  getAllLists,
  newTaskForm,
  doingCards,
  centerTasks,
  completedCards,
  completedTasks
}