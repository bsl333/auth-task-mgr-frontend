function login() {
  return `
  <form class="border loginForm">
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
  <form class="border registerForm">
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

module.exports = {
  login,
  register
}