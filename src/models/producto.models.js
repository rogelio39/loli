import { Schema, model} from "mongoose";

const productoSchema = new Schema({
    productos:{
        type:[
            {
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
                required: true,
            },
            status:{
                type:Boolean,
                default :true,
            },
            imgs:[], 
        }
        ]
    },
    default: []
})


export const productoModel = model('productos', productoSchema)