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



    fetch('http://localhost:8080/stapovi/vratiStapove', {
        
    })
        .then( res => res.json() )
        .then( data => {
            
            
                console.log(data);

                const lst = document.getElementById('listRods');


                 data.forEach( el => {
                     lst.innerHTML += `<li>ID: ${el.id},Brand: ${el.brand}, Model: ${el.model}
                     Type: ${el.type}, Weight: ${el.weight}, Price: ${el.price}
                     
                     </li>`;
                });
            
            
        });
   


}