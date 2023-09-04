const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: {
        street: String,
        city: String,
    },
});

module.exports = mongoose.model("User", userSchema);
