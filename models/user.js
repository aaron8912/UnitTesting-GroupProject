const mongoose = require("mongoose");

const plm = require("passport-local-mongoose");

const dataSchemaObj = {
    username: {type: String, require: true},
    password: { type: String, require: true},
};

var mongooseSchema = mongoose.Schema(dataSchemaObj);

mongooseSchema.plugin(plm);

module.exports = mongoose.model("user", mongooseSchema);