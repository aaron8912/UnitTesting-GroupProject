const mongoose = require("mongoose");

const articleObj = {
    title: { type: String, require: true},
    createdAt: { type:Date, default: Date.now},
    description: {type:String, require: true}
}

const mongooseSchema = mongoose.Schema(articleObj);

module.exports = mongoose.model("Article", mongooseSchema);