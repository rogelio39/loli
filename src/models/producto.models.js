import {
    Schema,
    model
} from "mongoose";

const productoSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
        index: true,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    img: [],
})


export const productoModel = model('productos', productoSchema)