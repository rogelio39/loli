import express from 'express'
import productosRouter from './routes/productos.routes.js'
import userRouter from './routes/users.routes.js'
import carritoRouter from './routes/cart.routes.js';

const app = express()
const PORT = 8080

app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/products', productosRouter)
app.use('/api/carts', carritoRouter)

app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`)
})