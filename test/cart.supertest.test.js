import "dotenv/config";
import { expect } from "chai";
import mongoose from "mongoose";
import supertest from "supertest";

await mongoose.connect(process.env.MONGO_URL);

const requester = supertest('http://localhost:8080')

describe('Test CRUD supertest en ruta api/cart', function(){
    it('iniciar sesion con post a traves de /login', async function() { // Increase timeout here 
        this.timeout(5000)
        const user = {
            "nombre": "Josefina",
            "apellido": "Torres",
            "email": "jose.torres@gmail.com",
            "password": "jose159"
        };
        const { statusCode, _body, ok} = await requester.post('/api/sessions/login').send(user);
        token = _body.token;
        // expect(statusCode).to.be.equal(200);
        expect(token).to.be.ok;
})
})