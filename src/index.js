import express from "express";
import userRouter from "./routes/user.routes.js";
import productosRouter from "./routes/producto.routes.js";
import carritoRouter from "./routes/cart.routes.js";
import messageRouter from "./routes/message.routes.js";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import path from "path";
import { Server } from "socket.io";
import { messageModel } from "./models/message.models.js";
import { userModel } from "./models/user.models.js";
import { productoModel } from "./models/producto.models.js";
import sessionRouter from "./routes/session.routes.js";
import "dotenv/config";
import { cartModel } from "./models/cart.models.js";
const app = express();
const PORT = 8080;

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("BDD conectada");
    // await productoModel.create(
    //     [
    //     {
    //         codigo: "123pizza",
    //         nombre: "Pizza de queso azul",
    //         descripcion: "Masa de pizza con salsa roja, muzzarella y queso azul",
    //         cantidad: 1,
    //         precio: 2500,
    //         stock: 1,
    //         categoria: "Pizzas y empanadas",
    //         status: true,
    //         img: [],
    //     },
    //     {
    //         codigo: "124pizza",
    //         nombre: "Pizza muzzarella",
    //         descripcion: "Masa de pizza con salsa roja, muzzarella y queso azul",
    //         cantidad: 1,
    //         precio: 2000,
    //         stock: 1,
    //         categoria: "Pizzas y empanadas",
    //         status: true,
    //         img: [],
    //     },
    //     {
    //         codigo: "125pizza",
    //         nombre: "Pizza cebolla y muzzarella",
    //         descripcion: "Masa de pizza con salsa roja, muzzarella y queso azul",
    //         cantidad: 1,
    //         precio: 2500,
    //         stock: 1,
    //         categoria: "Pizzas y empanadas",
    //         status: true,
    //         img: [],
    //     },
    //     {
    //         codigo: "126pizza",
    //         nombre: "Pizza de jamon y muzzarella",
    //         descripcion: "Masa de pizza con salsa roja, muzzarella y queso azul",
    //         marca: "Crudo",
    //         cantidad: 1,
    //         precio: 2500,
    //         stock: 1,
    //         categoria: "Pizzas y empanadas",
    //         status: true,
    //         img: [],
    //     }
    // ])
    // const resultado = await userModel.paginate();
  })
  .catch(() => console.log("Error de conexion a la BDD"));

//middlewares
app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 60,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//Routes
app.use("/api/users", userRouter);
app.use("/api/productos", productosRouter);
app.use("/api/cart", carritoRouter);
app.use("/api/mensajes", messageRouter);
app.use("/api/sessions", sessionRouter);
app.use("/static", express.static(path.join(__dirname, "/public")));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/setcookie", (req, res) => {
  res
    .cookie("cookieCookie", "Mi cookie", { maxAge: 50000, signed: true })
    .send("Cookie Generada");
});
app.get("/getcookie", (req, res) => {
  res.cookie("cookieCookie", "Mi cookie").send("Cookie Modificada");
});

app.get("/getcookie", (req, res) => {
  req.send(req.signedCookies);
});

const serverExpress = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

const io = new Server(serverExpress);

const mensajes = [];

io.on("connection", (socket) => {
  console.log("Servidor Socket.io conectado");

  // chat view
  socket.on("mensaje", async (infoMensaje) => {
    await messageModel.create({
      email: infoMensaje.email,
      message: infoMensaje.message,
    });
    const mensajes = await messageModel.find();
    socket.emit("messages", mensajes);
  });
  // Mostrar todos los productos en home.js (y en home handlebars)
  socket.on("cargarProductos", async () => {
    const productos = await productoModel.find();
    socket.emit("mostrarProductos", productos);
  });
  //Se utiliza en realTime
  socket.on("nuevoProducto", async (prod) => {
    await productoModel.create({
      codigo: prod.codigo,
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      cantidad: prod.cantidad,
      precio: prod.precio,
      stock: prod.stock,
      categoria: prod.categoria,
    });
    socket.emit("productoCreado", prod);
  });
  //Se utiliza en realTime

  socket.on("eliminarProducto", async (id) => {
    try {
      await productoModel.deleteOne({ _id: id });
      const productos = await productoModel.find();
      socket.emit("mostrarProductos", productos);
    } catch (error) {
      console.log(error);
    }
  });
  //Se utiliza en home
  socket.on("mostrarProductosCarrito", async() => {
    // const mensaje = "falta escribir el codigo que traiga al carrito con los productos y los mande al home asi son mostrados";
      const carts = await cartModel.find();
      const cart = await cartModel.findById(carts[0]._id);
      socket.emit("productosEnCarrito", cart.productos);


  });

  socket.on("agregarAlCarrito", async (id) => {
    try {
      // console.log('id recibido: ', id)
      const producto = await productoModel.findById(id);
      // console.log("Producto ID: ", producto._id)
      // console.log("Producto cantidad: ", producto.cantidad)
      const carts = await cartModel.find();
      // console.log('ID del carrito: ', carts[0]._id)
      const cart = await cartModel.findById(carts[0]._id);
      // console.log('CARRITO: ', cart)
      // console.log('Productos del Carrito: ', cart.productos)
      // console.log('ID DEL PRODUCTO CON INDICE 0: ', cart.productos[0].id_prod._id)
      const indice = cart.productos.findIndex((prod) => prod.id_prod._id == id);
      console.log('Indice del producto a agregar: ', indice)
      if (indice != -1) {
        // console.log('cantidad del producto en el carrito: ', cart.productos[indice].cantidad)
        cart.productos[indice].cantidad = cart.productos[indice].cantidad + 1;
      } else {
        // console.log('agregando producto al carrito')
        cart.productos.push({
          id_prod: id,
          cantidad: 1,
        });
      }
      const respuesta = await cartModel.findByIdAndUpdate(carts[0]._id, cart);
      // console.log("respuesta de la actualizacion", respuesta);
      console.log('cart: ', cart)
      socket.emit("carritoActualizado", cart);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on('eliminarDelCarrito', async(productoId)=> {
    const carts = await cartModel.find();
    const cart = await cartModel.findById(carts[0]._id);
    const indice = cart.productos.findIndex((prod) => prod.id_prod._id == productoId);
    if (indice != -1) {
      // console.log('cantidad del producto en el carrito: ', cart.productos[indice].cantidad)
      if (cart.productos[indice].cantidad != 0){
        cart.productos[indice].cantidad = cart.productos[indice].cantidad - 1;
      } else {
        // const productoEliminado = await cartModel.findByIdAndDelete(productoId)
        console.log('producto con indice en 0')
        cart.productos.splice(indice, 1)
      }
    } else {
      console.log('el producto fue eliminado por completo')
    }
    const respuesta = await cartModel.findByIdAndUpdate(carts[0]._id, cart);
    socket.emit("carritoActualizado", cart);





  })
});

app.get("/static/chat", (req, res) => {
  res.render("chat", {
    css: "style.css",
    title: "Chat",
    js: "script.js",
  });
});

app.get("/static/home", async (req, res) => {
  res.render("home", {
    css: "home.css",
    title: "Home",
    js: "home.js",
  });
});

app.get("/static/crearProd", (req, res) => {
  res.render("realTimeProducts", {
    css: "real.css",
    title: "Form",
    js: "realTimeProducts.js",
  });
});

app.get("/login", (req, res) => {
  const { email, password } = req.body;
  req.session.email = emailreq.session.password = password;
  res.setDefaultAutoSelectFamily("Usuario logueado");
});
