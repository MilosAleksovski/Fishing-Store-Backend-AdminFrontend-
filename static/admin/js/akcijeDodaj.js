function init() {

    if(document.cookie == null || document.cookie == "token=" || document.cookie == ""){
        window.location.replace('http://localhost:8000/admin/login');
    }




    document.getElementById('logOut').addEventListener('click', e => {
   
        e.preventDefault();
        document.cookie = `token=;SameSite=Lax`;
        window.location.replace('http://localhost:8000/admin/login');

    });



    document.getElementById('dodajAkciju').addEventListener('click', e => {
        e.preventDefault();
       

        const data = {
            amount: document.getElementById('amount').value,
            type: document.getElementById('type').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            purpose:document.getElementById('purpose').value,
            
        };
        
        fetch('http://localhost:8080/akcije/dodajAkciju', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then( res => res.json() )
        .then( data => {
            if(data == "True"){
                alert("Uspesno ste dodali akciju!");
                window.location.reload();
            }
            else{
                alert(data);
            }
        });
       

    });
}