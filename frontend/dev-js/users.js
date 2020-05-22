$(document).ready(()=>{

    console.log('users')

    let api = new API()

    let response = api.getRoles().then(resolve=>{
        resolve.Role.forEach(element => {
            $('#institution').append('<option style="color: black;">'+element.role+'</option>')
        });

    })

    let users = new Array()
    api.getUsers().then(resolve=>{
        console.log(resolve)
        resolve.Users.forEach(element => {
            users.push(element)
            let htmlStr = ''
            htmlStr += '<tr id='+element.id+'>'
            htmlStr += '<td>'+element.user_name+'</td>'
            htmlStr += '<td>'+element.email+'</td>'
            htmlStr += '<td>'+element.mobile+'</td>'
            htmlStr += '<td>'+element.institution+'</td>'
            htmlStr += '<td><button class="btn btn-primary edit-user" id='+element.id+' >Add User To Group</button></td>'
            htmlStr += '</tr>'
            $('#render-table').append(htmlStr)            
        });
        $('#example').DataTable({
            "lengthMenu": [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "All"]]
        });
        $('#loader_card').fadeOut()
        $('#card_content').fadeIn()
    })

    let email =''
    $(document).on('click','.edit-user',function(){

        let backup = users
        backup = backup.filter(val=>{
            return val.id == $(this).attr('id')
        })
        console.log(backup)
        $('#enable').attr('checked',backup[0].enable)
        email = backup[0].email
        let htmlStr = ''
        htmlStr += 'Username : '+backup[0].user_name+'<br>'
        htmlStr += 'First Name : '+backup[0].fname+'<br>'
        htmlStr += 'Last Name : '+backup[0].lname+'<br>'
        htmlStr += 'Email : '+backup[0].email+'<br>'
        htmlStr += 'Mobile : '+backup[0].mobile+''
        $('.content-user').html(htmlStr)
        $('#myModal').modal()

    })

    let enable = false
    $(document).on('change','#enable',function(){
        if(enable)
            enable=true
        else
            enable=false
    })
    $(document).on('click','.save',function(){
        let role = $('#institution').val()
        console.log(enable,role)
        if(role!=='Select Institution'){
            let packet = {
                email : email,
                enable: enable,
                institution: role,
            }
            api.editUser(packet)
        }
        else{
            alert()
        }
    })
})
