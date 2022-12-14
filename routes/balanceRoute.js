const balanceRoute = require("express").Router();

balanceRoute.get("/",(req,res)=>{
    res.json({
        msg:"rota de saldo acessada"
    })
})

module.exports = balanceRoute;