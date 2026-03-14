<<<<<<< HEAD
const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({

userId:String,
serviceId:String,
name:String,
email:String,
document:String,
status:{type:String,default:"Pending"}

})

=======
const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({

userId:String,
serviceId:String,
name:String,
email:String,
document:String,
status:{type:String,default:"Pending"}

})

>>>>>>> d5e34b406f5009b7deb13789129db66613892f74
module.exports = mongoose.model("Application",applicationSchema)