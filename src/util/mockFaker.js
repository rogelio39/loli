import {faker} from '@faker-js/faker'
import express from 'express'

const app = express()

const modelProducto = async () => { 
    return{
        _id: faker.database.mongodbObjectId(),
        codio: faker.location.countryCode(),
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        precio: faker.commerce.price(),
        stock: faker.number.binary(),
        categoria: faker.commerce.productAdjective(),
        status: faker.datatype.boolean(),
        img: faker.image.avatar(),
    }
}

export const createRandomProductos =  async (cantidadProductos) =>{
    const productos = []
    for(let i=0; i < cantidadProductos; i++){
        const producto = await modelProducto();
        productos.push(producto)
}
return productos
}


