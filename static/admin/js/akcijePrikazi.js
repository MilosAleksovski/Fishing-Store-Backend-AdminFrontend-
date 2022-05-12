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

                const lst = document.getElementById('listAkcija');


                 data.forEach( el => {
                     lst.innerHTML += `<li>Amount: ${el.amount}-Type:${el.type}-Start Date: ${el.startDate}-
                     End Date: ${el.endDate}- Purpose: ${el.purpose}
                     </li>`;
                });
            
            
        });
   


}