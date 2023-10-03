const socket = io()

const containerMensajes = document.getElementById("containerMensajes")
const chatForm = document.getElementById("chatForm")
const containerMensajesViejos = document.getElementById("containerMensajesViejos")

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

socket.on('messages', (mensajes) => {
    containerMensajes.innerHTML = ""
    mensajes.forEach(Mensaje => {
        containerMensajes.innerHTML +=
            `
        <div  class="containerItem">
            <h3><b>Usuario: </b>${Mensaje.email}</h3>
            <p><b>Mensaje: </b> ${Mensaje.message}</p>
            <p>${Mensaje.date}</p>
            <hr>
        </div>
        `
        
    });
})