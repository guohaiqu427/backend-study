const mongoose = require("mongoose")
const express = require("express")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const router = express.Router() 
const asyncMiddleware = require("../middleware/async")

const courseSchema = new mongoose.Schema({
    name: String, 
    author: String, 
    tags: String,
    date: {type:Date, default:Date.now},
    isPublished: Boolean
})
const Course = mongoose.model("Course", courseSchema)



router.post("/", [auth, admin] , asyncMiddleware(async (req,res) => {
    const course = new Course({
        name: req.body.name, 
        author: req.body.author, 
        tag: req.body.tag,
        isPublished: true
    })
    throw new Error("HIIIIII")
    const result = await course.save()
    res.send(result)

}))

module.exports = router