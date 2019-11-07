const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    item: String,
    priority: Number,
    description: String
});

module.exports = mongoose.model("Todo", todoSchema);