const mongoose = require("mongoose");


const financialSchema = new mongoose.Schema({
    reserve: String,
    value: Number
})

module.exports = mongoose.model("financial", financialSchema)