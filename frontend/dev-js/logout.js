$(document).ready(()=>{

    $('#logout').click(function(){

        localStorage.removeItem('email')
        window.location.href = "./index.html"

    })


})