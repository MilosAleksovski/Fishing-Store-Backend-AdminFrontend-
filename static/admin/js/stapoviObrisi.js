function init() {
    
    if(document.cookie == null || document.cookie == "token=" || document.cookie == ""){
        window.location.replace('http://localhost:8000/admin/login');
    }


    
    document.getElementById('logOut').addEventListener('click', e => {
        console.log("POGODIO LOGOut")
       
        document.cookie = `token=;SameSite=Lax`;
        window.location.replace('http://localhost:8000/admin/login');

    });


   
    fetch('http://localhost:8080/stapovi/vratiStapove', {
        
    })
        .then( res => res.json() )
        .then( data => {
            

                console.log(data);

                const lst = document.getElementById('selectRod');


                data.forEach( el => {
                    lst.innerHTML += `<option>ID: ${el.id}-Brand: ${el.brand}- Model: ${el.model}-
                    Type: ${el.type}- Weight: ${el.weight}- Price: ${el.price}
                    
                    </option>`;
               });
            
        });
   

        document.getElementById('deleteRodButton').addEventListener('click', e => {
            e.preventDefault();
            
           
            let user =  document.getElementById('selectRod').value;
            const niz = user.split('-');  
            const niz2 = niz[0].split(':');
            
            
            
            const idD = niz2[1];
            
            console.log(idD);

            const data = {
                id: idD
            };
            
            console.log(data);

            fetch('http://localhost:8080/stapovi/obrisiStap', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
             })
            .then( res => res.json() )
            .then( data => {
                
            
                if(data == "True"){
                    alert("Uspesno ste obrisali stap iz baze!");
                    window.location.reload();
                }
                else{
                    alert(data);
                }
                
                
            });
        });


}