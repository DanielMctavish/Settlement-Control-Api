const pessoalRouter = require("express").Router()
const pessoalModel = require("../models/TaskPessoal")

pessoalRouter.get("/", (req, res) => {
    res.send("Landing Pessoal Router")
})

pessoalRouter.post("/newtask", async (req, res) => {
    console.log(new Date(Date.now()).toLocaleDateString());
    

    if(!req.session.loginAuthConfirmation){
        return res.send("não é possível adicionar esta tarefa, usuário está deslogado")
    }

    try {
        if (!req.body.name) {
            return res.json({ msg: "nome inválido ou inexistente" })
        }
        if (!req.body.deadline) {
            return res.json({ msg: "É necessário determinar um prazo pra esta tarefa" })
        }

        await pessoalModel.create({
            name: req.body.name,
            deadline: req.body.deadline,
            dependency: req.body.dependency,
            financialDependency: req.body.financialDependency,
            _idUser: req.session.userId 
        })

        res.json({ msg: "tarefa pessoal criada com sucesso" })
        return

    } catch (error) {
        return res.json({ msg: "houve um erro ao tentar criar esta tarefa: ", error })
    }

})

module.exports = pessoalRouter;