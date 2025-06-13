const express = require("express");
const app = express();
let port = 8080;
const path = require("path");

app.use(express.urlencoded({extended:true}));

app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs");

app.set( express.static(path.join(__dirname,"public")));

let posts =[{
    username: "apnacollege",
    content: " i love coding!"
},
{
    username: "sahilmahajan",
    content: "coding !"
},
{
    username: "rohitmahajan",
    content: " cricket!"
}
]

app.get("/posts",( req, res) =>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new",( req, res) =>{
    res.render("new.ejs");
});
app.post("/posts",( req, res) =>{
    let {username, content}= req.body;
    posts.push({username, content});
    res.redirect("/posts");

});
app.listen(port,() =>{
    console.log(`app listining on port ${port}`);
});