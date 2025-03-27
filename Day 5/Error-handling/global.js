const express = require('express');
const app = express();

//route that throw error
app.get('/product/:id',(req,res,next)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        const error= new Error("Invalid Product ID");
        error.status=400;
        return next(error);

    }
    if(id==0 || id<0){
        const error= new Error("product not found with that ID");
        error.status=400;
        return next(error);
    }

    const product={
        id,
        product:`product${id}`
    }
    res.json({product});
})


//global error hadnling middleware
app.use((err,req,res,next)=>{
    const status=err.status || 500;
    res.status(status).json({error:{
        message:err.message,
        status:status
    }})
})

app.listen(3000,()=>{console.log('Server running on 3000......')});