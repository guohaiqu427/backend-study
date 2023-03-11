# Errors :
1.  ``` shell 
    Unsupported OP_QUERY command: insert. The client driver may require an upgrade
    reasoon:  mongoose version has become old or it has not been installed yet
    
    ```
    fix: npm i mongoose

# Getting Started 

1. what is node: 
    is a runtime envrioment for executing js code, node 
    is not a programming language, (therefore should not be compared with other backend languages.)
    is chrome's v8 engine embeded in C++


2. how node works:  
    non-blocking and async
    a signel thread is used to with multiple request.

3. install node : 
    check node version : 
        ```shell node -v 

    install node :
        ```shell nodejs.org 

4. execute a node js file in node envrionment.
    node filename.js

    function say (name) {
        console.log("hello", name)
    }
    say("vincent")

# Module System 

1. global object difference between v8 and node. 

    in brower: native methods and declared variables are all under the window object. 
               1. window.console.log()
               2. var a = "x" 
                
    in node:  variables declared in a file only contained in that file, unless exported. 
               var a = "x"
               console.log(global.a) // undefined

2. module: 
    in node, every file is a module. every node application has at least one module, the main module. 

    what properties does a module have? 
    console.log(module)

3. export: 
    how to export a variable or method, what does that mean for a module system in node? 

    how: 
        function log(message) {
            console.log(message)
        }
        module.exports.log = log
    
    what it means: 
        add a property to module object's export property.

4. load: 
    how to load a module? 
    use the "require" keyword 
    const logger = require("./logger.js")

5. what is a module wrapper function? 
    when node exectue a file, it wraps the code in an IIFE, that IIFE is a module wrapper function.

    in the IIFE, there are a few useful arguments passed in: 
    exports
    require
    module
    __filename
    __dirname

    (function(exports, require, module, __filename, __dirname){
        the module ...
    })()

6. built-in module - path module
    const path = require("path")
    const pathObj = path.parse(__filename)
    console.log(pathObj)
    ==> {
        root: '/',
        dir: '/Users/vincent/Documents/GitHub/node/backend/my-express',
        base: 'app.js',
        ext: '.js',
        name: 'app'
        }

7. built-in module - os module
    const os = require("os")

    const totalMemory = os.totalmem()
    const freeMemory = os.freemem()

    console.log(totalMemory, freeMemory )

    ==> 17179869184 4901146624

8. built-in module - fs module

    all the methods in the fs module has a sync and async variant. 
    always use the async one, reason: node is async non-blocking

    const fs = require("fs")
     
    sync: 
    const files = fs.readdirSync("./")
    console.log(files)
    ==> [ 'app.js', 'node.md' ]


    async: 
    for all the async method, take a fn as the last argument, 
    the last function(callback) is called when async is finished. 

    fs.readdir("./", function(err, files) {
        if(err) console.log("err ")
        console.log(files)
    })

    err and files, only one will have value

