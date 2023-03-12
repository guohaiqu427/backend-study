const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/playground",{ useNewUrlParser: true })
    .then(()=> {console.log("connected")})
    .catch((err)=> {console.log("not connected", err)})

const courseSchema = new mongoose.Schema({
    name: String, 
    author: String, 
    tags: [String],
    date: {type:Date, default:Date.now},
    isPublished: Boolean
})
const Course = mongoose.model("Course", courseSchema)

async function createCourse(){
    const course = new Course({
        name: "Node v7", 
        author: "Guohai", 
        tags: ["Backend", "Node", "V8"],
        isPublished: true
    })
    const result = await course.save()
    console.log(result)
}

createCourse()