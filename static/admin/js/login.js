
function init() {

        console.log(document.cookie);

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();
      
        

        const data = {
            name: document.getElementById('login').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then( res => res.json() )
        .then( el => {
            if (el.msg) {
                alert(el.msg);
            } else {
                
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.replace('http://localhost:8000/admin/mainpanel');
            }
        });
    });
    
}