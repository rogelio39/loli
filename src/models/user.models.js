import { Schema, model} from "mongoose";
import paginate from "mongoose-paginate-v2";

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    }, 
    apellido: {
        type: String,
        index: true,
        required: true,
    }, 
    edad: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    rol: {
        type: String,
        default: 'user'
    }
}) 

userSchema.plugin(paginate) 

export const userModel = model('users', userSchema)