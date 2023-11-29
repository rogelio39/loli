export const generateUserErrorInfo = (user) =>{
    return ` Uno o mas campos son invalidos o incorrectos.
    Informacion requerida:
    *Nombre: debe ser String, mensaje recibido ${user.nombre}
    *Apellido: debe ser String, mensaje recibido ${user.apellido}
    *Email: debe ser String, mensaje recibido ${user.email}
    `
}