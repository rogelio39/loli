const socket = io()

const containerMensajes = document.getElementById("containerMensajes")
const chatForm = document.getElementById("chatForm")

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (inputUsuario.value.trim().length > 0) {
        socket.emit("mensaje", {
            fecha: fechaActual,
            user: user,
            mensaje: inputUsuario.value        
        })
        inputUsuario.value = ""
    }
})

socket.on('mensajes', (infoMensaje) =>{
    containerMensajes.innerHTML += `
    <div  class="containerItem">
        <h2>${infoMensaje.email}</h2>
        <p><b>Mensaje: </b> ${infoMensaje.mesaje}</p>
        </div>
        `
    arrayMensajes.array.forEach(mensaje => {
       
    }); 
})