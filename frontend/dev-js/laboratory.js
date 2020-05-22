$(document).ready(()=>{

    console.log('state epid')

    let api = new API()

    let triage = new Array()
    api.getTriage()
    .then(response=>{
        console.log(response)
        response.data.triage.forEach(element => {
            triage.push(element)
            let htmlStr = ''
            htmlStr += '<tr id='+element.id+'>'
            htmlStr += '<td>'+element.fname+' '+element.lname+'</td>'
            htmlStr += '<td>'+element.id_number+'</td>'
            htmlStr += '<td>'+element.reg_date+'</td>'
            htmlStr += '<td><a class="btn btn-primary" href="./laboratory_info.html?id='+element.id+'" >Update</a></td>'
            htmlStr += '</tr>'
            $('#render-table').append(htmlStr)            
        });
        $('#example').DataTable({
            "lengthMenu": [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "All"]]
        });
        $('#loader_card').fadeOut()
        $('#card_content').fadeIn()
        
        console.log(triage)
    })
    .catch(err=>{
    })



    
})
