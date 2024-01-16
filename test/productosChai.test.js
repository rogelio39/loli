import chai from "chai";
import mongoose from "mongoose";
import productoModel from '../src/models/producto.models.js'


const expect = chai.expect

await mongoose.connect(process.env.MONGO_URL)

describe('Test CRUD de productos con chai en la ruta api/prodoductos'),function() {
    it('Obtengo todos los productos mediante metodo GET', async() =>{
        const productos = await productoModel.find()
        expect (Array.isArray(productos)).to.be.ok //Verdadero es OK
    })
    it('Obtengo productos by ID mediante metodo GET', async() =>{
        const productos = await productoModel.findById()
        expect (productos).to.have.property('_id') //Verdadero es OK
    })
    it('Crear producto mediante POST', async() =>{
        const nuevoProducto = {
            codigo: "Empa567",
            nombre: "Empanadas de carne cortada a cuchillo",
            descripcion: "Al horno, matambre, cebolla y pimiento",
            cantidad: "Una docena",
            precio: 8000,
            stock: 100,
            categoria: "Empanadas y pizzas",
            status: "true"
        }
        const producto = await productoModel.create(nuevoProducto)
        expect (productos).to.have.property('_id') //Verdadero es OK
    })
}