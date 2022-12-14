const registRoute = require("express").Router();
const nodemailer = require("nodemailer");
const userModel = require("../models/Users")
const cors = require("cors")
global.confirm = ""
global.userEmail = ""
global.cryptoKey = ""


registRoute.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    registRoute.use(cors());
    next();
});



registRoute.post("/", async (req, res) => {//usuário deve digitar apenas o seu email para confirmação
    userEmail = req.body.email;
    cryptoKey = require('crypto').randomBytes(16).toString('hex');
    console.log(userEmail);

    var transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: 'settlementcontrolapp@gmail.com',
            pass: 'vomyhusavcvqeadq'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    await transport.sendMail({
        from: '<noreplay@daniel.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Cadastro Settlement Control", // Subject line
        text: "link de confirmação", // plain text body
        html: `
        <!DOCTYPE html>
        <html lang="pt-br">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>settlement-control</title>
            <style>
                #email-body{
                    position: absolute;
                    background-color: rgb(45, 45, 45);
                    color: white;
                    font-family: sans-serif;
                    font-size: 16pt;
                }
                #title{
                    font-size: 12pt;
                    font-weight: lighter;
                    letter-spacing: 6px;
                    margin-bottom: 4vh;
                }
            </style>
        </head>
        
        <body>
            <div id="email-body">
                <h2>Obrigado por se cadastrar!</h2>
                <div id="title">Settlement Control</div>
                clique no link para confirmar sua inscrição:
                http://localhost:5100/registration/${cryptoKey}
            </div>
        </body>
        
        </html>
        `, // html body
    });

    res.json({
        MSG: "teste rota de resgistro",
        key: "http://localhost:5100/registration/" + cryptoKey,
        email: req.body.email,
    })
})

registRoute.get("/:authenticate", (req, res) => {
    res.render("createUser")
    confirm = req.params.authenticate
})

registRoute.post("/authemail", async (req, res) => {
    //criação de nome de usuário e senha.......................................................

    if (!req.body.name) {
        return res.json({ msg: "usuário inválido" })
    }
    if (req.body.pass != req.body.confirmPass) {
        return res.json({ msg: "senhas não conferem!" })
    }


    if (confirm == cryptoKey) {
        await userModel.create({
            name: req.body.name,
            email: userEmail,
            password: req.body.pass
        }).then(() => {
            console.log("usuário criado com sucesso");
            confirm = "";
            cryptoKey = "";
            return res.redirect("https://tarefassc.netlify.app/")
        })
        
    } else {
        console.log("confirmação:",cryptoKey);
        console.log("confirmação do email:",confirm);
        confirm = ""
        cryptoKey = "";
        res.send("o token expirou ou já não é mais válido")
    }

    //------------



})




module.exports = registRoute;