function login() {
  return `
  <form class="border" id="loginForm">
    <h1 class="border-bottom">Login</h1>
    <div class="form-group mx-5">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" class="form-control">
    </div>
    <div class="form-group mx-5">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" class="form-control">
    </div>

    <button type="submit" class="btn btn-primary mb-3">Login!</button>
  </form>
  `
}

function register() {
  return `
  <form class="border" id="registerForm">
    <h1 class="border-bottom">Register</h1>
    <div class="form-group mx-5">
      <label for="regEmail">Email</label>
      <input type="email" name="email" id="regEmail" class="form-control">
    </div>
    <div class="form-group mx-5">
      <label for="regPassword">Password</label>
      <input type="password" name="password" id="regPassword" class="form-control">
    </div>

    <button type="submit" class="btn btn-primary mb-3">Login!</button>
  </form>
  `
}

function invalidLogin() {
  return `
          <div class="bg-danger" id="invalid-login">
            Invalid Login </div>`
}

function NavBarTaskTemplate() {
  return `
    
      <ul class="nav justify-content-center bg-dark text-white">

        <li class="nav-item">
          <a class="nav-link active" id="allTasks" href="#">All Tasks</a>
        </li>

        <li class="nav-item">
          <a class="nav-link active" id="newList" href="#">New List</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="logout" href="#">Logout</a>
        </li>
      </ul>
    
    `

}

function NavBarLoginTemplate() {
  return `
    
      <ul class="nav justify-content-center bg-dark text-white">
        <li class="nav-item">
          <a class="nav-link active" id="toggleLogin" href="#">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="toggleRegister" href="#">Register</a>
        </li>
      </ul>
    
    `

}

module.exports = {
  login,
  register,
  invalidLogin,
  NavBarTaskTemplate,
  NavBarLoginTemplate
}