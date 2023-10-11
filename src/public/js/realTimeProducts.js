const form = document.getElementById("idForm")
const agregarProducto = document.getElementById('btn-form')
const containerProductos = document.getElementById('containerProductos')

const socket = io()

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target)
    const prod = Object.fromEntries(datForm)
    // console.log(prod)
    await socket.emit('nuevoProducto', prod)
    e.target.reset()
})

socket.emit('cargarProductos')

// En el codigo de abajo muestro todo los productos que tengo en la BDD
socket.on('mostrarProductos', (productos) => {
    productos.forEach(producto => {
        containerProductos.innerHTML += `
        <div id=${producto.id} class="containerItem">
            <h2>${producto.nombre}</h2>
            <p><b>Codigo:</b> ${producto.codigo}</p>
            <p><b>Marca:</b> ${producto.marca}</p>
            <p><b>Precio: $</b>${producto.precio}</p>
            <p><b>Unidades:</b> ${producto.unidades}</p>
            <p><b>Cantidad:</b> ${producto.cantidad}</p>
            <p><b>Categoria:</b> ${producto.categoria}</p>
            <button id=${producto.id} class='eliminar'> Eliminar </button>
        </div>
        `
        
    });
})

// En el codigo de abajo muestro el nuevo producto en pantalla
socket.on('mostrarNuevoProducto', (producto) => {
    containerProductos.innerHTML += `
    <div id=${producto.id} class="containerItem">
        <h2>${producto.nombre}</h2>
        <p><b>Codigo:</b> ${producto.codigo}</p>
        <p><b>Marca:</b> ${producto.marca}</p>
        <p><b>Precio: $</b>${producto.precio}</p>
        <p><b>Unidades:</b> ${producto.unidades}</p>
        <p><b>Cantidad:</b> ${producto.cantidad}</p>
        <p><b>Categoria:</b> ${producto.categoria}</p>
        <button id=${producto.id} class='eliminar'> Eliminar </button>
    </div>
    `
})

const eliminarProducto =  e => socket.emit('eliminarProducto', Number(e.target.id));

document.addEventListener('click', e => e.target.matches('.eliminar') && eliminarProducto(e));

// En el codigo de abajo intente eliminar el producto al cual se le hace click
// y volver a renderizar todos los productos pero no encontre la forma de que
// se muestre solo una vez el arreglo de productos

// socket.on('nuevosProductos', (productos) => {
//     containerProductos=''
//     productos.forEach(producto => {
//         containerProductos.innerHTML += `
//         <div id=${producto.id} class="containerItem">
//             <h2>${producto.nombre}</h2>
//             <p><b>Codigo:</b> ${producto.codigo}</p>
//             <p><b>Marca:</b> ${producto.marca}</p>
//             <p><b>Precio: $</b>${producto.precio}</p>
//             <p><b>Unidades:</b> ${producto.unidades}</p>
//             <p><b>Cantidad:</b> ${producto.cantidad}</p>
//             <p><b>Categoria:</b> ${producto.categoria}</p>
//             <button id=${producto.id} class='eliminar'> Eliminar </button>
//         </div>
//         `    
//     })
// })