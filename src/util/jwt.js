// import 'dotenv/config'
import jwt from 'jsonwebtoken'

const generarToken = (user) => {
const token = jwt.sign({user}, 'florenciaohanian', {expiresIn: '20h'})
console.log(token)
return token
}

generarToken({"_id": "6540de421557f6b5ac501232","nombre":"Lorena","apellido":"Lorenzoni","edad":28,"email":"lorena.lorenzoni@gmail.com","password":"$2b$15$vcqFAFm5MWnFJP8/ffL0WOFC1JkOk8iKcJ18BSK558iETEQiqLdW6","rol":"user"})