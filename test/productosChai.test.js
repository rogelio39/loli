import "dotenv/config";
import { expect } from "chai";
import mongoose from "mongoose";
import { productoModel } from "../src/models/producto.models.js";


await mongoose.connect(process.env.MONGO_URL);

describe("Test CRUD de productos con chai en la ruta api/prodoductos", function () {
it("Obtengo todos los productos mediante metodo GET", async () => {
    const productos = await productoModel.find();
    expect(Array.isArray(productos)).to.be.ok; //Verdadero es OK
});
it("Obtengo productos by ID mediante metodo GET", async () => {
    const productos = await productoModel.findById("651c088c7e9e111a88d6c96d");
    expect(productos).to.have.property("_id"); //Verdadero es OK
});
it("Crear producto mediante POST", async () => {
    const nuevoProducto = {
    codigo: "Empa568",
    nombre: "Empanadas de carne cortada a cuchillo",
    descripcion: "Al horno, matambre, cebolla y pimiento",
    cantidad: 12,
    precio: 8000,
    stock: 100,
    categoria: "Empanadas y pizzas",
    status: "true",
    };
    const producto = await productoModel.create(nuevoProducto);
    expect(producto).to.have.property("_id"); //Verdadero es OK
})
it('Actualizar un usuario mediante metodo PUT', async () => {
    const nuevoProducto = {
        codigo: "Empa568",
        nombre: "Empanadas de carne cortada a cuchillo",
        descripcion: "Al horno, matambre, cebolla y pimiento",
        cantidad: 12,
        precio: 9500,
        stock: 100,
        categoria: "Empanadas y pizzas",
        status: "true",
        };
    const user = await productoModel.findByIdAndUpdate("65a931f387fae81dbefcdc6e", udpateUser)

    expect(user).to.have.property('_id')
})
it("ELiminar producto mediante DELETE", async () => {
    const resultado = await productoModel.findByIdAndDelete    ('65a9324c7c963a9fa4506285')
    expect(resultado).to.be.ok
    }
)}
)