const mongoose = require("mongoose")
const express = require("express")
const config = require("config")
const error = require("./middleware/error")
const users = require("./routes/users")
const auth = require("./routes/auth")
const courses = require('./routes/courses')
const logger = require("./middleware/logger")

const app= express()


  
// throw new Error ("failed during startup")

// const p = Promise.reject(new Error("Promise Error"))
// p.then(()=> {console.log("Done")})

if(!config.get("jwtPrivateKey")) {
    console.error("FATAL, jwt private is not set")
    process.exit(1)
}

mongoose.connect("mongodb://127.0.0.1:27017/playground",{ useNewUrlParser: true })
    .then(()=> {console.log("connected")})
    .catch((err)=> {console.log("not connected", err)})


app.use(express.json())
app.use("/api/users", users)
app.use("/api/auth", auth)
app.use("/api/courses", courses)
app.use(error)


const port = process.env.PORT || 3000 
app.listen(port, ()=> { console.log(`listening on port ${port}`) })


