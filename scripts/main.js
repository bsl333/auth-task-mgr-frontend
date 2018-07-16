$(document).ready(function () {
    $('#toggleRegister').click((event) =>  {
        console.log('HERE')
        $('.loginForm').hide()
        $('.registerForm').show()
    
    })

    $('#toggleLogin').click((event) => {
        console.log('HERE')
        $('.loginForm').show()
        $('.registerForm').hide()

    })
 
})

