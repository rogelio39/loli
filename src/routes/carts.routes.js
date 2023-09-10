import {
    Router
} from "express";
import nuevoCarrito from "../services/cart-manager.js";


const carritoRouter = Router()


carritoRouter.post('/', async (req, res) => {
    await nuevoCarrito.createCart()
    res.status(200).send("Carrito creado")
})

carritoRouter.get('/:cid', async (req, res) => {
    const carrito = await nuevoCarrito.getCart(Number(req.params.cid))
    if (carrito.length != 0)
        res.status(200).json(carrito)
    else
        res.status(400).send("Carrito inexistente. Debes crear un carrito")
})

carritoRouter.post('/:cid/product/:pid', async (req, res) => {
    const {
        cid,
        pid
    } = req.params
    const carrito = await nuevoCarrito.getCart(Number(cid))
    if (carrito.length != 0) {
        const prod = await nuevoCarrito.addProductToCart(Number(cid), Number(pid))
        res.status(200).send(prod)
    } else {
        res.status(400).send('Carrito inexistente. Debes crear un carrito')
    }
})
export default carritoRouter