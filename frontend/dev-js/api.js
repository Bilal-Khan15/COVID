let url = "http://127.0.0.1:5000/"

let reset=0
class API{


    getTriage = ()=>{

        return axios.get(url+'triage')

    }
       
    updateEpid = ()=>{

        axios.post(url+'updateEpid',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
        })
        .catch(err=>{
            console.log(err.response)
        })
    }

    getCaseByID = (payload)=>{
        
        return axios.post(url+'case',payload)
        .then(response=>{
            console.log(response)
            return response.data
        })
        .catch(err=>{
            console.log(err.response)
        })

    }
    
    getAggregate = (payload)=>{
        
        return axios.get(url+'aggregate')
        .then(response=>{
            console.log(response)
            return response.data
        })
        .catch(err=>{
            console.log(err.response)
        })

    }

    // Laboratory
    createLab = (payload)=>{

        return axios.post(url+'createLab',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
            return response
            // $('.add_success').show()
            // setTimeout(()=>{
            //     // window.location.href = './Laboratory officer.html'
            // },1000)
        
        })
        .catch(err=>{
            console.log(err.response)            
        })

    }
    
    // triage
    createTriage = (payload)=>{

        axios.post(url+'createTriage',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
            $('.edit_success').show()
            $('#status_result').html(response.data.status)
            $('#myModal').modal()
            setTimeout(()=>{
                
                // window.location.href = './Field Worker.html'
            },1000)
        
        })
        .catch(err=>{
            console.log(err.response)            
        })

    }

    updateSymptoms = (payload)=>{
        
        axios.put(url+'updateSymptoms',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
        
            $('.edit_success').show()
            setTimeout(()=>{
                window.location.href="./followup.html"
            },1000)
        
            
        })
        .catch(err=>{
            console.log(err.response)            
        })
     
    }

    updateEpid = (payload)=>{
        
        axios.put(url+'updateEpid',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
        
            $('.edit_success').show()
            setTimeout(()=>{
                window.location.href="./State Epidemiologist.html"
            },1000)
        
            
        })
        .catch(err=>{
            console.log(err.response)            
        })
     
    }

    dead =  (payload)=>{
        axios.put(url+'dead',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
        
            $('.edit_success1').show()
            setTimeout(()=>{
                window.location.href="./followup.html"
            },1000)
        
            
        })
        .catch(err=>{
            console.log(err.response)            
        })
     
    }
    // Users
    createUser = ( payload )=>{

        axios.post(url+'user',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            if(response.data.message==="New user created!"){
                var x = document.getElementById("snackbar");
                x.className = "show";
                $('.alert-success').show()
                $('.alert-info').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()

                console.log($('#fname').val(""))
                console.log($('#lname').val(""))
                console.log($('#password').val(""))
                console.log($('#repass').val(""))
                console.log($('#email').val(""))
                console.log($('#institution').val(""))
                console.log($('#phone').val(""))
                setTimeout(()=>{
            
                    window.location.href="./login.html"
                },1500)
            }
        })
        .catch(err=>{
            if(err.response.data==="Error: Email Already Exists"){
                var x = document.getElementById("snackbar");
                x.className = "show";
                $('.alert-info').show()
                $('.alert-success').hide()
                $('.alert-warning').hide()
                $('.alert-danger').hide()
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);

                // alert('Error: Email Already Exists')
            }
            if(err.response.data==="Error: Passwords Mismatched"){
                var x = document.getElementById("snackbar");
                x.className = "show";
                $('.alert-info').hide()
                $('.alert-success').hide()
                $('.alert-warning').show()
                $('.alert-danger').hide()
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
                
                // alert('Error: Passwords Mismatched')
            }
            if(err.response.data==="Error: Form Fields Missing"){
                var x = document.getElementById("snackbar");
                x.className = "show";
                $('.alert-info').hide()
                $('.alert-success').hide()
                $('.alert-warning').hide()
                $('.alert-danger').show()
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);

                // alert('Error: Form Fields Missing')
            }
            
        })
    
    }

    getUsers = ()=>{

        return axios.get(url+'users')
        .then(response=>{
            console.log(response)
            return response.data
        })
        .catch(err=>{
            console.log(err.response)
        })

    }
    
    editUser = ( payload )=>{

        axios.put(url+'editUser',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
        
            $('.edit_success').show()
            setTimeout(()=>{
                window.location.reload()
            },1000)
        
            
        })
        .catch(err=>{
            console.log(err.response)            
        })
    
    } 

    checkEmail = (payload)=>{
        axios.post(url+'checkEmail',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
        
            $('#reset-pass').show()

            
            
        })
        .catch(err=>{
            console.log(err.response) 
            reset = reset+1
            var x = document.getElementById("snackbar");
            x.className = "show";
            $('.alert-info').show()
            $('.alert-success').hide()
            $('.alert-warning').hide()
            $('.alert-danger').hide()
            setTimeout(function(){ x.className = x.className.replace("show", "");  }, 1000);

            if(reset==2)
                setTimeout(function(){ window.location.href="./signup.html"  }, 1000);
        })
    }
    resetPassword = (payload)=>{
        axios.put(url+'resetPassword',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
        
            $('.edit_success').show()
            setTimeout(function(){ window.location.href="./login.html"  }, 1000);
        
            
        })
        .catch(err=>{
            console.log(err.response) 
            var x = document.getElementById("snackbar");
            x.className = "show";
            $('.alert-info').show()
            $('.alert-success').hide()
            $('.alert-warning').hide()
            $('.alert-danger').hide()
            setTimeout(function(){ x.className = x.className.replace("show", "");  }, 5000);
            setTimeout(function(){ window.location.href="./signup.html"  }, 1000);
        })
    
    }

    // Roles
    createRole = ( payload )=>{

        axios.post(url+'createRole',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
            $('.add_success').show()
            setTimeout(()=>{
                window.location.reload()
            },1000)
        
        })
        .catch(err=>{
            console.log(err.response)            
        })
    
    }

    editRole = ( payload )=>{

        axios.put(url+'editRole',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
        
            $('.edit_success').show()
            setTimeout(()=>{
                window.location.reload()
            },1000)
        
            
        })
        .catch(err=>{
            console.log(err.response)            
        })
    
    } 

    getRoles = ()=>{
     
        return axios.get(url+'roles')
        .then(response=>{
            return response.data
        })
        .catch(err=>{
            console.log(err.response)
        })

    }

    
    // Groups
    createGroup = ( payload )=>{

        axios.post(url+'createGroup',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
            $('.add_success').show()
            setTimeout(()=>{
                window.location.reload()
            },1000)
        
        })
        .catch(err=>{
            console.log(err.response)            
        })
    
    }

    editGroup = ( payload )=>{

        axios.put(url+'editGroup',payload,{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            console.log(response)
        
            $('.edit_success').show()
            setTimeout(()=>{
                window.location.reload()
            },1000)
        
            
        })
        .catch(err=>{
            console.log(err.response)            
        })
    
    } 
    
    getGroups = ()=>{
     
        return axios.get(url+'groups')
        .then(response=>{
            console.log(response)
            return response.data
        })
        .catch(err=>{
            console.log(err.response)
        })

    }
}
