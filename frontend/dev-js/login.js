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
        let login = api.login(auth).then(resolve=>{
            console.log(resolve.data)
            if(resolve.data.user.toLowerCase() === "state epidemiologist"){
                $('.alert-success').show()
                $('.alert-info').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()
                localStorage.setItem('email',resolve.data.email)
                    setTimeout(()=>{    
                    window.location.href = "./State Epidemiologist.html"
                },1500)
    
            }
            else if(resolve.data.user.toLowerCase() === "state officer"){
                $('.alert-success').show()
                $('.alert-info').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()
                localStorage.setItem('email',resolve.data.email)
                    setTimeout(()=>{    
                    window.location.href = "./State Officer.html"
                },1500)
    
            }
            else if(resolve.data.user.toLowerCase() === "field worker"){
                $('.alert-success').show()
                $('.alert-info').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()
                localStorage.setItem('email',resolve.data.email)
                    setTimeout(()=>{    
                    window.location.href = "./Field worker.html"
                },1500)
    
            }
            else if(resolve.data.user.toLowerCase() === "laboratory officer"){
                $('.alert-success').show()
                $('.alert-info').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()
                localStorage.setItem('email',resolve.data.email)
                    setTimeout(()=>{    
                    window.location.href = "./Laboratory officer.html"
                },1500)
    
            }
            else if(resolve.data.user.toLowerCase() === "admin"){
                $('.alert-success').show()
                $('.alert-info').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()
                localStorage.setItem('email',resolve.data.email)
                    setTimeout(()=>{    
                    window.location.href = "./admin.html"
                },1500)
    
            }
            else{}

            // if(err.response.data==="User is not enable"){
            //     var x = document.getElementById("snackbar");
            //     x.className = "show";
            //     $('.alert-info').hide()
            //     $('.alert-success').hide()
            //     $('.alert-warning').hide()
            //     $('.alert-danger').show()
            //     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
            // }
            
            // if(err.response.data==="Invalid Credentials"){
            //     var x = document.getElementById("snackbar");
            //     x.className = "show";
            //     $('.alert-info').hide()
            //     $('.alert-success').hide()
            //     $('.alert-warning').show()
            //     $('.alert-danger').hide()
            //     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
            // }


        })

    })

})
