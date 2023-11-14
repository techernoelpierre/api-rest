const mongoose = require("mongoose");
const fs = require("fs");

const postSchema = mongoose.Schema(
    {
        title: {
            type:   String,
            required: true,
        },
        description: {
            type:   String,
            required: true,
        },
        likers: {
            type: [String],
        },
        images: [{
            title: {
                type: String,
                default: "null"
            },
            image: {
                type: String,
                default: "null"
            }
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("post", postSchema)