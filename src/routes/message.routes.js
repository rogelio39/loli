import { Router} from "express";
import { messageModel } from "../models/message.models.js";

const messageRouter = Router()

messageRouter.get('/', async (req, res) => {
    try {
        const mensajes = await messageModel.find()
        res.status(200).send({ respuesta: 'OK', mensaje: mensajes })
    } catch (error) {
        res.status(400).send({ respuesta: 'No hay mensajes para mostrar', mensaje: error })
    }
})


messageRouter.post('/', async (req, res) => {
    const { email, message, date } = req.body
    try {
        const respuesta = await messageModel.create({ email, message, date })
        res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error al enviar mensaje', mensaje: error })
    }
})

export default messageRouter