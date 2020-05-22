$(document).ready(()=>{

    console.log('login')

    let counter = 0
    let api = new API()
    $('#login').submit(function(e){
        
        e.preventDefault()
        console.log($('#email').val())
        console.log($('#password').val())
        let auth= {
            user_name: $('#email').val(),
            password: $('#password').val()
        }
        console.log(auth)
        login(auth)

    })

    login = ( payload )=>{
        
        axios.post(url+'login', payload,{
            headers:{
                "Content-Type" : "application/json",
            },
        })
        .then(response=>{
            console.log(response)
            
            if(response.data.user.toLowerCase() === "state epidemiologist"){
                $('.alert-success').show()
                $('.alert-info').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()
                localStorage.setItem('email',response.data.email)
                    setTimeout(()=>{    
                    window.location.href = "./State Epidemiologist.html"
                },1500)
    
            }
            else if(response.data.user.toLowerCase() === "state officer"){
                $('.alert-success').show()
                $('.alert-info').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()
                localStorage.setItem('email',response.data.email)
                    setTimeout(()=>{    
                    window.location.href = "./State Officer.html"
                },1500)
    
            }
            else if(response.data.user.toLowerCase() === "field worker"){
                $('.alert-success').show()
                $('.alert-info').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()
                localStorage.setItem('email',response.data.email)
                    setTimeout(()=>{    
                    window.location.href = "./Field worker.html"
                },1500)
    
            }
            else if(response.data.user.toLowerCase() === "laboratory officer"){
                $('.alert-success').show()
                $('.alert-info').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()
                localStorage.setItem('email',response.data.email)
                    setTimeout(()=>{    
                    window.location.href = "./Laboratory officer.html"
                },1500)
    
            }
            else if(response.data.user.toLowerCase() === "admin"){
                $('.alert-success').show()
                $('.alert-info').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()
                localStorage.setItem('email',response.data.email)
                    setTimeout(()=>{    
                    window.location.href = "./admin.html"
                },1500)
    
            }
            else{}
        })
        .catch(err=>{
            counter= counter+1
            localStorage.setItem('c',counter)
            let count = localStorage.getItem('c')
            if(count==3){
                window.location.href="./reset.html"
            }

            console.log(err.response)
            if(err.response.data==="User is not enable"){
                var x = document.getElementById("snackbar");
                x.className = "show";
                $('.alert-info').hide()
                $('.alert-success').hide()
                $('.alert-warning').hide()
                $('.alert-danger').show()
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
            }
            
            else if(err.response.data==="Invalid Credentials"){
                var x = document.getElementById("snackbar");
                x.className = "show";
                $('.alert-info').hide()
                $('.alert-success').hide()
                $('.alert-warning').show()
                $('.alert-danger').hide()
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
                location.setItem()
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

    }

})
