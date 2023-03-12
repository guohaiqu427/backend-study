const mongoose = require("mongoose")
const express = require("express")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")


const router = express.Router() 

router.post("/", [auth, admin] ,async (req,res) => {
    const courseSchema = new mongoose.Schema({
        name: String, 
        author: String, 
        tags: String,
        date: {type:Date, default:Date.now},
        isPublished: Boolean
    })
    const Course = mongoose.model("Course", courseSchema)
    
    const course = new Course({
        name: req.body.name, 
        author: req.body.author, 
        tag: req.body.tag,
        isPublished: true
    })
    const result = await course.save()
    res.send(result)
   
}) 

module.exports = router