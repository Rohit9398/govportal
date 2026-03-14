const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* MongoDB Atlas Connection */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

/* Models */
const User = require("./models/user");
const Service = require("./models/service");
const Application = require("./models/application");

/* File Upload Setup */
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage: storage });

/* Register */
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.send("User Registered Successfully");
  } catch (error) {
    res.send("Registration Error");
  }
});

/* Login */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res.redirect("/dashboard.html");
    } else {
      res.send("Invalid Email or Password");
    }
  } catch (error) {
    res.send("Login Error");
  }
});

/* Get Services */
app.get("/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.send("Error fetching services");
  }
});

/* Apply for Service */
app.post("/apply", upload.single("document"), async (req, res) => {
  try {
    const { userId, serviceId, name, email } = req.body;

    const application = new Application({
      userId,
      serviceId,
      name,
      email,
      document: req.file.filename
    });

    await application.save();

    res.send("Application Submitted Successfully");
  } catch (error) {
    res.send("Application Error");
  }
});

/* Server Port */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1:27017/govportal")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

const User = require("./models/user")
const Service = require("./models/service")
const Application = require("./models/application")

// file upload setup
const storage = multer.diskStorage({

destination:"uploads",

filename:(req,file,cb)=>{
cb(null,Date.now()+"_"+file.originalname)
}

})

const upload = multer({storage:storage})

// register
app.post("/register", async (req,res)=>{

const {name,email,password} = req.body

const newUser = new User({name,email,password})

await newUser.save()

res.send("User Registered Successfully")

})

// login
app.post("/login", async (req,res)=>{

const {email,password} = req.body

const user = await User.findOne({email,password})

if(user){
res.redirect("/dashboard.html")
}
else{
res.send("Invalid Email or Password")
}

})

// services
app.get("/services", async (req,res)=>{

const services = await Service.find()

res.json(services)

})

// apply service
app.post("/apply", upload.single("document"), async (req,res)=>{

const {userId,serviceId,name,email} = req.body

const application = new Application({

userId,
serviceId,
name,
email,
document:req.file.filename

})

await application.save()

res.send("Application Submitted Successfully")

})

app.listen(3000,()=>{
console.log("Server running")
})