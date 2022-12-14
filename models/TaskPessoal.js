const mongoose = require("mongoose");


const taskpessoalSchema = new mongoose.Schema({
    name: String,
    deadline: String,
    dependency: String,
    financialDependency: String,
    _idUser: String
})

module.exports = mongoose.model("personaltasks", taskpessoalSchema)