import nodemailer from 'nodemailer'
import 'dotenv/config'

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ohanian.florencia@gmail.com",
        pass: "yqhexatdzbutrqfz", //Contraseña app gmail
        authMethod: "LOGIN",
        },
});

export const sendRecoveryMail = (email, recoveryLink) => {
    const mailOptions = {
        from: " ohanian.florencia@gmail.com",
        to: email,
        subject: "Link para restaablecer contraseña",
        text:`Haga click en el siguiente enlace para restablecer su contraseña: ${recoveryLink}`
    }
    transport.sendMail(mailOptions, (error, info)=> {
        if(error)
        console.log("Error al enviar email:", error)
    else 
    console.log("Email enviado correctamente")
    })
    }
