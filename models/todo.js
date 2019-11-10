const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    item: String,
    priority: Number,
    description: String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
});

module.exports = mongoose.model("Todo", todoSchema);