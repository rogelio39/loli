const form = document.getElementById("idForm");
// const agregarProducto = document.getElementById('btn-form')
const containerProductos = document.getElementById("containerProductos");
const todosProd = document.getElementById("todosProd");

const socket = io();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const datForm = new FormData(e.target);
  const prod = Object.fromEntries(datForm);
  // console.log(prod)
  await socket.emit("nuevoProducto", prod);
  e.target.reset();
});

// En el codigo de abajo muestro el nuevo producto en pantalla
socket.on("productoCreado", async (producto) => {
  containerProductos.innerHTML = "";
  (containerProductos.innerHTML += `
    <div id=${producto.id} class="containerItem">
        <h2>${producto.nombre}</h2>
        <p><b>Codigo:</b> ${producto.codigo}</p>
        <p><b>Marca:</b> ${producto.descripcion}</p>
        <p><b>Cantidad:</b> ${producto.cantidad}</p>
        <p><b>Precio: $</b>${producto.precio}</p>
        <p><b>Unidades:</b> ${producto.stock}</p>
        <p><b>Categoria:</b> ${producto.categoria}</p>
    </div>
    `),
    socket.emit("cargarProductos");
});
socket.emit("cargarProductos");

socket.on("mostrarProductos", (productos) => {
  console.log(productos);
  todosProd.innerHTML = "";
  productos.forEach((producto) => {
    todosProd.innerHTML += `
        <div id=${producto._id} class="containerItem">
            <h2>${producto.nombre}</h2>
            <p><b>Codigo:</b> ${producto.codigo}</p>
            <p><b>Marca:</b> ${producto.descripcion}</p>
            <p><b>Cantidad:</b> ${producto.cantidad}</p>
            <p><b>Precio: $</b>${producto.precio}</p>
            <p><b>Unidades:</b> ${producto.stock}</p>
            <p><b>Categoria:</b> ${producto.categoria}</p>
            <button id=${producto._id} class='eliminar'> Eliminar </button>
        </div>
        `;
  });
});

const eliminarProducto = (e) => {
    socket.emit('eliminarProducto', e.target.id);

};

document.addEventListener("click",(e) => e.target.matches(".eliminar") && eliminarProducto(e)
);
