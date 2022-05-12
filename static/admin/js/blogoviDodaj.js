function init() {

    if(document.cookie == null || document.cookie == "token=" || document.cookie == ""){
        window.location.replace('http://localhost:8000/admin/login');
    }




    document.getElementById('logOut').addEventListener('click', e => {
   
        e.preventDefault();
        document.cookie = `token=;SameSite=Lax`;
        window.location.replace('http://localhost:8000/admin/login');

    });





    fetch('http://localhost:8080/korisnici/vratiKorisnike', {
        
    })
        .then( res => res.json() )
        .then( data => {
            


                const lst = document.getElementById('authorSelect');


                 data.forEach( el => {
                     lst.innerHTML += 
                     
                     `<option ><b>ID:${el.id}-<b>First Name:</b> ${el.firstName}-<b>Last Name:</b> ${el.lastName}</option>`;
                     
                     
                });
            
        });
        


    document.getElementById('dodajBlog').addEventListener('click', e => {
        e.preventDefault();
        let user = document.getElementById('authorSelect').value;

        const array = user.split('-');  
        const resenje = array[0].split(":");

        console.log(resenje[1]);

        const data = {
            userId: parseInt(resenje[1]),
            topic: document.getElementById('tema').value,
            title: document.getElementById('naslov').value,
            body: document.getElementById('sadrzaj').value,
            conclusion: document.getElementById('zakljucak').value,
            authorContact:document.getElementById('contact').value,
            
        };
        
        fetch('http://localhost:8080/blogovi/dodajBlog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then( res => res.json() )
        .then( data => {
            if(data == "True"){
                alert("Uspesno ste dodali blog!");
                window.location.reload();
            }
            else{
                alert(data);
            }
        });
       

    });
}