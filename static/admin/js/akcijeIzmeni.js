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

                const lst = document.getElementById('selectAkcije');

                data.forEach( el => {
                    lst.innerHTML += `<option>ID:${el.id}|Amount: ${el.amount}|Type:${el.type}|Start Date: ${el.startDate}|
                    End Date: ${el.endDate}|Purpose: ${el.purpose}
                    </option>`;
               });
            
        });

    
        document.getElementById('choseAkcije').addEventListener('click', e => {
            e.preventDefault();
            console.log("CHOSE");
           
            let user =  document.getElementById('selectAkcije').value;

            console.log(user);

            const array = user.split('|');  
            const resenje = [];
            
            for(let i = 0; i < array.length; i++){
                let split = array[i].split(':');
                resenje[i] =  split[1];
            }
            console.log(resenje);

            let sD = resenje[3].split("T");
            let eD = resenje[4].split("T");

            
            document.getElementById('amount').value = resenje[1];
            document.getElementById('type').value = resenje[2];
            document.getElementById('startDate').value = sD[0];
            document.getElementById('endDate').value = eD[0];
            document.getElementById('purpose').value = resenje[5];
            
            document.getElementById('izmeniAkcije').disabled = false;
            
        });

        document.getElementById('izmeniAkcije').addEventListener('click', e => {
            e.preventDefault();
           
           
            let user =  document.getElementById('selectAkcije').value;
            const array = user.split('|');  
            const array2 = array[0].split(':');
            const idDelete = array2[1];
            
            
            const  data = {
            id: idDelete,
            amount:document.getElementById('amount').value,
            type:document.getElementById('type').value,
            startDate:document.getElementById('startDate').value,
            endDate:document.getElementById('endDate').value,
            purpose:document.getElementById('purpose').value
            }
           
            fetch('http://localhost:8080/akcije/updateAkcije', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
             })
           
            .then( res => res.json() )
            .then( data => {
                if(data == "True"){
                    window.location.reload();
                    alert("Uspesno ste izmenili akciju!");
                }
                else{
                    alert(data);
                }
            });
        });

}