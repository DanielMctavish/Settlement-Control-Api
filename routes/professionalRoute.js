const professionalRoute = require("express").Router();
const professionaltask = require("../models/ProfessionalTask")

professionalRoute.post("/newprofessionaltask", async (req, res) => {
    if(!req.session.loginAuthConfirmation){
        return res.send("usuário não está logado!")
    }

    try {
        if (!req.body.name) {
            return res.json({
                msg: "nome inválido ou inexistente"
            })
        }
        if (!req.body.deadline) {
            return res.json({
                msg: "é necessário colocar um prazo na sua tarefa"
            })
        }

        await professionaltask.create({
            name: req.body.name,
            deadline: req.body.deadline,
            dependency: req.body.dependency,
            financialDependence: req.body.financialDependence,
            _idUser: req.session._idUser
        })

        return res.send("tarefa profissional criado com sucesso")
    } catch (error) {
        return res.json({ msg: "não foi possível adicionar esta tarefa" })
    }
})


module.exports = professionalRoute;