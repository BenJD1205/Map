require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')
const app = express()

//middleware
app.use(express.json())


mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
 })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

 app.use("/api/pins",pinRoute)
 app.use("/api/users",userRoute)

app.listen(5000, () => {
    console.log("Backend server is running")
})