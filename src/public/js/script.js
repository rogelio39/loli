const socket = io()

const containerMensajes = document.getElementById("containerMensajes")
const chatForm = document.getElementById("chatForm")

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = {
        email: e.target[0].value,
        message: e.target[1].value
    }


    if (data.email === "" || data.message === "") {
        alert("Por favor complete el/los campos vacios")
    } else {
        socket.emit("mensaje", {
            email: data.email,
            message: data.message
        })
        e.target.reset()
    }
})

socket.on('nuevoMensaje', (infoMensaje) => {
    containerMensajes.innerHTML +=
        `
    <div  class="containerItem">
        <h3><b>Usuario: </b>${infoMensaje.email}</h3>
        <p><b>Mensaje: </b> ${infoMensaje.message}</p>
        <p>${infoMensaje.date}</p>
        <hr>
    </div>
    `
    // arrayMensajes.array.forEach(nuevoMensaje => {});
})