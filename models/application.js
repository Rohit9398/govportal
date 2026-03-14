const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({

userId:String,
serviceId:String,
name:String,
email:String,
document:String,
status:{type:String,default:"Pending"}

})

module.exports = mongoose.model("Application",applicationSchema)