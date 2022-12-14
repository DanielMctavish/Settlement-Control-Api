const objectiveRoute = require("express").Router();

objectiveRoute.get("/",(req,res)=>{
    res.json({
        msg:"rota de objetivo acessada"
    })
})

module.exports = objectiveRoute;