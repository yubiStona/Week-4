const express= require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const User= require("./models/user");
const methodOverride=require('method-override');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));

//connect to mongoDB
mongoose
    .connect("mongodb://localhost:27017/userDB",{
    })
    .then(()=>console.log("Connected to MongoDB"))
    .catch((err)=>console.log("MongoDB connection error: ",err))

//Home route-DIsplay form 
app.get("/",(req,res)=>{
    res.render("form");
})

//add user post request
app.post("/users",async (req,res)=>{
    try{
        const {name,email,age}=req.body;
        const newUser=new User({name,email,age});
        await newUser.save();
        res.redirect("/users");
    }catch(error){
        res.status(500).send("Error saving data. "+error.message)
    }
});

//view users--get request 
app.get("/users",async (req,res)=>{
    try{
        const users=await User.find();
        res.render("table",{users});
    }catch(error){
        res.status(500).send("Error fetching data."+error.message);
    }
})
//route to deleting users
app.delete("/users/:id",async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.redirect("/users");
    }catch(error){
        res.status(500).send("error deleting.."+error.message)
    }
})

//route to update users
app.put("/users/:id",async (req,res)=>{
    try{
        const {name,email,age}=req.body;
        await User.findByIdAndUpdate(req.params.id,{name,email,age});
        console.log("update success");
        res.redirect("/users");
    }catch(error){
        res.status(500).send("error updateing data"+error.message);
    }
})

//route to update users data
app.get("/users/:id/edit",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.render("edit",{user});
    }catch(error){
        res.status(500).send("Error fetching data"+error.message);
    }
})

app.listen(3000,()=>console.log('server is running on 3000'))

