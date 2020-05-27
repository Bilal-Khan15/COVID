$(document).ready(()=>{

    
    let api = new API()

    let fever=false,cough=false,throat=false,dead=false,breath=false,sex='',nig=false,contact_case=false,hf=false,travel=false,dk=false;

    $("input[type='checkbox']").change(function(){
        let val = $(this).val()
        if(val==="throat"){
            if(!throat){
                throat = true
            }
            else{
                throat= false
            }
        }
        else if(val==="cough"){
            if(!cough){
                cough = true
            }
            else{
                cough= false
            }
        }
        else if(val==="fever"){
            if(!fever){
                fever = true
            }
            else{
                fever= false
            }
        }   
        else if(val==="breath"){
            if(!breath){
                breath = true
            }
            else{
                breath= false
            }
        }           
        else if(val==="contact_case"){
            if(!contact_case){
                contact_case = true
            }
            else{
                contact_case= false
            }
        }    
        else if(val==="travel"){
            if(!travel){
                travel = true
            }
            else{
                travel= false
            }
        }        
        else if(val==="hf"){
            if(!hf){
                hf = true
            }
            else{
                hf= false
            }
        }
        else if(val==="dead"){
            if(!dead){
                dead = true
                console.log(dead)
            }
            else{
                dead= false
                console.log(dead)
            }
        }
        else if(val==="dk"){
            if(!dk){
                dk = true
                console.log(dk)
                $('#dob').attr('disabled',dk)
            }
            else{
                dk= false
                console.log(dk)
                $('#dob').attr('disabled',dk)
            }
        }
    })
    

    $("input[type='radio']").change(function(){
        if($(this).attr('id')=='gender'){
            sex = $(this).val()
            console.log(sex)    
        }
        else{
            nig = $(this).val()
            console.log(nig)    
    
        }        
    })

    $(document).on('click','.update_case',function(){
        email  = localStorage.getItem('email')
        let packet = {
            "fname": $('#fname').val(),
            "lname": $("#lname").val(),
            "sex": sex,
            "dob": !dk ? $("#dob").val() : "N/A",
            "mobile": $("#mobile").val(),
            "email": $("#email").val(),
            "address": $("#address").val(),
            "id": $('#epid_id').val(),
            "nig": nig,
            "fever": fever,
            "cough": cough,
            "breath": breath,
            "other": $('#other_val').val(),
            "travel": travel,
            "contact_case": contact_case,
            "hf": hf
        }
        let htmlStr =''
        htmlStr +=  '<p class="title">First Name : '+packet.fname+'<br>Last Name : '+packet.lname+
            '<br>Sex : '+packet.sex+'<br>DOB : '+packet.dob+'<br>Email : '+packet.email
        $('#care-content').html(htmlStr)
        console.log(packet)
        api.createTriage(packet)
    })
    $('.save').click(function(e){
        let packet={email:$("#email").val(), dead: dead}
        console.log(packet)
        api.dead(packet)
    })
    $('.ssclose').click(function(e){
        window.location.href="./followup.html"

    })
    
})
