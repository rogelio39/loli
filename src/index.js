import express from 'express'
import userRouter from './routes/user.routes.js'
import productosRouter from './routes/producto.routes.js';
import carritoRouter from './routes/cart.routes.js';
import messageRouter from './routes/message.routes.js';
import mongoose from 'mongoose';
import {    engine} from 'express-handlebars';
import {    __dirname} from './path.js'
import path from 'path';
import {    Server} from 'socket.io';
import {    messageModel} from './models/message.models.js';
import {    userModel} from './models/user.models.js';
import {    productoModel} from './models/producto.models.js';


const app = express()
const PORT = 8080

mongoose.connect('mongodb+srv://florenciaohanian:Lolita2022@cluster0.ahxnz3j.mongodb.net/?retryWrites=true&w=majority')
    .then(async () => {
        console.log('BDD conectada')
        // await productoModel.create(
        //     [
        //     {
        //         codigo: "123pizza",
        //         nombre: "Pizza de queso azul",
        //         descripcion: "Masa de pizza con salsa roja, muzzarella y queso azul",
        //         cantidad: 1,
        //         precio: 2500,
        //         stock: 1,
        //         categoria: "Pizzas y empanadas",
        //         status: true,
        //         img: [], 
        //     },
        //     {
        //         codigo: "124pizza",
        //         nombre: "Pizza muzzarella",
        //         descripcion: "Masa de pizza con salsa roja, muzzarella y queso azul",
        //         cantidad: 1,
        //         precio: 2000,
        //         stock: 1,
        //         categoria: "Pizzas y empanadas",
        //         status: true,
        //         img: [],
        //     },
        //     {
        //         codigo: "125pizza",
        //         nombre: "Pizza cebolla y muzzarella",
        //         descripcion: "Masa de pizza con salsa roja, muzzarella y queso azul",
        //         cantidad: 1,
        //         precio: 2500,
        //         stock: 1,
        //         categoria: "Pizzas y empanadas",
        //         status: true,
        //         img: [],
        //     },
        //     {
        //         codigo: "126pizza",
        //         nombre: "Pizza de jamon y muzzarella",
        //         descripcion: "Masa de pizza con salsa roja, muzzarella y queso azul",
        //         marca: "Crudo",
        //         cantidad: 1,
        //         precio: 2500,
        //         stock: 1,
        //         categoria: "Pizzas y empanadas",
        //         status: true,
        //         img: [],
        //     }
        // ])
const resultado = await userModel.paginate()
// console.log(resultado)
    })
    .catch((e) => console.log('Error de conexion', e))

//middlewares
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/productos', productosRouter)
app.use('/api/cart', carritoRouter)
app.use('/api/mensajes', messageRouter)
app.use('/static', express.static(path.join(__dirname, '/public')))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(serverExpress)

const mensajes = []


io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")

    // chat view
    socket.on('mensaje', async (infoMensaje) => {
        await messageModel.create({
            email: infoMensaje.email,
            message: infoMensaje.message
        })
        const mensajes = await messageModel.find()
        socket.emit('messages', mensajes)
    })
    // Mostrar todos los productos en home.js (y en home handlebars)
    socket.on('cargarProductos', async () =>{
        const productos = await productoModel.find();
        socket.emit('mostrarProductos', productos);
    })
})


app.get('/static/chat', (req, res) => {
    res.render('chat', {
        css: "style.css",
        title: "Chat",
        js: "script.js",
    })
})

app.get('/static/home', async (req, res) => {
    res.render('home', {
        css: "home.css",
        title: "Home",
        js: "home.js"
    })
})