import {Schema, model}  from "mongoose";


const cartSchema = new Schema({
    productos:{
        type: [
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
        ],
        default: function(){
            return[];
        }
    }
})

export const cartModel = model('carts', cartSchema)