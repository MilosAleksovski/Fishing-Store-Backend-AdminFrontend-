function init() {
    
    if(document.cookie == null || document.cookie == "token=" || document.cookie == ""){
        window.location.replace('http://localhost:8000/admin/login');
    }


    
    document.getElementById('logOut').addEventListener('click', e => {
        console.log("POGODIO LOGOut")
       
        document.cookie = `token=;SameSite=Lax`;
        window.location.replace('http://localhost:8000/admin/login');

    });


   
    fetch('http://localhost:8080/blogovi/vratiBlogove', {
        
    })
        .then( res => res.json() )
        .then( data => {
            

                console.log(data);

                const lst = document.getElementById('deleteBlogSelect');


                data.forEach( el => {
                    lst.innerHTML += `<option>Id: ${el.id}-Topic: ${el.topic}-Title:${el.title}-Body: ${el.body}-
                    Conclusion: ${el.conclusion}- Author Contact: ${el.authorContact}
                    </option>`;
               });
            
        });
   

        document.getElementById('deleteBlogButton').addEventListener('click', e => {
            e.preventDefault();
            
           
            let user =  document.getElementById('deleteBlogSelect').value;
            const niz = user.split('-');  
            const niz2 = niz[0].split(':');
            
            
            
            const id = niz2[1];
            
            const data = {
                id: id
            };
            
            console.log(data);

            fetch('http://localhost:8080/blogovi/obrisiBlog', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
             })
            .then( res => res.json() )
            .then( data => {
                
            
                if(data == "True"){
                    alert("Uspesno ste obrisali blog iz baze!");
                    window.location.reload();
                }
                else{
                    alert(data);
                }
                
                
            });
        });


}