const mongoose = require("mongoose");

const articleObj = {
    title: { type: String, required: true},
    createdAt: { type:Date, default: Date.now},
    description: {type:String, required: true},

}



const mongooseSchema = mongoose.Schema(articleObj);



module.exports = mongoose.model("Article", mongooseSchema);