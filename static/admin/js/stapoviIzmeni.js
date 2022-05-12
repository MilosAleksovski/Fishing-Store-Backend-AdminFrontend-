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


    fetch('http://localhost:8080/akcije/vratiAkcije', {
        
    })
        .then( res => res.json() )
        .then( data => {
            
            console.log(data);

                const lst = document.getElementById('saleSelect');


                data.forEach( el => {
                    lst.innerHTML += `<option>ID:${el.id}-Amount: ${el.amount}-Type:${el.type}- Purpose: ${el.purpose}
                    </option>`;
               });
            
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

    
        document.getElementById('choseRod').addEventListener('click', e => {
            e.preventDefault();
            console.log("CHOSE");
           
            let user =  document.getElementById('selectRod').value;
            const array = user.split('-');  
            const resenje = [];
            
            for(let i = 0; i < array.length; i++){
                let split = array[i].split(':');
                resenje[i] =  split[1];
            }
            
            document.getElementById('brand').value = resenje[1];
            document.getElementById('model').value = resenje[2];
            document.getElementById('type').value = resenje[3];
            document.getElementById('weight').value = resenje[4];
            document.getElementById('price').value = resenje[5];
            document.getElementById('izmeniStap').disabled = false;
            
        });

        document.getElementById('izmeniStap').addEventListener('click', e => {
            e.preventDefault();
           
           
            let user =  document.getElementById('selectRod').value;
            const array = user.split('-');  
            const array2 = array[0].split(':');
            const idDelete = array2[1];
            
            
            const  data = {
            salesId: idDelete,
            brand:document.getElementById('brand').value,
            model:document.getElementById('model').value,
            type:document.getElementById('type').value,
            weight:document.getElementById('weight').value,
            price:document.getElementById('price').value
            }
           
            fetch('http://localhost:8080/stapovi/updateStapa', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
             })
           
            .then( res => res.json() )
            .then( data => {
                if(data == "True"){
                    window.location.reload();
                    alert("Uspesno ste izmenili stap!");
                }
                else{
                    alert(data);
                }
            });
        });

}