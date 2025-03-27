const express= require('express');
const app=express();
const fs= require('fs');
const morgan = require('morgan');
const path=require('path');

const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});

//usig morgan
//app.use(morgan('combined',{stream:accessLogStream}));
app.use(morgan('dev'));
app.use(morgan('tiny'));

//sample routes
app.get('/test',(req,res)=>{
    res.json({ message: 'Morgan logging test' });
})

app.get('/error',(req,res)=>{
    res.status(500).json({error:'something went wrong'});
})


app.listen(3000,()=>console.log('Server running on 3000....'));