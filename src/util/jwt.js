import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const generarToken = (user) => {
const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '20h'})
console.log(token)
return token
}

// generarToken()