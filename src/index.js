import express from 'express'
import userRouter from './routes/user.routes.js'
import productosRouter from './routes/producto.routes.js';
import carritoRouter from './routes/cart.routes.js';
import messageRouter from './routes/message.routes.js';
import mongoose from 'mongoose';
import { engine} from 'express-handlebars';
import {    Server} from 'socket.io';
import { messageModel } from './models/message.models.js';


const app = express()
const PORT = 8080

mongoose.connect('mongodb+srv://florenciaohanian:Lolita2022@cluster0.ahxnz3j.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('BDD conectada'))
.catch(() => console.log('Error de conexion'))

//middlewares
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/productos', productosRouter)
app.use('/api/cart', carritoRouter)
app.use('/api/mensajes', messageRouter )
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(serverExpress)

const mensajes = []


io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")

    socket.on('mensaje', (infoMensaje) => {
        console.log(infoMensaje)
        const nuevoMensaje = new messageModel({email:infoMensaje.email, message: infoMensaje.message,})
        nuevoMensaje.save()
        .then(()=>{
            socket.emit('nuevoMensaje', infoMensaje)
        
        } )
        .catch(error => console.error(error))
        socket.emit('mensajes', mensajes)
    })
})


app.get('/static', (req, res) => {
    res.render('chat', {
        css: "style.css",
        title: "Chat",
        js: "script.js"
    })
})


