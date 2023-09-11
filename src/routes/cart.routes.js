import {  Router} from "express";
import {    cartModel} from "../models/cart.models.js";
import { productoModel } from "../models/producto.models.js";


const carritoRouter = Router()

carritoRouter.get('/:id', async (req, res) => {
    const { id} = req.params
    try {
        const prod = await cartModelodel.findById(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: prod})
        else
            res.status(404).send({respuesta: 'Error en consultar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({respuesta: 'Error', mensaje: "No encontrado" })
    }
})



carritoRouter.post('/:cid/productos/:pid', async (req, res) => {
    const {cid, pid } = req.params
    const {      cantidad    } = req.body
    try {
        const cart = await cartModel.findById(cid)
        if(cart){
        const prod = await productoModel.findById(pid)
            if(prod){
                const indice = cart.productos.findIndex(prod => prod.id_prod === pid)
                if(indice !=-1) {
                    cart.productos[indice].cantidad = cantidad
                } else {
                    cart.productos.push({id_prod: pid, cantidad: cantidad})
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(200).send({ respuesta: 'OK', mensaje: cart})
            } else{
                    res.status(404).send({ respuesta: 'Error en agregar producto a carrito', mensaje: respuesta})
}
        } else {
            res.status(400).send({ respuesta: 'Error en agregar producto a carrito', mensaje: 'Carrito no encontrado'   })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en agregar producto a carrito', mensaje: error   })
    }
})

export default carritoRouter