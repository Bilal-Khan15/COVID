$(document).ready(()=>{

    console.log('login')

    let api = new API()
    $('#login').submit((e)=>{
        
        e.preventDefault()
        console.log($('#email').val())
        console.log($('#password').val())
        let auth= {
            user_name: $('#email').val(),
            password: $('#password').val()
        }
        console.log(auth)
        api.login(auth)

    })

})
