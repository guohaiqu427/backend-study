const mongoose = require("mongoose")
const express = require("express")

const users = require("./routes/users")
const auth = require("./routes/auth")

const app= express()

mongoose.connect("mongodb://127.0.0.1:27017/playground",{ useNewUrlParser: true })
    .then(()=> {console.log("connected")})
    .catch((err)=> {console.log("not connected", err)})

app.use(express.json())
app.use("/api/users", users)
app.use("/api/auth", auth)


const port = process.env.PORT || 3000 
app.listen(port, ()=> { console.log(`listening on port ${port}`) })
