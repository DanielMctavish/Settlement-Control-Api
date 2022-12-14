const mongoose = require("mongoose");


const taskprofissionalSchema = new mongoose.Schema({
    name: String,
    deadline: String,
    dependency: String,
    financialDependence: Number
})

module.exports = mongoose.model("profissionaltasks", taskprofissionalSchema)