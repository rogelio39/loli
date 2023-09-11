import {Schema, model}  from "mongoose";


const cartSchema = new Schema({
productos: [
    {
        id_prod:{
            type: Schema.Types.ObjectId,
            ref: 'productos',
            required: true
        },
        cantidad:{
            type: Number,
            required: true,
        }
    }
]
})

export const cartModel = model('carts', cartSchema)