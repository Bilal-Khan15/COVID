$(document).ready(()=>{

    
    let api = new API()

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

        if(data.hospital !==''){
            $('#'+data.hospital).attr('checked',true)
        }
        if(data.dead)
            $('#dead').attr('checked',true)
        
        $('#outcome').val(data.outcome)
    }

    
})
