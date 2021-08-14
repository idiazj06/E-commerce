let items = document.getElementById('items');
const fragment = document.createDocumentFragment();
const templateCards = document.querySelector('.template-cards').content
let carrito = {}



document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

items.addEventListener('click', e => {
    addModal(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('./data/apiPortatiles.json')
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

    let producto = {
        id: objeto.querySelector('.btn').dataset.id,
        imagen: objeto.querySelector('img').src,        
    }


    

    carrito[producto.id] = { ...producto }

    
     pintarLista()
}

const pintarLista = () => {

    const num = Object.values(carrito).length
    const valorImagen = Object.values(carrito) 
    const imagenMostrar = valorImagen[num-1]

    console.log(num)
    console.log(valorImagen)
    console.log(imagenMostrar.imagen)

    document.querySelector('.img-items-modal').setAttribute('src', imagenMostrar.imagen)
     
}





