const { error } = require('console');
const express = require('express');
const app= express();

//route with error
app.get('/user/:id',(req,res)=>{
    try{
        const id= parseInt(req.params.id);
        if(isNaN(id)){
            throw new Error('Invalid ID: please provide a number as ID');
        }
        if(id<0){
            throw new Error("ID cannot be a negative value");
        }
        const user={
            id,
            name:`User${id}`
        }
        res.json(user);
    }catch(error){
        res.status(400).json({error:error.message});
    }
});


app.get('*',(req,res)=>{
    const error=new Error('Invalid request!');
    res.status(400).json({error:error.message});
})

app.listen(3000,()=>console.log("Server is running on 3000"));