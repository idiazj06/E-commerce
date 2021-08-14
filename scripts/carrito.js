let items = document.getElementById('items');
const fragment = document.createDocumentFragment();
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const footer = document.getElementById('footer')    
let carrito = {}



document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})


const fetchData = async () => {
    try {
        const res = await fetch('./data/apiPortatiles.json')
        const data = await res.json()
        // console.log(data)
        // pintarCards(data)

    } catch (error) {
        console.log(error)
    }
}



// CARRITO
