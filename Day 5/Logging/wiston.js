    const express = require('express');
    const app= express();
    const winston=require('winston');

    const logger = winston.createLogger({
        level:'info',
        format:winston.format.json(),
        transports:new winston.transports.Console()
    })

    // middleware to log incoming request
    app.use((req,res,next)=>{
        logger.info(`Incoming request:${req.method} ${req.url}`);
        next();
    })

    app.get('/test',(req,res)=>{
        logger.info('Processing /test request');
        res.json({ message: 'Winston logging test' });
    })

    app.get('/error',(req,res,nex)=>{
        const error= new Error('error for testing purpose');
        logger.error(`Error occurred: ${error.message}`);
        res.status(500).json({Error:error.message});
    })


    app.listen(3000,()=>console.log("Server Running on port 3000"));