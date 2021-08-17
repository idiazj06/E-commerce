const items = document.getElementById('items')
const fragment = document.createDocumentFragment();
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const footer = document.getElementById('footer')
var carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
    
    pintarLista()

})


items.addEventListener('click', e => {    
    // addAcciones(e)
    btnAccion(e)
})


const pintarLista = () => {

    console.log(carrito)
    items.innerHTML = ''
    
    Object.values(carrito).forEach(producto => {

        // console.log(producto)
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelectorAll('td')[2].textContent = producto.cantidad * producto.precio
        templateCarrito.querySelector('.btn-mas').dataset.id = producto.id
        templateCarrito.querySelector('.btn-menos').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()

    console.log(Object.keys(carrito).length)
    console.log(document.querySelector('#cantAcc').textContent)
    document.querySelector('#cantAcc').textContent = Object.keys(carrito).length

    
}

const pintarFooter = () => {
    

    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5" class="text-danger">Lista vacia - Agrega algun titulo!</th>
        `
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, {
        cantidad
    }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {
        cantidad,
        precio
    }) => acc + cantidad * precio, 0)


    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarLista()

    })
    
    

 }



const btnAccion = e => {
    console.log(carrito)
    // accion de aumentar
    if (e.target.classList.contains('btn-mas')) {
        // console.log(carrito[e.target.dataset.id])

        const producto = carrito[e.target.dataset.id]
        console.log(producto)
        producto.cantidad ++
        carrito[e.target.dataset.id] = {...producto}
        pintarLista();
    }

    if (e.target.classList.contains('btn-menos')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0 ) {
            delete carrito[e.target.dataset.id]
        }
        pintarLista() 
    }

    

    e.stopPropagation()   

}






