import { Router } from "express";
import passport from "passport";
import {generarToken} from "../util/jwt.js"
import {passportError, autorizacion} from "../util/messagesError.js"

const sessionRouter = Router()

//Middlewares
sessionRouter.post('/login', passport.authenticate('login'), async (req,res) => {
try{
  if(!req.user){
        return res.status(401).send({mensaje:`Usuario invalido`})
  }
  req.session.user = {
    nombre: req.user.nombre,
    apellido: req.user.apellido,
    edad: req.user.edad,
    email: req.user.email,
    rol: req.user.rol,
  }
  const token = generarToken(req.user)
  res.cookie('jwtCookie', token, {
    maxAge: 72000000 // 20hs
  })
  res.status(200).send({payload: req.user})
  } catch(error){
res.status(500).send({mensaje: `Error al iniciar sesion ${error}`})
}
})

sessionRouter.post('/registro', passport.authenticate('registro'), async (req,res) => {
  try{
    if(!req.user){
            return res.status(400).send({mensaje:`Usuario existente`})
    }
      res.status(200).send({mensaje: 'Usuario creado'})

  } catch(error){
  res.status(500).send({mensaje: `Error al registrar usuario ${error}`})
  }
  })

sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req,res) => {
  res.status(200).send({mensaje: 'Usuario registrado'})
})

sessionRouter.get('/githubCallback', passport.authenticate('github'), async(req,res) => {
  req.session.user = req.user
  res.status(200).send({mensaje: 'Usuario logueado'})
})
sessionRouter.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy()
  }
res.clearCookie('jwtCookie')
  res.status(200).send({resultado: "Sesion cerrada" });
});

//Verifica si el token es valido
sessionRouter.get('/testJWT', passport.authenticate('jwt', {session:false}), (req,res)=>{
  res.send(req.user)
})

sessionRouter.get('/current', passportError('jwt'), autorizacion('basico'), (req, res, next) =>{
  res.send(req.user.user)
})

export default sessionRouter
