const mongoose = require("mongoose");
const { schema } = require("./user.model");

const urlSchema = new mongoose.Schema(
    {
        original_url: {
            type: String,
            required: true,
            unique: true,
        },
        short_url: {
            type: String,
            required: true,
            unique: true,
        },
        hits: {
            type: Number,
            default: 0,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        expierd: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;