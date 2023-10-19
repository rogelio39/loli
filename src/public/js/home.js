const contenedorProductos = document.getElementById("contenedorProductos")

const socket = io()

socket.on('mostrarProductos', (productos) => {
    console.log('Productos: ', productos)
    productos.forEach(producto => {
        contenedorProductos.innerHTML += `
        <div id=${producto._id} class="containerItem">
            <h2>${producto.nombre}</h2>
            <p><b>Codigo:</b> ${producto.codigo}</p>
            <p><b>Descripcion:</b> ${producto.descripcion}</p>
            <p><b>Cantidad:</b> ${producto.cantidad}</p>
            <p><b>Precio: $</b>${producto.precio}</p>
            <p><b>Stock:</b> ${producto.stock}</p>
            <p><b>Categoria:</b> ${producto.categoria}</p>
            <button id=${producto._id} class='agregar'> Agregar al carrito </button>
        </div>
        `
        
    });
})

const agregarAlCarrito = (e) => {
    socket.emit('agregar', e.target.id);

};

document.addEventListener("click",(e) => e.target.matches(".agregar") && agregarAlCarrito(e)
);
socket.emit('cargarProductos');