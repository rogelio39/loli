import "dotenv/config";
import { expect } from "chai";
import mongoose from "mongoose";
import { userModel } from "../src/models/user.models.js";


await mongoose.connect(process.env.MONGO_URL);

describe("Test CRUD de user con chai en la ruta api/user", function () {
it("Obtengo todos los user mediante metodo GET", async () => {
    const users = await userModel.find();
    expect(Array.isArray(users)).to.be.ok; //Verdadero es OK
});
it("Obtengo user by ID mediante metodo GET", async () => {
    const users = await userModel.findById("651c088c7e9e111a88d6c96d");
    expect(users).to.have.property("_id"); //Verdadero es OK
});
it("Crea user mediante POST", async () => {
    const nuevoUser = {
    nombre: "Emilia",
    apellido: "Bertola",
    edad: 29,
    email: "emi.bertola@gmail.com",
    password:"emiber526"
    };
    const user = await userModel.create(nuevoUser);
    expect(user).to.have.property("_id"); //Verdadero es OK
})
it('Actualizar un usuario mediante metodo PUT', async () => {
    const updateUser = {
        "nombre": "Facundo",
        "apellido": "Nadaf",
        "edad": 30,
        "email": "facundo.nadaf@gmail.com",
    } 
    const user = await userModel.findByIdAndUpdate("655e0cd43a91256d8f59ed34", updateUser)
    expect(user).to.have.property('_id')
})
it("ELiminar user mediante DELETE", async () => {
    const resultado = await userModel.findByIdAndDelete('655e0c953a91256d8f59ed2f')
    expect(resultado).to.be.null
    }
)}
)