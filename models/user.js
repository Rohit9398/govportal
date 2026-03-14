<<<<<<< HEAD
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

name:String,
email:String,
password:String

})

=======
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

name:String,
email:String,
password:String

})

>>>>>>> d5e34b406f5009b7deb13789129db66613892f74
module.exports = mongoose.model("User",userSchema)