$(document).ready(()=>{

    
    let api = new API()
    let email = ''
    let discharge = false, evacuate=false, epid='',center='';

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
        email = data.email
        $('#case-status').html(data.current_status)
        if(data.evacuate)
            $('#evacuate').attr('checked',true)
        if(data.discharge)
            $('#discharge').attr('checked',true)
        
    
        epid = data.epid
        center = data.center
        discharge = data.discharge
        evacuate = data.evacuate
        $('#epid').val(data.epid)
        $('#test-center').val(data.center)

    }

    $("input[type='checkbox']").change(function(){
        let val = $(this).val()
        console.log(val)
        if(val==="evacuate"){
            if(evacuate){
                evacuate = true
            }
            else{
                evacuate = false
            }
        }
        else if(val==="discharge"){
            if(discharge){
                discharge = true
            }
            else{
                discharge = false
            }
        }
    })
    $(document).on('click','.update_case',function(){

        let packet = {
            "email": email,
            "evacuate": evacuate,
            "discharge": discharge,
            "epid": "epid",
            "center": "center"
        }
        console.log(packet)
        api.updateEpid(packet)
    })
    
})
