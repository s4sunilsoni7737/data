const  express = require("express");
const app = express();
const port = 8081;
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true })); 

app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(), // insted of 1a manul id we use this
        username:"sunil",
        desc:"i love coding",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMGgdNxrapJo4tdBlsnbOmmxSzOy35Dr9Eg3-5pfP7XkdQrm18b7Ipbe2XhrIReIUojAg&usqp=CAU",
        prof_img:"https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-171058.jpg?semt=ais_hybrid"
    },
    {
        id:uuidv4(),
        username:"mohit",
        desc:"Hey! i am new here",
        img:"https://plus.unsplash.com/premium_photo-1677545182067-26ac518ef64f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        prof_img:"https://c8.alamy.com/comp/EDNK18/a-happy-smiling-cartoon-character-mans-face-EDNK18.jpg"
    },
    {
        id:uuidv4(),
        username:"golu",
        desc:"i love eating",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy5r3oKQ94pCQKd-8IbTWvroeCs8wvwDhzWg&s",
        prof_img:"https://cdn3.vectorstock.com/i/1000x1000/63/42/young-man-face-cartoon-vector-19116342.jpg"
    },
];

app.get("/threads",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/threads/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/threads",(req,res)=>{
    console.log("working post req");
    let {username,desc,img,prof_img} = req.body;
    let id = uuidv4();
    posts.push({username,desc,img,prof_img,id});
    res.redirect("/threads");
    console.log(req.body);
})

app.get("/threads/:id",(req,res)=>{
    let{id} = req.params;
    
    let postt = posts.find((p)=>id === p.id);
    res.render("show.ejs",{postt});
    
})
app.get("/threads/:id/edit",(req,res)=>{
    let{id} = req.params;
    
    let postedit = posts.find((p)=>id === p.id);
    res.render("edit.ejs",{postedit});
    
})
app.patch("/threads/:id",(req,res)=>{
    let{id} = req.params;
    let newDesc = req.body.desc;
//     let postIdx=posts.findIndex((p)=> id === p.id)
//    posts[postIdx].desc = newDesc;
    

let postedit = posts.find((p)=>id === p.id);
postedit.desc=newDesc;
    res.redirect("/threads");
})

app.delete("/threads/:id",(req,res)=>{
    let{id} = req.params;
    // let newDesc = req.body.desc;
    posts= posts.filter((p)=>id !== p.id);
    console.log("delete req working!")
    res.redirect("/threads");
})



app.listen(port,()=>{
    console.log("listing on port",port);
})