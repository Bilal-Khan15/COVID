$(document).ready(()=>{

    console.log('signup')

    let api = new API()

    let response = api.getRoles().then(resolve=>{
        resolve.Role.forEach(element => {
            $('#institution').append('<option style="color: black;">'+element.name+'</option>')
        });

    })

    $('#signup').submit((e)=>{
        
        e.preventDefault()
        console.log($('#fname').val())
        console.log($('#lname').val())
        console.log($('#password').val())
        console.log($('#repass').val())
        console.log($('#email').val())
        console.log($('#institution').val())
        console.log($('#phone').val())
        if($('#password').val()===$('#repass').val()){
            let packet = {
                "user_name": $('#uname').val(), 
                "fname": $('#fname').val(),
                "lname": $('#lname').val(),
                "institution": $('#institution').val(),
                "mobile": $('#phone').val(),
                "email": $('#email').val(),
                "password": $('#password').val(),
                "confirm_password": $('#repass').val()

            }
            api.createUser(packet)
        }
        else{
            var x = document.getElementById("snackbar");
            x.className = "show";
            $('.alert-info').hide()
            $('.alert-success').hide()
            $('.alert-warning').show()
            $('.alert-danger').hide()
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
        }
    })

})
