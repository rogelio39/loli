import express from 'express'
import userRouter from './routes/user.routes.js'
import productosRouter from './routes/producto.routes.js';
import carritoRouter from './routes/cart.routes.js';
import messageRouter from './routes/message.routes.js';
import mongoose from 'mongoose';


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

app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`)
})