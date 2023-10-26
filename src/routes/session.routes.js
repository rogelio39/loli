import { Router } from "express";
import { userModel } from "../models/user.models.js";

const sessionRouter = Router()
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

sessionRouter.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  // res.status(200).send({resultado: "Sesion cerrada" });
  res.redirect('/static/login', 200, { resultado: 'Usuario deslogueado' })
});

export default sessionRouter;
