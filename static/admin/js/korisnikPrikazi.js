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

                    const lst = document.getElementById('listUser');


                     data.forEach( el => {
                         lst.innerHTML += `<li>ID: ${el.id},First Name: ${el.firstName}, Last Name: ${el.lastName}
                         Username: ${el.username}, Password: ${el.password}, E-mail: ${el.email}
                         Role: ${el.role}, <b>Updated At: ${el.updatedAt}, Crated At: ${el.createdAt}
                         
                         
                         </li>`;
                    });
                
                
            });
       

   
}