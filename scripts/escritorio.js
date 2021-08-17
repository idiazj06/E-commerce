let items = document.getElementById('items');
const fragment = document.createDocumentFragment();
const templateCards = document.querySelector('.template-cards').content
let modal = document.getElementById('modal');
let escritorio = {}



document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

items.addEventListener('click', e => {
    addModal(e)
})




const fetchData = async () => {
    try {
        const res = await fetch('./data/apiEscritorio.json')
        const data = await res.json()
        // console.log(data)
        pintarCards(data)

    } catch (error) {
        console.log(error)
    }
}


const pintarCards = data => {

    data.forEach(portatil => {
        const {
            id,
            tipo,
            precio,
            imagen,
            nombre
        } = portatil;

        //  console.log(id)

        // CARDS


        templateCards.querySelector('a').dataset.id = id;
        templateCards.querySelector('.cards').classList.add(tipo);
        templateCards.querySelector('h2').textContent = nombre;
        templateCards.querySelector('img').setAttribute('src', imagen)
        templateCards.querySelector('p').textContent = precio;

        templateCards.querySelector('.items-cards')

        const clone = templateCards.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)


}

const addModal = e => {
    if (e.target.classList.contains('btn')) {
        setModal(e.target.parentElement)

    }
    e.stopPropagation()
}

const setModal = objeto => {

    console.log(objeto)

    let producto = {
        id: objeto.querySelector('.btn').dataset.id,
        nombre: objeto.querySelector('.titulo-card').textContent,
        imagen: objeto.querySelector('img').src,
        precio: objeto.querySelector('p').textContent,
        cantidad:1     
    }

    




    escritorio[producto.id] = {
        ...producto
    }


    pintarListaModal()

    console.log(producto.id)
    console.log(escritorio)
    console.log(escritorio[producto.id])
}

const pintarListaModal = () => {

    const num = Object.values(escritorio).length
    const valores = Object.values(escritorio)
    const valoresMostrar = valores[num - 1]
    


    document.querySelector('.img-items-modal').setAttribute('src', valoresMostrar.imagen)
    document.querySelector('.agregar-carrito').dataset.id = valoresMostrar.id
    document.getElementById('titulo-modal').textContent = valoresMostrar.nombre
    document.getElementById('precio-modal').textContent = valoresMostrar.precio

    console.log(valores)

    console.log(document.querySelector('.btn-informacion'))

    document.querySelector('.btn-informacion').addEventListener('click', agregarCarrito)

    

    function agregarCarrito(){        
        
        localStorage.setItem('valores', JSON.stringify(valores))
        localStorage.setItem('Escritorio', JSON.stringify(escritorio))
        
    }
    
}


