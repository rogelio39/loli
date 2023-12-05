import { createRandomProductos } from "../util/mockFaker.js";

export const getfakerProductos = async (req, res) => {
    try {
        const productos = await createRandomProductos(100);
        res.status(200).send(productos);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los productos' });
    }
}