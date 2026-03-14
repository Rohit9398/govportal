const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({

title:String,
department:String,
description:String

})

module.exports = mongoose.model("Service",serviceSchema)