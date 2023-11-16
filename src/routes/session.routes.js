import { Router } from "express";
import { userModel } from "../models/user.models.js";
import passport from "passport";
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
  }
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
sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (req.session.login) {
      // res.status(200).send({ resultado: "Usuario ya logueado" });
      res.redirect('/static/home', 200, { 'info': 'usuario ya logueado' })
      return console.log('usuario logueado')
    }
    const user = await userModel.findOne({ email: email });
    if (user) {
      if (user.password == password) {
        req.session.login = true
        // res.status(200).send({ resultado: "Login valido", message: user });
        res.redirect('/static/home', 200, { 'info': 'user' })
        console.log('session: ', req.session)
      } else {
        res.status(401).send({ resultado: "Contraseña invalida", message: password }); 
      }
    } else {
      res.status(404).send({ resultado: "No existe usario con este email", message: user });
    }  
  } catch (error) {
    res.status(400).send({ error: `Error en login : ${error}` });
  }
});

sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req,res) => {
  res.status(200).send({mensaje: 'Usuario registrado'})
})

sessionRouter.get('/githubCallback', passport.authenticate('github'), async(req,res) => {
  req.session.user = req.user
  res.status(200).send({mensaje: 'Usuario logueado'})
})
sessionRouter.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  // res.status(200).send({resultado: "Sesion cerrada" });
  res.redirect('/static/login', 200, { resultado: 'Usuario deslogueado' })
});

sessionRouter.get('/testJWT', passport.authenticate('jwt', {session:false}), (req,res)=>{
  console.log(req)
  res.send(req.user)
})

sessionRouter.get('/current', passportError('jwt'), autorizacion('user'), (req, next) =>{
  res.send(req.user)
})
export default sessionRouter;
