import express from "express"
import bodyParser from "body-parser"
import {dirname} from "path"
import {fileURLToPath} from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get("/", (req, res) => {
    let name = "Tumelo"
    res.render(__dirname + "/views/index.ejs", {posts: posts})
})

app.get("/new", (req, res) => {
    res.render(__dirname + "/views/new.ejs")
})

app.post('/', (req, res) => {
    posts.push({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        createdAt: new Date().toLocaleTimeString() 
    })
    res.redirect("/")
})

app.get("/edit/:id", (req, res) => {
    res.render(__dirname + "/views/edit.ejs", { post: posts[req.params.id], index: req.params.id } )
})

app.post("/edit", (req, res) => {
    posts[req.body.index] = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        createdAt: req.body.createdAt
    }
    
    res.redirect("/")
})

app.get("/delete/:id", (req, res) => {
    posts.splice(req.params.id, 1)    
    res.redirect("/")
})

app.listen(port, () => {
    console.log("App is running on port " + port)
})

const posts = [
    {
        author: "Tumelo Lutaka",
        title: "Welcome to my Blog!",
        content:"Welcome to Tumelo's Blog! Here, you'll find a mix of insights and experiences in web development." + 
        " Just as Angela Yu's bootcamp has been a guiding light for many, this blog aims to share practical tips and" +
         " real-world lessons. So, join me as we dive into the world of Node.js, Express, and EJS, and explore the" + 
         " art of coding together.",
        createdAt: new Date().toLocaleTimeString() 
    }
]