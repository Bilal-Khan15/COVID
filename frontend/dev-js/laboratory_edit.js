$(document).ready(()=>{

    
    let api = new API()
    let email = ''
    let hf=false, types='', condition='', collection_date='',lab_date='',epid='',test='',viral='',diagnosis='',fever=false,cough=false,breath=false,travel=false,contact_case=false

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

        fever = data.fever
        cough = data.cough
        breath = data.breath
        travel = data.travel
        contact_case = data.contact_case
        hf = data.hf
        
    }

    
    $('#create').submit(function(e){
        e.preventDefault()
        let packet = {
            "email": email,
            "types": $("#types").val(),
            "condition": $("#condition").val(),
            "collection_date": $("#collection_date").val(),
            "lab_date": $("#lab_date").val(),
            "test": $("#test").val(),
            "viral": $("#viral").val(),
            "diagnosis": $("#diagnosis").val(),

            "epid": $("#epid").val(),
            "fever": fever,
            "cough": cough,
            "breath": breath,
            "travel": travel,
            "contact_case": contact_case,
            "hf": hf
        }
        console.log(packet)
        let res = api.createLab(packet).then(resolve=>{
            console.log(resolve)
            if(resolve.data.message == "New Lab registered!"){
                $('#status_result').html(resolve.data.status)
                $('#myModal').modal()
            }

        })
    })

})
