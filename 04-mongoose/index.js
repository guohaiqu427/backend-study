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

// async function createCourse(){
//     const course = new Course({
//         name: "Node v8", 
//         author: "Guohai", 
//         tags: ["Backend", "Node", "V8"],
//         isPublished: true
//     })
//     const result = await course.save()
//     console.log(result)
// }

// createCourse()


async function updateCourse(id){
    const course = await Course.findById(id)
    if(!course) return 
    // course.isPublished = true, 
    // course.author = "Ioan"
    course.set({
        isPublished: true,
        author: "other"
    })
    const result = await course.save()
    console.log(result)
}
updateCourse("640b3c1fc14b4a7a9bf5af79")

async function updateCourse(id){
    const result = await Course.update({_id: id}, {
        $set: {
            author: "Mosh", 
            isPublished: false
        }
    })
    console.log(result)
}
updateCourse("640b3c1fc14b4a7a9bf5af79")