import { Router } from "express";
import { deleteUser, getUserbyId, getUsers, modifyUser } from "../controllers/user.controllers.js";

const userRouter = Router()
userRouter.get('/', getUsers)
userRouter.get('/:id', getUserbyId)
userRouter.put('/:id', modifyUser)
userRouter.delete('/:id', deleteUser)

export default userRouter
