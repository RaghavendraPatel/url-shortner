const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: String,
        password: {
            type: String,
            required: true,
        },
        urls: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Url",
            },
        ],
        total_urls: {
            type: Number,
            default: 0,
        },
        total_hits: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;