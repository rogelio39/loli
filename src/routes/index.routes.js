import { Router } from "express";
import carritoRouter from "./cart.routes.js";
import productoRouter from "./producto.routes.js";
import sessionRouter from "./session.routes.js";
import messageRouter from "./message.routes.js";
import userRouter from "./user.routes.js";
import mockFakerRouter from './mockFaker.routes.js';
import { passportError, autorizacion } from "../util/messagesError.js";

const router = Router()

router.use("/api/users", userRouter)
router.use("/api/productos", productoRouter);
router.use("/api/cart", carritoRouter);
router.use("/api/mensajes", messageRouter);
router.use("/api/sessions", sessionRouter);
router.use('/api/mockingproductos', mockFakerRouter)


export default router