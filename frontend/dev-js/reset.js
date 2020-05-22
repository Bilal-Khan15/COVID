$(document).ready(()=>{

    console.log('reset')

    let counter = 0
    let api = new API()
    $('#login').submit(function(e){
        
        e.preventDefault()
        console.log($('#email').val())
        console.log($('#password').val())
        console.log($('#repass').val())
      
        if($('#password').val()===$('#repass').val()){
            let packet = {
                "email": $('#email').val(),
                "password": $('#password').val(),
                "confirm_password": $('#repass').val()
            }
            api.resetPassword(packet)
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
