const mongoose = require("mongoose");


const objectiveSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model("objective", objectiveSchema)