9. built-in module - events module
    waht is a event? 
    event is the core function of node, singal something has happened
    
    what is a EventEmitter ?
    It is a class, to use it, make a instance of the Class. 
    const EventEmitter = require("events")
    const emitter = new EventEmitter();



    what is the most common method used from EventEmitter?

        1. emit: raise an event 
            emitter.emit("messageLoaded", { args... })

        2. on (=== addListener): register a listener
            emitter.on("messageLoaded", function(args){
                console.log("listener called")
            })

        a. the order matters: on ==> emit

        b. pass arguments as object is better practise

        c. on and emit has to be registered on the same object instance

        d. when work with EventEmitter, extend the class 
    
    what is the common way of using EventEmitter? 
    extend a new class out of EventEmitter. 

    const EventEmitter = require("events")
    
    ```js
    ----
    class Logger extends EventEmitter {
        log ( message ) {
            console.log(message)
            this.emit("messageLoaded", {a: 1})
        }
    }
    module.exports = Logger 
    
    ----
    const Logger = require("./logger")
    const logger = new Logger() 

    logger.on("messageLoaded", (arg) => {
        console.log("listens emit from instance", arg)
    })

    logger.log ("calls emit function from instance")

10. built-in module - http 

    1. what method is used to create a server? 
    const server = http.createServer()
    servers created with http.createServer is a eventEmitter

    2. create a server that listens on port 3000 
    const server = http.createServer()
    server.listen(3000)

    3. base on the created server, when request "/", send a string to the client. 
       base on the created server, when request "/api/courses", send an array. 

    const server = http.createServer((req,res)=> {
        if(req.url === "/" ) {
            res.write ("Hello world")
            res.end()
        }
        if(req.url === "/api/courses" ) {
            res.write (JSON.stringify([1,2,3]))
            res.end()
        }

    })





# NPM : node package manager 

1. how to create a package.json
    npm init -y

2. check npm and node version 
    npm -v 
    node -v 

3. install a package gloablly 
    npm i -g  packagename@version

4. install nvm 
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

    //source line added
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

5. some command nvm commands: 
    1. list all node versions on this machine 
    2. list all node versions available 
    3. install a node version 
    4. use a different version of node 
    5. uninstall a version of node 
    6. locate .bashrc .zshrc
    7. open .zshrc


    1. nvm ls 
    2. nvm ls-remote
    3. nvm install <version>
    4. nvm use <version>
    5. nvm uninstall <version>
    6. ls -a
    7. open -e .zshrc

    
6. how require look for files 
    core modules >
    file or folder in the application  ("./") > 
    node_modules

7. how to use a installed package 
    const _ = require("underscore")
    const result = _.contains([1,2,3],1)
    console.log(result)

8. how to not monitor a file in git 
    in .gitignore file, specify path 

9. what does  ^1.10.0 and ~1.10.0 mean in package.json
    
    Major, Minor, Patch
    
    ^1.10.0 = 1.x
    ~1.10.0 = 1.10.x
    1.10.0 = 1.10.0

10. check deps versions of the packages installed
    npm list
    npm list --depth=0

11. say that you have install a libray called mongoose, how to see the meta data of mongoose 
    npm view mongoose
    npm view mongoose dependencies 
    npm view mongoose versions

12. how to find out the outdated packages in a project, and how to update them
    npm outdated
    npm update

13. how to update packages to the latest version.
    sudo npm i -g npm-check-updates
    ncu -u 
    npm i

14. how to install a dev dep. 
    npm i -D <package>

15. how to uninstall a package
    npm uninstall <package>
    npm un <package>

16. install a npm version 
    sudo npm i -g npm<version> 


# Express 

1. what is RESTfful 
    client talks to the server with http protocol 
    Representational State Transfer
    server exposes resources to the client with a simple meaningful address along with operations. 

2. install express and create a server that listens on port 3000
    npm i express
    const express = require("express")
    const app = express()
    app.listen(3000, ()=> {
        console.log("listening on port 3000")
    })

3. when port receive "/" send a string "hello world" to the client 
    app.get("/", (req, res)=> {
        res.send("hello world")
    })

4. when the port receives "/api/courses", send an array of numbers
    app.get("/api/courses", (req, res)=> {
        res.send([1,2,3])
    })

5. install nodemon and use nodemon to run file
    npm i -g nodemon
    // latest version of nodemon has some issue. use 1.14.11

6. export a ENVIRONMENT VARIABLE 
    export port=5000
    
7. get ENVIRONMENT VARIABLE port in node.js
    const port = process.env.PORT || 3000
    app.listen(port, ()=> {
        console.log(`listening on port ${port}...`)
    })

8. when the port receives "/api/course/1", how to get "1"
    app.get("/api/courses/:id", (req, res)=> {
        res.send(req.params.id)
    })

9. what is the difference between params and query string param?
    param : required    :id             req.params.id            
    query : optional    ?sortBy=name    req.query

10. create a get request and get by id request with the given data, if not found, return 404
    const courses = [
        { id: 1, name: "course1"},
        { id: 2, name: "course2"},
        { id: 3, name: "course3"},
    ]

    app.get("/api/courses", (req, res)=> {
        res.send(courses)
    })
    app.get("/api/courses/:id", (req, res)=> {
        const course = courses.find(item => item.id === parseInt(req.params.id))
        if(!course) return res.status(404).send("the course with given id is not found")
        res.send(course)
    })

11. create a post request to "/api/courses" with the given data, then test it with postman
    hint: enable parsing json object in the body of the quest: app.use(express.json())
          **by convention**, when post an object to server, should return that object in the body of response.  
    const courses = [
        { id: 1, name: "course1"},
        { id: 2, name: "course2"},
        { id: 3, name: "course3"},
    ]

    app.use(express.json())

    app.post("/api/courses", (req, res)=> {
        const course = {
            id: courses.length + 1, 
            name: req.body.name
        }
        courses.push(course)
        res.send(course)
    })

12. add simple input validation to a request. explain why add input validation. what is the status code for bad request. 

    if(!req.body.name || req.body.name.length < 3) {
        res.status(400).send("Name is required and should be minimum 3 characters long")
    }
    we should never trust what the user sends to the server. 
    400  

13. install Joi to validate
    npm i joi, //  the latest version of Joi has a different way of validate. 

    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

14. create a put request to update course to "/api/courses", explain the steps in a put request 


    1. find course, if not found ==> 404 : normally done in "/api/courses/:id" already
    2. validate course, if invalid ==> 400 : extract validation in a fn, also use this fn in post method
    3. update the course
    4. return to the client 


    app.put("/api/courses/:id", (req,res) => {
    const course = courses.find(item => item.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("the course with given id is not found")
    
    const result = validateCourse(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    course.name = req.body.name
    res.send(course)
    })

    function validateCourse(course) {
        const schema = {
            name: Joi.string().min(3).required()
        };
        return Joi.validate(course, schema)
    }

15. create a delete request to  "/api/courses", explain the setps in a delete request

    1. find course, if not found  ==> 404 
    2. delete 
    3. return the same couse   

    app.delete("/api/courses/:id", (req,res) => {
        const course = courses.find(item => item.id === parseInt(req.params.id))
        if(!course) return res.status(404).send("the course with given id is not found")

        const index = courses.indexOf(course)
        courses.splice(index, 1) 

        res.send(course)

    })


16. what is a middleware ? 

    middleware is a function that takes a request object &
                                  returns to another middleware function  or 
                                  return to the client. 
    experss is nothing but a bunch of middleware functions.

17. how to create a custom middleware function? 
    how to use a middleware function? 
    how to pass control to the next middleware function 

    function log(req,res,next) {
        console.log("loggging")
        next()
    }
    app.use(log)

18. built-in and third-party middlewares
    express.json()
    express.urlencoded()
    express.static()

    halmet()        // set various headers 
    morgain("tiny") // log requests

19. set and use ENVIRONMENT VARIABLES

    process.env.NODE_ENV
    app.get('env')  // default is development

    export NODE_ENV=production 

20. use third party library config to set configration and map ENVIRONMENT VARIABLES

    config 
        production.json 
        development.json 
        default.json 
        custom-environment-variables.json   // map ENVIRONMENT VARIABLES

21. use third party library debug

    npm i debug (3.1.0)

    const startupdebugger = require("debug")("app:startup")
    const dbDebugger = require("debug")("app:db")

    startupdebugger("startup")
    dbDebugger("connected to db")

    export DEBUG=app:startup
    export DEBUG=app:db
    export DEBUG=app:db, app:startup
    export DEBUG=
    export DEBUG=app:*


22. use third party library to render pug template to the client 

    npm i pug (2.0.0)
    app.set("view engine", "pug")   // set template engine
    app.set("view","./views") // opt, default

    views 
        index.pug 
    
    res.render("index", {var1: 'h', var2: "2"}) 

23. how to integrate a database(mongodb)
    1. install a driver for that database:  npm i mongodb
    2. require driver 
    3. connect to mongodb 
    4. use its APIs

24. file structures: <on going>

    middleware 
    routes 
    views 

25. exercise: express.Router()

    routes
        home
        courses 

    conost express = require("express")
    const router= express.Router()

    const courses = [...]

    router.get("/", ()=> {})
    router.get("/:id", ()=> {})
    router.post("/", ()=> {})
    router.put("/:id", ()=> {})
    router.delete("/:id", ()=> {})


    const courses = require("./routes/courses")
    const home = require("./routes/home")

    app.use("/", home)
    app.use("/api/courses", courses)


# Mongoose

0. what is mongoose
    mongoose is build on top of mongoDB
    mongoDB is a Document DataBase

1. install mongodb on mac 
    https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/

    a. use brew to install 
        install home brew => brew.sh (done)

    b. brew install mongodb ==>  mongod --version db version v6.0.4


    c. create a directory for mongodb to store data (different in mac os)
       sudo mkdir -p /data/db 
       sudo chown -R `id -un` /data/db

    d. find out where data is stored: 
        ps -xa | grep mongod
            /usr/local/opt/mongodb-community/bin/mongod  ==> data
            --config /usr/local/etc/mongod.conf          ==> config file


    e. run mongodb as a macos service
        brew services start mongodb-community
        brew services stop mongodb-community
        brew services restart mongodb-community

    f. Connect and Use MongoDB : mongosh

    download mongoDB compass : give the port

2. install mongoose 5.0.1  / 7.0.1

    npm i mongoose

3. connect to mongodb server with mongoose 

    const mongoose = require("mongoose")

    mongoose.connect("mongodb://localhost/playground")  
        .then(()=> { console.log( " connected" ) })
        .catch((err)=> {console.log(" could not connect ")})
    
    only connect to mongodb once in the index.js. 

4. what is a Schema ? 
    define the shape of document within a collectiion in MongoDB
    it is specific to mongoose, not part of mongodb
    it is a class

5. define a schema 
    const courseSchema = new mongoose.Schema({
        name: String, 
        author: String, 
        tags: [String],
        date: {type:Date, default:Date.now},
        isPublished: Boolean
    })

6. complie a schema into a model
    const Course = mongoose.model("Course", courseSchema)
                                   collection name, schema for that collection

7. create a new instance with the Course class and SAVE it to mongodb database
    async function createCourse(){
        const course = new Course({
            name: "Mongoose", 
            author: "Guohai", 
            tags: ["Backend", "Node", "full-stack"],
            isPublished: false
        })
        const result = await course.save()
        console.log(result)
    }

    createCourse()

8. Querying document, GET all courses from the data base, 
                      GET course with the name Mongoose, 
                      add query options to the result (limit to 2, sort by name, only select the name and isPublished property)

    async function getCourses (){
        // const result = await Course.find()
                        .limit(2)
                        .sort({name:1})
                        .select({name:1, tags:1})

        const result = await Course.find({name: "Mongoose"})
        console.log(result)
    }
    getCourses()

9. Comparison operator in mongodb 
    eq      equal 
    ne      not equel 
    gt      greater than
    gte     greater than and equal to 
    lt      less than 
    lte     less than and equel to 
    in      in
    nin     not in     

    .find({price: {$gt: 10, $lte:20} })    find items that price is greater than 10  and less than or equal to 20 
    .find({price: {$in: [ 10, 15, 20] } }) find items that price is 10 , 15, or 20

10. Logic operator in monogodb
    .find()
    .or([{author: "Guohai"},{isPublished: true}])
    .and([{author: "Tom"},{isPublished: false}])

11. regular experssion in query
    .find({author: /regExp/})

12. GET total item count from a query. 
    use the count method
    .find()
    .count()

13. pagination 

    const pageNumber = 1
    const pageSize = 10 

    .find()
    .skip((pageNumber - 1 ) * pageSize)
    .limit(pageSize)

14. explain two ways of UPDATE in mongoose and give example
    1. query -> modifiy  approch 
    2. update directly 

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
        const result = await Course.update({_id: id}, {     // or use : findByIdAndUpdate(id, {...})
            $set: {
                author: "Mosh", 
                isPublished: false
            }
        })
        console.log(result)
    }
    updateCourse("640b3c1fc14b4a7a9bf5af79")

15. Delete document from the data base
    const course = await Course.deleteOne({_id: id})
    const course = await Course.deleteMany({isPublished: false})
    const course = await Course.findByIdAndRemove(id)

# Data validation 

1. Mongoose validation concepts 

    a. validation only meaningful in monogoose, mongodb does not care. 

    b.Joi is to validate data sent from the client via REST api is valid 
      Mongoose built-in validators are used to make sure data send to the database is valid 

    c. CRUD operations in mongoose are async, when validation fails need to handle error same as other promises.

2. built-in validators 

    required : name: {type: String, required: true}
                                    required: function(){ return this.isPublished} // can not use arrow function here

    type: [String, Number, Boolean ....] 
    String. minlength: 
    String.  maxlength: 
    String. match: 
    String. enum: ["a","b","c"] : match one of those strings
    String.lowercase
    String.uppercase
    String.trim

    common.get  : gets called when get data from the database
    common.set  : gets called when set data in the database

3. custom validators 
    tags: {
        type: Array, 
        validate: {
            validator: function(v) {
                return v && v.length > 0
            }
            message: "error message: couse should have at least one tag"
        }
    }

4. async custom validator 
Todo: 


5. Error handing when validation fails (2 ways)

    const courseSchema = new mongoose.Schema ({
        name: { type: String, required: true },
        author: String
    })
    const Course = new mongoose.model("Course", courseSchema )

    a. method 1:

    async function createCourse(){
        const course = new Course({
            // error: not giving couse name
           author: "Guohai" 
        })

        try {
            const result = await course.save()
            console.log(result)
        }
        catch(ex){
            console.log(ex.message)
        }

    b. method 2:

    async function createCourse(){
        ** mongoose design flaw. that course.validate return a promise VOID instead of boolean,
        ...
        try {
           const result =  await course.validate() // short

           course.validate((err)=> { // long 
            if(err) {
                //err handling logic
            }
           }) 

        }
        catch(ex){
            console.log(ex.message)
        }
    }

    b. method2: 


6. Validation error display 
    catch(ex){
        for(field in ex.errors) {
            console.log(ex.errors[field].message)
        }
    }


# Model Relation

1. Relate Documents Approches:
    1. Normalization   :   References   | CONSISTENCY

        let author : {
            name: "Vincent"
        }

        let course: {
            author : "id"
        }
    2. DeNormalization :   Embeded Documents    | PERFORMANCE
        let course : {
            author: {
                name : "Vincent"
            }
        }
    3. Hybrid   : Reference to entire, Embed a few 
        let author = {
            name : "Vincent", 
            job: "developer",
            from: "SH"
        }

        let course = {
            author: {
                id: "reference"     // REFFERENCE
                name: "Vincent"     // EMBED
            }
        }

2. NORMALIZATION: reference documents : reference objectID and doc

    const courseSchema = new mongoose.Schema({
        author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: ‘Author’ 
        }
    })

3. NORMALIZATION: Poplute References
    populate referenced data using poplulate() & include / exclude properties from referenced document

    const course = await Course
        .find()
        .poplulate("author", "name -id")
        .select("name author")

4. DeNormalization: embed schema 
    
    1. the document to be embeded 
        const authorSchema = new mongoose.Schema({
            name: String, 
            bio: String
        })
        const Author = mongoose.model("Author", authorSchema)

    2. embed the document
    const courseSchema = new mongoose.Schema({
        name: String,
        author: authorSchema
    })
    const Course = mongooose.model ("Course", courseSchema)
   
    3. embed arry of documents: [document]
        const courseSchema = new mongoose.Schema({
            name: String
            authors: [authorSchema]
        }) 
        const Course = mongoose.model("Course", courseSchema)



5. DeNormalization : update embeded document  / delete
    sub doc Can not be save on their own, save in context of its parent.
    
    1. method1: query -> update
        const course = await Course.findById(courseId); 
        course.author.name = ‘New Name’; 
        course.save();

    2. method2: update directly  / delete
    const course = await Course.update({_id: courseId},{
        $set: {                                         // $unset {
            "author.name" : "john"                              "author" : ""
        }                                                   }
    })

    3. update the embeded array type document
        const course = await Course.findById(courseId); 
        course.author.push(author) 
        course.save();

    4. remove and iteme from the array type document
        const course = await Course.findById(courseId); 
        const author =  course.authors.id(authorId) 
        author.remove()
        course.save()


6. DeNormalization : create data with embeded documents 

    1. object
    async function createCourse( name , author ) {
        const course = new Course({
            name, 
            author,
        })
    }
    createCourse("namePassed", new Author({name: "Vincnet"})) 

    2. [ object ]
    async function createCourse( name , authors ) {
        const course = new Course({
            name, 
            authors,
        })
    }
    createCourse("namePassed", [new Author({name: "Vincnet"}), new Author({name: "Vincnet"})]) 

7. NPM packages to deal with Model relations (2-phase commit & objectid)
    1. Fawn
        usage: deals with 2-phase commit, 
        reason: 
            when perform CRUD opertions with embeded documents, we need to: 
            1- perform CRUD operation on embeded document 
            2- perfrom CRUD operation on the parent document. 

            with 2-phase commit approach to ensure that: 
            only 2 tasks are both successful, then update the data base. 
        use: 
            npm i fawn

            try {
                await new Fawn.Task() 
                .task1()
                .task2() 
                .run()
            }
            catch (ex) { 
            // At this point, all operations are automatically rolled back 
            }

    2. joi-objectid
        usage: validate user inputed objectid.
        reason: mongodb does not care if the objectID is valid or not, it will query the document with the user provided id,
                if its not valid id, will throw error, therefore, we need to validate the use provided id.
        use: 
            npm i joi-objectid

            const Joi = require("joi")
            Joi.objectId = require("joi-objectid")(Joi)

            Joi.objectId().required()

        implementation: 
            extract joi-objectid to global, so that the entire app could use it. 

# Authentication & Authorization 

