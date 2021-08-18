const items = document.getElementById('items')
const items2 = document.getElementById('items2')
const formulario = document.getElementById('formularioPago')
const fragment = document.createDocumentFragment();
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const templateCarrito2 = document.getElementById('template-carrito2').content;
const footer = document.getElementById('footer')
let carrito = {}
let carrito2 = {}
let carrito3= []

// formulario de pago (variables)



console.log(items)



document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
    if (localStorage.getItem('Escritorio')) {
        carrito2 = JSON.parse(localStorage.getItem('Escritorio'))
    }



    pintarLista()
    pintarLista2()

})



items.addEventListener('click', e => {
    // addAcciones(e)
    btnAccion(e)

})
items2.addEventListener('click', e => {
    // addAcciones(e)

    btnAccion2(e)
})



const pintarLista = () => {


    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {

        // console.log(producto)
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelectorAll('td')[2].textContent = producto.precio
        templateCarrito.querySelectorAll('td')[4].textContent = producto.cantidad * producto.precio
        templateCarrito.querySelector('.btn-mas').dataset.id = producto.id
        templateCarrito.querySelector('.btn-menos').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)
    pintarFooter()

    // console.log(Object.keys(carrito).length)
    // console.log(document.querySelector('#cantAcc').textContent)

    // console.log(items)


}
const pintarLista2 = () => {


    items2.innerHTML = ''

    Object.values(carrito2).forEach(producto => {

        console.log(producto)
        templateCarrito2.querySelector('th').textContent = producto.id
        templateCarrito2.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito2.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito2.querySelectorAll('td')[2].textContent = producto.precio
        templateCarrito2.querySelectorAll('td')[4].textContent = producto.cantidad * producto.precio
        templateCarrito2.querySelector('.btn-mas2').dataset.id = producto.id
        templateCarrito2.querySelector('.btn-menos2').dataset.id = producto.id

        const clone = templateCarrito2.cloneNode(true)
        fragment.appendChild(clone)
    })

    items2.appendChild(fragment)
    pintarFooter()

    console.log(carrito2)
    // console.log(Object.keys(carrito).length)
    // console.log(document.querySelector('#cantAcc').textContent)
    // document.querySelector('#cantAcc').textContent = Object.keys(carrito).length + Object.keys(carrito2).length

    console.log(items2)


}


const pintarFooter = () => {


    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5" class="text-danger">Lista vacia - Agrega algun producto!</th>
        `
        return
    }
    const nCantidad1 = Object.values(carrito).reduce((acc, {
        cantidad
    }) => acc + cantidad, 0)
    const nTotal1 = Object.values(carrito).reduce((acc, {
        cantidad,
        precio
    }) => acc + cantidad * precio, 0)
    const nCantidad2 = Object.values(carrito2).reduce((acc, {
        cantidad
    }) => acc + cantidad, 0)
    const nTotal2 = Object.values(carrito2).reduce((acc, {
        cantidad,
        precio
    }) => acc + cantidad * precio, 0)


    templateFooter.querySelectorAll('td')[0].textContent = nCantidad1 + nCantidad2
    templateFooter.querySelectorAll('span')[1].textContent = nTotal1 + nTotal2

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        carrito2 = {}
        pintarLista()
        pintarLista2()

    })



}



const btnAccion = e => {
    console.log(carrito)
    // accion de aumentar
    if (e.target.classList.contains('btn-mas')) {
        // console.log(carrito[e.target.dataset.id])

        const producto = carrito[e.target.dataset.id]
        console.log(producto)
        producto.cantidad++
        carrito[e.target.dataset.id] = {
            ...producto
        }
        pintarLista();
    }

    if (e.target.classList.contains('btn-menos')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarLista()
    }
    e.stopPropagation()

    

    
}
const btnAccion2 = e => {
    console.log(carrito2)
    // accion de aumentar
    if (e.target.classList.contains('btn-mas2')) {
        // console.log(carrito[e.target.dataset.id])

        const producto2 = carrito2[e.target.dataset.id]
        console.log(producto2)
        producto2.cantidad++
        carrito2[e.target.dataset.id] = {
            ...producto2
        }
        pintarLista2();
    }

    if (e.target.classList.contains('btn-menos2')) {
        const producto2 = carrito2[e.target.dataset.id]
        producto2.cantidad--
        if (producto2.cantidad === 0) {
            delete carrito2[e.target.dataset.id]
        }
        pintarLista2()
    }
    e.stopPropagation()
    
    

    
}

formulario.addEventListener('submit', e=>{
    almacenarDatos(e)
})

almacenarDatos =e=>{
    console.log(e.target)
    carrito3.push(carrito)
    carrito3.push(carrito2)
    console.log(carrito3)

    localStorage.clear()
    localStorage.setItem('Informacion de carrito', JSON.stringify(carrito3))
}

