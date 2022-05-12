

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


   
    fetch('http://localhost:8080/korisnici/vratiKorisnike', {
        
    })
        .then( res => res.json() )
        .then( data => {
            
            console.log(data);

                const lst = document.getElementById('choseUser');


                 data.forEach( el => {
                     lst.innerHTML += 
                     
                     `<option >ID:${el.id}-First Name: ${el.firstName}-Last Name: ${el.lastName}
                     -Username:${el.username}-<b>Email: ${el.email}-
                     Role: ${el.role}</option>`;
                     
                     
                });
            
        });

    
        document.getElementById('chose').addEventListener('click', e => {
            e.preventDefault();
            console.log("CHOSE");
           
            let user =  document.getElementById('choseUser').value;
            const array = user.split('-');  
            const resenje = [];
            
            for(let i = 0; i < array.length; i++){
                let split = array[i].split(':');
                resenje[i] =  split[1];
            }
            
            document.getElementById('firstName').value = resenje[1];
            document.getElementById('lastName').value = resenje[2];
            document.getElementById('email').value = resenje[4];
            document.getElementById('username').value = resenje[3];
            document.getElementById('izmeniKorisnika').disabled = false;
            
        });

        document.getElementById('izmeniKorisnika').addEventListener('click', e => {
            e.preventDefault();
           
           
            let user =  document.getElementById('choseUser').value;
            const array = user.split('-');  
            const array2 = array[0].split(':');
            const idDelete = array2[1];
            
            
            const  data = {
            id: idDelete,
            firstName:document.getElementById('firstName').value,
            lastName:document.getElementById('lastName').value,
            email:document.getElementById('email').value.replace(/\s/g, ''),
            username:document.getElementById('username').value,
            role:document.getElementById('roleSelect').value
            }
           
            fetch('http://localhost:8080/korisnici/updateKorisnika', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
             })
           
            .then( res => res.json() )
            .then( data => {
                if(data == "True"){
                    window.location.reload();
                    alert("Uspesno ste izmenili korisnika!");
                }
                else{
                    alert(data);
                }
            });
        });

}