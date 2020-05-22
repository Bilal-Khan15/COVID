$(document).ready(()=>{

    console.log('groups')

    let api = new API()


    let roles = new Array()
    let response = api.getGroups().then(resolve=>{
        resolve.Group.forEach(element => {
            roles.push(element)
            let htmlStr = ''
            htmlStr+='<tr>'
            htmlStr+='<td>'+element.name+'</td>'
            htmlStr+='<td>'+element.role+'</td>'
            htmlStr+='<td><button class="btn btn-primary edit_role" id='+element.id+'>Edit Group</button></td>'
            htmlStr+='</tr>'
            $('#render-table').append(htmlStr)      
        });
        $('#example').DataTable({
            "lengthMenu": [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "All"]]
        });

    })

    $(document).on('click','.edit_role',function(){

        let backup = roles
        backup = backup.filter(val=>{
            return val.id == $(this).attr('id')
        }) 
        $('#names').val(backup[0].name)
        $('#roles').val(backup[0].role)
        $('#myModal1').modal()
    })

    
    $('#add-role').submit((e)=>{
        
        e.preventDefault()
        console.log($('#name').val())
        console.log($('#role').val())
        let packet = {
            "name": $('#name').val(), 
            "role": $('#role').val(),
            
        }
        api.createGroup(packet)
        
    })

    $('#edit-role').submit((e)=>{
        
        e.preventDefault()
        console.log($('#names').val())
        console.log($('#roles').val())
        let packet = {
            "name": $('#names').val(), 
            "role": $('#roles').val(),
            
        }
        api.editGroup(packet)
        
    })
    

})
