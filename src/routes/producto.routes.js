import { Router} from "express";
import {  productoModel} from "../models/producto.models.js";

const productosRouter = Router()

productosRouter.get('/', async (req, res) => {
    const { limit  } = req.query
    try {
        const prods = await productoModel.find().limit(limit)
        res.status(200).send({ respuesta: 'OK', mensaje: prods })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar productos', mensaje: error })
    }
})

productosRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const prod = await productoModel.findById()
        if(prod)
        res.status(200).send({ respuesta: 'OK', mensaje: prod })
        else
        res.status(404).send({ respuesta: 'Error en consultar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error', mensaje: "No encontrado" })
    }
})

productosRouter.post('/', async (req, res) => {
    const{codigo,nombre, marca, precio, unidades, categoria,status,img} = req.body
    try {
        const prod = await productoModel.create({codigo,nombre, marca, precio, unidades, categoria,status, img})
        res.status(200).send({ respuesta: 'OK', mensaje: prod})
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar productos', mensaje: error })
    }
})

productosRouter.put('/:id', async (req, res) => {
        const {id} = req.params
        const {codigo,nombre, marca, precio, unidades, categoria,status} = req.body
        try {
            const prod = await productoModel.findByIdAndUpdate(id, {codigo,nombre, marca, precio, unidades, categoria,status})
            if(prod)
            res.status(200).send({ respuesta: 'OK', mensaje: "Producto actualizado" })
        else
            res.status(400).send({ respuesta: 'Error', mensaje: "No encontrado" })
            } catch (error) {
            res.status(400).send({ respuesta: 'Error en actualizar producto', mensaje: error })
}
})

productosRouter.delete('/:id', async (req, res) => {
            const {id} = req.params
            
            try {
                const prod = await productoModel.findByIdAndDelete(id)
                if(prod)
                res.status(200).send({ respuesta: 'OK', mensaje: "Producto eliminado" })
            else
                res.status(400).send({ respuesta: 'Error', mensaje: "No encontrado" })
                } catch (error) {
                res.status(400).send({ respuesta: 'Error en eliminar producto', mensaje: error })
            }
})

export default productosRouter