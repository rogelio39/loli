import { Router } from "express";
import { userModel } from "../models/user.models.js";

const sessionRouter = Router()
sessionRouter.post("/login", async (req, res) => {
    console.log(req.session)
  const { email, password } = req.body;
  try {
    if (req.session.login) {
      res.status(200).send({ resultado: "Usuario ya existente" });
    }

    const user = await userModel.findOne({ email: email });
    if (user) {
      if (user.password == password) {
        req.session.login = true
        res.status(200).send({ resultado: "Login valido", message: user });
      } else {
        res.status(401).send({ resultado: "Contraseña invalida", message: password }); 
      }
    } else {
      res
        .status(404)
        .send({ resultado: "No existe usario con este email", message: user });
    }  
  } catch (error) {
    res.status(400).send({ error: `Error en login : ${error}` });
  }
});

sessionRouter.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.status(200).send({ resultado: "Sesion cerrada" });
});

export default sessionRouter;
