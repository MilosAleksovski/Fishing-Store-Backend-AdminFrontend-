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



    fetch('http://localhost:8080/blogovi/vratiBlogove', {
        
    })
        .then( res => res.json() )
        .then( data => {
            
            
                console.log(data);

                const lst = document.getElementById('listBlog');


                 data.forEach( el => {
                     lst.innerHTML += `<li>Topic: ${el.topic}-Title:${el.title}-Body: ${el.body}-
                     Conclusion: ${el.conclusion}- Author Contact: ${el.authorContact}
                     </li>`;
                });
            
            
        });
   


}