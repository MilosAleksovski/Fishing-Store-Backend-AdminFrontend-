function init() {
    
    if(document.cookie == null || document.cookie == "token=" || document.cookie == ""){
        window.location.replace('http://localhost:8000/admin/login');
    }


    
    document.getElementById('logOut').addEventListener('click', e => {
        console.log("POGODIO LOGOut")
       
        document.cookie = `token=;SameSite=Lax`;
        window.location.replace('http://localhost:8000/admin/login');

    });


   
    fetch('http://localhost:8080/akcije/vratiAkcije', {
        
    })
        .then( res => res.json() )
        .then( data => {
            

                console.log(data);

                const lst = document.getElementById('selectAkcije');


                data.forEach( el => {
                    lst.innerHTML += `<option>ID:${el.id}-Amount: ${el.amount}-Type:${el.type}-Start Date: ${el.startDate}-
                    End Date: ${el.endDate}- Purpose: ${el.purpose}
                    </option>`;
               });
            
        });
   

        document.getElementById('deleteAkcijeButton').addEventListener('click', e => {
            e.preventDefault();
            
           
            let user =  document.getElementById('selectAkcije').value;
            const niz = user.split('-');  
            const niz2 = niz[0].split(':');
            
            
            
            const id = niz2[1];
            
            const data = {
                id: id
            };
            
            console.log(data);

            fetch('http://localhost:8080/akcije/obrisiAkciju', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
             })
            .then( res => res.json() )
            .then( data => {
                
            
                if(data == "True"){
                    alert("Uspesno ste obrisali akciju iz baze!");
                    window.location.reload();
                }
                else{
                    alert(data);
                }
                
                
            });
        });


}