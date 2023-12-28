import { Router } from "express";
import { deleteUser, getUserbyId, getUsers, modifyUser } from "../controllers/user.controllers.js";
import { sendRecoveryMail } from "../config/nodemailer.js";
import crypto from 'crypto' //Reemplazo por JWT


const userRouter = Router()
const recoveryLinks = {}

userRouter.post('/password-recovery', (req,res)=> {
    const {email} = req.body;//Envia email
    try{
        const token = crypto.randomBytes(20).toString('hex')//Creo token unico e irrepetiple
        recoveryLinks[token] = {email: email, timestamp: Date.now()}
        const recoveryLink = `http://localhost:8080/api/users/reset-password/${token}`
        sendRecoveryMail(email, recoveryLink)
        res.status(200).send('Email de recuperacion enviado')
    }catch(error){
        res.status(500).send(`Error al enviar el email: ${error}`)
    }
})

userRouter.post('/reset-password/:token', (req,res)=>{ //Recuperar contraseña
    const {token} = req.params 
    const {newPassword, newPassword2} = req.body
    try{
        const linkData = recoveryLinks[token]
        if(linkData && Date.now() - linkData.timestamp <= 3600000){
            console.log(newPassword, newPassword2)
            const {email} = linkData
            console.log(email)
            console.log(token)
            if(newPassword == newPassword2){
                delete recoveryLinks[token]
                res.status(200).send('Contraseña modificada correctamente')
            }else{
                res.status(400).send('Las contraseñas deben ser identicas')
            }
        }else{
            res.status(401).send('El enlace ha expirado o no es valido')
        }
    } catch(error){
        res.status(500).send(`Error al modificar contraseña ${error}`)
    }

}),
userRouter.get('/', getUsers)
userRouter.get('/:id', getUserbyId)
userRouter.put('/:id', modifyUser)
userRouter.delete('/:id', deleteUser)

export default userRouter
