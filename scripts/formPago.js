let form = document.getElementById('formularioPago')




console.log(form)

form.addEventListener('submit', function AlmacenarLocalStorage() {
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let numeroTarjeta = document.getElementById('numeroTarjeta').value;
    let fVenc = document.getElementById('fVenc').value;
    let cvv = document.getElementById('CVV').value;

    let infoPago = [{
            "Nombre": nombre
        },
        {
            "Email": email
        },
        {
            "Numero de tarjeta": numeroTarjeta
        },
        {
            "Fecha de Vencimiento": fVenc
        },
        {
            "CVV": cvv
        }
    ]

    localStorage.setItem('Informacion de pago', JSON.stringify(infoPago))
    // localStorage.setItem('Nombre', nombre);
    // localStorage.setItem('Email', email);
    // localStorage.setItem('Numero de tarjeta', numeroTarjeta);
    // localStorage.setItem('Fecha de Vencimiento', fVenc);
    // localStorage.setItem('CVV', cvv);






    // console.log(nombre)
    // console.log(password)
})