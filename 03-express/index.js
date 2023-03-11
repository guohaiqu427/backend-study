const express = require("express")
const Joi = require("joi")

const app = express()
app.use(express.json())

const courses = [
    { id: 1, name: "course1"},
    { id: 2, name: "course2"},
    { id: 3, name: "course3"},
]

app.get("/", (req, res)=> {
    res.send("hello world!!!")
})
app.get("/api/courses", (req, res)=> {
    res.send(courses)
})
app.get("/api/courses/:id", (req, res)=> {
    const course = courses.find(item => item.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("the course with given id is not found")
    res.send(course)
})
app.post("/api/courses", (req, res)=> {

    const result = validateCourse(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    // if(!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send("Name is required and should be minimum 3 characters long")
    // }
    const course = {
        id: courses.length + 1, 
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})
app.put("/api/courses/:id", (req,res) => {
    // 1. find course, if not found ==> 404 
    const course = courses.find(item => item.id === parseInt(req.params.id))
    if(!course) return  res.status(404).send("the course with given id is not found")
    // 2. validate course, if invalid ==> 400 
    const result = validateCourse(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }
    // 3. update the course
    course.name = req.body.name
    // 4. return to the client 
    res.send(course)

})
app.delete("/api/courses/:id", (req,res) => {
    const course = courses.find(item => item.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("the course with given id is not found")

    const index = courses.indexOf(course)
    courses.splice(index, 1) 

    res.send(course)

})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema)

}


const port = process.env.PORT || 3000
app.listen(port, ()=> {
    console.log(`listening on port ${port}...`)
})