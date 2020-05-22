$(document).ready(()=>{

    
    let api = new API()

    let fever=false,cough=false,throat=false,dead=false,breath=false,hospital=false;
    let email = '';
    function getParameter(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
           return null;
        }
        return decodeURI(results[1]) || 0;
    }
    const id = getParameter('id')
    
    let triage = new Array()
    api.getTriage()
    .then(response=>{
        response.data.triage.forEach(element => {
            triage.push(element)
        });
        let backup = triage
        let result = backup.filter(val=>{
            return val.id == id
        })
        setDetails(result[0])
    })
    .catch(err=>{
    })    
    const setDetails = (data)=>{
        console.log(data)
        $('#case-status').html(data.current_status)
        
        breath = data.breath
        cough = data.cough
        fever = data.fever
        throat = data.throat
        hospital = data.hospital
        dead = data.dead
        email = data.email
        if(data.breath)
            $('#breath').attr('checked',true)
        if(data.cough)
            $('#cough').attr('checked',true)
        if(data.fever)
            $('#fever').attr('checked',true)
        if(data.throat)
            $('#throat').attr('checked',true)
        
        if(data.other!==''){
            $('#other').attr('checked',true)
            $('#other_val').val(data.other)
        }

        
        if(data.dead)
            $('#dead').attr('checked',true)
        
        $('#outcome').val(data.outcome)
    }

    $("input[type='checkbox']").click(function(){
        let val = $(this).val()
        console.log(val)
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
        else if(!val==="dead"){
            if(breath){
                dead = true
            }
            else{
                dead= false
            }
        }
    })
    $("input[type='radio']").change(function(){
        hospital = $(this).val()
        console.log(hospital)
    })
    $(document).on('click','.update_case',function(){
        let packet = {
            "email": email,
            "fever": fever,
            "throat": throat,
            "cough": cough,
            "breath": breath,
            "other": $('#other_val').val(),
            "hospital": hospital,
            "outcome": $('#outcome').val(),
            "dead": dead
        }
        console.log(packet)
        api.updateSymptoms(packet)
    })

    
})
