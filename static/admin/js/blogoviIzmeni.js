
function init() {
    
    if(document.cookie == null || document.cookie == "token=" || document.cookie == ""){
        window.location.replace('http://localhost:8000/admin/login');
    }


    document.getElementById('logOut').addEventListener('click', e => {
        console.log("POGODIO LOGOut")
        e.preventDefault();
        document.cookie = `token=;SameSite=Lax`;
        window.location.replace('http://localhost:8000/admin/login');

    });


   
    fetch('http://localhost:8080/blogovi/vratiBlogove', {
        
    })
        .then( res => res.json() )
        .then( data => {
            
            console.log(data);

                const lst = document.getElementById('selectBlog');


                data.forEach( el => {
                    lst.innerHTML += `<option>ID: ${el.id}-Topic: ${el.topic}-Title:${el.title}-Body: ${el.body}-
                    Conclusion: ${el.conclusion}- Author Contact: ${el.authorContact}
                    </option>`;
               });
            
        });

    
        document.getElementById('choseBlog').addEventListener('click', e => {
            e.preventDefault();
            console.log("CHOSE");
           
            let user =  document.getElementById('selectBlog').value;
            const array = user.split('-');  
            const resenje = [];
            
            for(let i = 0; i < array.length; i++){
                let split = array[i].split(':');
                resenje[i] =  split[1];
            }
            
            document.getElementById('topic').value = resenje[1];
            document.getElementById('title').value = resenje[2];
            document.getElementById('body').value = resenje[3];
            document.getElementById('conclusion').value = resenje[4];
            document.getElementById('authContact').value = resenje[5];
            
            document.getElementById('izmeniBlog').disabled = false;
            
        });

        document.getElementById('izmeniBlog').addEventListener('click', e => {
            e.preventDefault();
           
           
            let user =  document.getElementById('selectBlog').value;
            const array = user.split('-');  
            const array2 = array[0].split(':');
            const idDelete = array2[1];
            
            
            const  data = {
            userId: idDelete,
            topic:document.getElementById('topic').value,
            title:document.getElementById('title').value,
            body:document.getElementById('body').value,
            conclusion:document.getElementById('conclusion').value,
            authorContact:document.getElementById('authContact').value
            }
           
            fetch('http://localhost:8080/blogovi/updateBloga', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
             })
           
            .then( res => res.json() )
            .then( data => {
                if(data == "True"){
                    window.location.reload();
                    alert("Uspesno ste izmenili blog!");
                }
                else{
                    alert(data);
                }
            });
        });

}