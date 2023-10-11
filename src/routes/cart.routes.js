import {
    Router
} from "express";
import {
    cartModel
} from "../models/cart.models.js";
import {
    productoModel
} from "../models/producto.models.js";


const carritoRouter = Router()

carritoRouter.post("/", async (req, res) => {
    try {
        const cart = await cartModel.create({})
        res.status(200).send({
            respuesta: "ok",
            mensaje: cart
        })
    } catch (error) {
        res
            .status(400)
            .send({
                respuesta: "Error en crear carrito",
                mensaje: error
            })
    }
})

carritoRouter.get('/', async (req, res) => {
        try {
        const cart = await cartModel.find()
        if (cart)

            res.status(200).send({
                respuesta: 'OK',
                mensaje: cart
            })


        else
            res.status(404).send({
                respuesta: 'Error en consultar carrito',
                mensaje: 'Not Found'
            })
    } catch (error) {
        res.status(400).send({
            respuesta: 'Error',
            mensaje: "Carrito no encontrado"
        })
    }
})

carritoRouter.get('/:id', async (req, res) => {
    const {
        id
    } = req.params
    try {
        const cart = await cartModel.findById(id)
        if (cart)
            res.status(200).send({
                respuesta: 'OK',
                mensaje: cart
            })
        else
            res.status(404).send({
                respuesta: 'Error en consultar carrito',
                mensaje: 'Not Found'
            })
    } catch (error) {
        res.status(400).send({
            respuesta: 'Error',
            mensaje: "Carrito no encontrado"
        })
    }
})

carritoRouter.post('/:cid/productos/:pid', async (req, res) => {
    const {
        cid,
        pid
    } = req.params
    const {
        cantidad
    } = req.body
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productoModel.findById(pid)
            if (prod) {
                const indice = cart.productos.findIndex(prod => prod.id_prod == pid)
                console.log(indice)
                if (indice != -1) {
                    cart.productos[indice].cantidad = cantidad
                } else {
                    cart.productos.push({
                        id_prod: pid,
                        cantidad: cantidad
                    })
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(200).send({
                    respuesta: 'OK',
                    mensaje: respuesta
                })
            } else {
                res.status(404).send({
                    respuesta: 'Error en agregar producto a carrito',
                    mensaje: respuesta
                })
            }
        } else {
            res.status(400).send({
                respuesta: 'Error en agregar producto a carrito',
                mensaje: 'Carrito no encontrado'
            })
        }
    } catch (error) {
        res.status(400).send({
            respuesta: 'Error en agregar producto a carrito',
            mensaje: error
        })
    }
})

carritoRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        await cartModel.findByIdAndUpdate(cid, { products: [] })
        res.status(200).send({ respuesta: 'ok', mensaje: 'Carrito vacio' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error getting cart by id', mensaje: error })
    }
})

carritoRouter.delete('/:cid/productos/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productModel.findById(pid)
            if (prod) {
                const indice = cart.products.findIndex(item => item.id_prod._id.toString() == pid)
                if (indice !== -1) {
                    cart.products.splice(indice, 1)
                }
            }
        }
        const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
        res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error getting cart by id', mensaje: error })
    }
})

export default carritoRouter