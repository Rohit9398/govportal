const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();

/* Middleware */
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
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
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
    console.log(error);
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
    console.log(error);
    res.send("Login Error");
  }
});

/* Get Services */
app.get("/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.log(error);
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
      document: req.file ? req.file.filename : null
    });

    await application.save();

    res.send("Application Submitted Successfully");

  } catch (error) {
    console.log(error);
    res.send("Application Error");
  }
});

/* Server Port (Render Compatible) */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});