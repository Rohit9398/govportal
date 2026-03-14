<<<<<<< HEAD
const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({

title:String,
department:String,
description:String

})

=======
const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({

title:String,
department:String,
description:String

})

>>>>>>> d5e34b406f5009b7deb13789129db66613892f74
module.exports = mongoose.model("Service",serviceSchema)