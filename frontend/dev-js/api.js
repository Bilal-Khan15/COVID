let url = "http://127.0.0.1:5000/"
class API{

    login = ( payload )=>{
        
        axios.post(url+'login', payload,{
            headers:{
                "Content-Type" : "application/json",
            },
        })
        .then(response=>{
            console.log(response)
            $('.alert-success').show()
            $('.alert-info').hide()
            $('.alert-warning').hide()
            $('.alert-danger').hide()
            
            if(response.data.user === "State Epidemiologist"){
                setTimeout(()=>{    
                    window.location.href = "./state_epid_landing.html"
                },1500)
    
            }
            else if(response.data.user === "State Officer"){
                setTimeout(()=>{    
                    window.location.href = "./state_officer_landing.html"
                },1500)
    
            }
            else if(response.data.user === "Field worker"){
                setTimeout(()=>{    
                    window.location.href = "./field_work_landing.html"
                },1500)
    
            }
            else if(response.data.user === "Laboratory officer"){
                setTimeout(()=>{    
                    window.location.href = "./laboratory_landing.html"
                },1500)
    
            }
            else if(response.data.user === "Admin"){
                setTimeout(()=>{    
                    window.location.href = "./field_work_landing.html"
                },1500)
    
            }
        

        })
        .catch(err=>{
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
            
            if(err.response.data==="Invalid Credentials"){
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
