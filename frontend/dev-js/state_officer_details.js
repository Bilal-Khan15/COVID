$(document).ready(()=>{

    console.log('state officer details')    
    let api = new API()

    const id = localStorage.getItem('id')
    const case_id = localStorage.getItem('case')
    
    console.log(id,case_id)
    if(id==="case"){
        let response = api.getCaseByID({id: case_id}).then(resolve=>{
            console.log(resolve.triage[0])
            setDetails(resolve.triage[0])
        })
    }
    else if(id==="form"){
        let response = api.getCaseByID({id: case_id}).then(resolve=>{
            console.log(resolve.triage[0])
            setDetails1(resolve.triage[0])
        })
    }
    else{
        let response = api.getAggregate().then(resolve=>{
            console.log(resolve)
            setDetails2(resolve)
        })
    }

    const setDetails = (data)=>{
        $('.card-title').html('CASE DETAILS')
        
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

    }
    
    const setDetails1 = (data)=>{
        $('.card-title').html('FORM DETAILS')
        
        console.log(data)
        let htmlStr = ''
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Name</th>'
        htmlStr+='<td>'+data.fname+' '+data.lname+'</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Epid No.</th>'
        htmlStr+='<td>'+data.id_number+'</td>'
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
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Gender</th>'
        htmlStr+='<td>'+data.sex+'</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        let date1 = new Date(data.reg_date)
        let date2 = new Date()

        let str1 = date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate()
        let str2 = date2.getFullYear()+'-'+(date2.getMonth()+1)+'-'+date2.getDate()
        var startDate = Date.parse(str1);
        var endDate = Date.parse(str2);
        var timeDiff = endDate - startDate;
        daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        htmlStr+='<th class="th-sm">Followup</th>'
        htmlStr+='<td>'+data.status+'</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">No. of admiss.</th>'
        htmlStr+='<td>'+daysDiff+' days</td>'
        htmlStr+='</tr>'
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Comobidity</th>'
        htmlStr+='<td>N/A</td>'
        htmlStr+='</tr>'

        $('#render-info').append(htmlStr)

    }

    
    const setDetails2 = (data)=>{
        console.log(data)
        $('.card-title').html('Aggregate')
        let htmlStr = ''
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Total Registered</th>'
        htmlStr+='<td>'+data.reg+'</td>'
        htmlStr+='</tr>'

        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Total Sent to Lab</th>'
        htmlStr+='<td>'+data.lab+'</td>'
        htmlStr+='</tr>'

        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Total Suspected Case</th>'
        htmlStr+='<td>'+data.suspected+'</td>'
        htmlStr+='</tr>'

        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Total Probable Case</th>'
        htmlStr+='<td>'+data.probable+'</td>'
        htmlStr+='</tr>'

        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Total Confirmed Case</th>'
        htmlStr+='<td>'+data.confirmed+'</td>'
        htmlStr+='</tr>'
        
        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Total Deaths</th>'
        htmlStr+='<td>'+data.death+'</td>'
        htmlStr+='</tr>'

        htmlStr+='<tr>'
        htmlStr+='<th class="th-sm">Number Due for testing</th>'
        htmlStr+='<td>'+data.due+'</td>'
        htmlStr+='</tr>'
        
        $('#render-info').append(htmlStr)

    }
})
