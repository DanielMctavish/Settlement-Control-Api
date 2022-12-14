const express = require("express")
const mongoose = require("mongoose")
const app = express();
const bodyParser = require('body-parser')
const registRoute = require("./routes/registrationRoute")
const pessoalRoute = require("./routes/pessoalRoute")
const professionalRoute = require("./routes/professionalRoute")
const balanceRoute = require("./routes/balanceRoute")
const objectiveRoute = require("./routes/objectiveRoute")
const handlebars = require("express-handlebars")
const cors = require("cors")
const Users = require("./models/Users")
global.authLogin = false;


app.use("/", express.static("public"));
//handlebars config---------------------------------------------
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

//config-session---------------------------------------

const session = require('express-session')
const oneHour = (1000 * 60) * 60

app.use(session({
    secret: "f6a5f56as45d4a5s6d5asf32a123s451",
    saveUninitialized: true,
    cookie: { maxAge: oneHour },
    resave: true
}))

app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Rotas...........................................

app.get("/", (req, res) => {
    console.log(authLogin);
    res.send("primeira rota")
})



app.post("/login", async (req, res) => {
    if (authLogin) {
        return res.send("usuário já está logado")
    }

    if (!req.body.email) {
        return res.send("email inválido")
    }

    if (!req.body.password) {
        return res.send("senha inválida")
    }

    const user = await Users.findOne({ email: req.body.email })

    if (!user) {
        return res.send("usuário não cadastrado!")
    }

    if (req.body.password != user.password) {
        return res.send("senha incorreta")
    } else {
        authLogin = true;
        req.session.userId = user._id;
        req.session.authLogin = authLogin;
        return res.json({
            msg: "logado",
            authenticateLogin: authLogin,
            userName: user.name
        })
    }
})

app.get("/logout", (req, res) => {
    authLogin = false
    res.send(authLogin)
})


app.use("/registration", registRoute)
app.use("/pessoal", pessoalRoute)
app.use("/professional", professionalRoute)
app.use("/balance", balanceRoute)
app.use("/objective", objectiveRoute)


//mongodb-connect....................................................


mongoose.connect("mongodb+srv://daniel-admin:1laRqTxm2K7vy4j6@settlementcluster.m0v0nqj.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("conectado ao banco de dados 'settlementDb' com sucesso");
}).catch((err) => {
    console.log(err);
})

const port = 5100;
app.listen(port, () => {
    console.log("conectado ao servidor com sucesso PORTA: ", port);
})






