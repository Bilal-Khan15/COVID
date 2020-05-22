$(document).ready(()=>{

    console.log('epid info')    
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
        let htmlStr = ''
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Name</th>'
        htmlStr+='<td>'+data.fname+' '+data.lname+'</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Sex</th>'
        htmlStr+='<td>'+data.sex+'</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Age</th>'
        htmlStr+='<td>'+data.dob+'</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Mobile</th>'
        htmlStr+='<td>'+data.mobile+'</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Email</th>'
        htmlStr+='<td>'+data.email+'</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Address</th>'
        htmlStr+='<td>'+data.address+'</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Reg. date</th>'
        htmlStr+='<td>'+data.reg_date+'</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Current Status</th>'
        htmlStr+='<td>'+data.current_status+'</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Symptoms</th>'
        let str = ''
        if(data.breath)
            str += 'Difficulty Breathing, '
        if(data.cough)
            str += 'Cough, '
        if(data.fever)
            str += 'Fever, '
        if(data.throat)
            str += 'Soar Throat, '
        
        str+= data.other
    
        htmlStr+='<td>'+str+'</td>'
        htmlStr+='</tr>'

        $('#render-info').append(htmlStr)

        $('.addbutton').append('<a class="btn btn-primary" href="./state_epid_update.html?id='+data.id+'" >Update</a>')
    }
})
