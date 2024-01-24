import "dotenv/config";
import { expect } from "chai";
import mongoose from "mongoose";
import supertest from "supertest";

await mongoose.connect(process.env.MONGO_URL);

const requester = supertest('http://localhost:8080')

let newCartId = null;
let idProducto = '651c088c7e9e111a88d6c96a';
describe('Test CRUD supertest en ruta api/cart', function(){
    it('Iniciar sesion con POST a traves de /login', async function() { 
        this.timeout(5000)
        const user = {
            "nombre": "Josefina",
            "apellido": "Torres",
            "email": "jose.torres@gmail.com",
            "password": "jose159"
        };
        const result = await requester.post('/api/sessions/login').send(user);
        const cookieResult = result.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok;
})
it('Crear un cart mediante POST ', async function() { 
    this.timeout(5000);
    const result = await requester.post('/api/cart')
    console.log('Result', result.body.mensaje)
    newCartId = result.body.mensaje._id;
    expect(newCartId).to.be.ok;
    
});

it('Agregar producto a un cart mediante POST en /cart/:cid/productos/:pid', async function() {
    this.timeout(5000);
    const cantidad = {
        cantidad: 1
    };
    const result = await requester.post(`/api/cart/${newCartId}/productos/${idProducto}`).set("jwtCookie",` ${cookie.result}`).send(cantidad)
    console.log('idProducto',result.body)
    expect(result.body).to.be.ok
})
})
