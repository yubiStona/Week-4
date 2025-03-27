    const express=require('express');
    const {body,validationResult}=require('express-validator');

    const app= express();

    //middleware to parse JSON bodies
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get('/',(req,res)=>{
        res.json({message:'hellooo'})
    })


    //post route for data valllidation
    app.post('/user',[
        body('email').isEmail().withMessage('must be a valid email'),
        body('username')
        .isLength({min:3, max:20})
        .withMessage('username must  be 3-20 characters'),
        body('age')
        .isInt({min:18})
        .withMessage('Age must be a integer greater than >=18')
        .toInt(),
    ],(req,res)=>{
        // Log the raw request body for debugging
        console.log('Raw request body:', req.body);
        const errors=validationResult(req);
        //if not process
        if(!errors.isEmpty()){
            console.log('Validation errors:', errors.array());
            return res.status(400).json({errors:errors.array()});
        }

        //if valid
        const{email,username,age}=req.body;
        console.log('Valid data received:', { email, username, age });
        res.json({
            message:'user created successfully',
            user:{email,username,age}
        })
    })

    app.listen(3000,()=>console.log('Server running on port 3000'));