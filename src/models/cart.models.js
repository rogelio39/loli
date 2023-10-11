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

cartSchema.pre('findOne', function() {
    this.populate('productos.id_prod')
})


export const cartModel = model('carts', cartSchema)