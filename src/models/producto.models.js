import {
    Schema,
    model
} from "moongose";

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
    marca: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    unidades: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    status:{
        type:Boolean,
        default :true,
    },
    imgs:[], 
})


export const productoModel = model('productos', productoSchema)