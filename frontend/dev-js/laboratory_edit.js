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
    }

    
})
