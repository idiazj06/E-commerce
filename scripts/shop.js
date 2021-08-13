const items = document.getElementById('items');
const fragment = document.createDocumentFragment();
const templateCards = document.getElementById('template-cards').content

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

const fetchData = async () => {
    try {
        const res = await fetch('./data/api.json')
        const data = await res.json()
        const dataReady = data[0]
         console.log(dataReady)  
        pintarCards(dataReady)
    } catch (error) {
        console.log(error)
    }
}



const pintarCards = dataReady =>{
    const portatiles = dataReady.portatiles
    const escritorio = dataReady.escritorio

    escritorio.forEach(escritorio=>{
        const {id,tipo,precio,imagen,nombre} = escritorio;

        templateCards.querySelector('.imagen-card').setAttribute('src',imagen);
        templateCards.querySelector('.card-title').textContent = nombre;
        templateCards.querySelector('.card-text').textContent = '$'+precio;
        templateCards.querySelector('.body').classList.add(tipo);
        templateCards.querySelector('.btn-comprar').dataset.id = id
       

        const clone = templateCards.cloneNode(true)
        fragment.appendChild(clone)
        
    })

    items.appendChild(fragment)
}

