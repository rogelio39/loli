import { Router } from "express";
import { getfakerProductos } from "../controllers/mockFaker.controllers.js";

const mockFakerRouter = Router()

mockFakerRouter.get('/', getfakerProductos)

export default mockFakerRouter