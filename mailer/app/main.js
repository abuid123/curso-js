window.onload = ()=>{
    const mailerForm = document.getElementById('mailer-form');
    mailerForm.onsubmit = async (e)=>{
        e.preventDefault();
        const error = document.getElementById('error').innerHTML = ''
        const data = Object.fromEntries(new FormData(e.target));
        const response = await fetch('/send',{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json',
            }
        })
        const responseText = await response.text();
        if(response.status > 300){
            document.getElementById('error').innerHTML = responseText
            return
        }

        mailerForm.reset()
        alert('Correo enviado con exito')
    }
}