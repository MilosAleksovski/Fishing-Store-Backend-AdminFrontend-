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
            


                const lst = document.getElementById('saleSelect');


                 data.forEach( el => {
                     lst.innerHTML += 
                     
                     `<option ><b>ID:${el.id}-<b>Amount:</b> ${el.amount}-<b>Type:</b> ${el.type}-<b>Purpose:</b> ${el.purpose}</option>`;
                     
                     
                });
            
        });
        


    document.getElementById('addRod').addEventListener('click', e => {
        e.preventDefault();
        let user = document.getElementById('saleSelect').value;

        const array = user.split('-');  
        const resenje = array[0].split(":");

        console.log(resenje[1]);

        const data = {
            salesId: parseInt(resenje[1]),
            brand: document.getElementById('brand').value,
            model: document.getElementById('model').value,
            type: document.getElementById('type').value,
            weight: document.getElementById('weight').value,
            price: document.getElementById('price').value
            
        };
        
        fetch('http://localhost:8080/stapovi/dodajStap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then( res => res.json() )
        .then( data => {
            if(data == "True"){
                alert("Uspesno ste dodali stap!");
                window.location.reload();
            }
            else{
                alert(data);
            }
        });
       

    });
}