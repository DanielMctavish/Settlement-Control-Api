const mongoose = require("mongoose");


const balanceSchema = new mongoose.Schema({
    value: Number
})

module.exports = mongoose.model("balance", balanceSchema)