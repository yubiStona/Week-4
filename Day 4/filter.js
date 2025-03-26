const mongoose = require('mongoose');
// Define a schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  department: String,
  status: String
});

// Create a model
const User = mongoose.model('User', userSchema);

async function filterUsers() {
    try{
        mongoose.connect('mongodb://localhost:27017/testDB');
        console.log('MongoDB connected');
        const users= await User.find({
            $and:[
                {age:{$gt:25}},
                {age:{$lte:40}},
                {age:{$gt:26}},
                {age:{$lt:36}},
                {firstName:{$eq:'John'}},
                {lastName:{$ne:'Smith'}},
                {department:{$in:['IT','Finance']}},
                {department:{$nin:['HR','Marketing']}}
            ],
            $or:[
                {status:'active'},
                {age:{$gte:35}}
            ]
        })
        console.log('Filtered Users:', users);
    }catch(error){
        console.error('Error filtering users:', error);
    }finally{
        mongoose.connection.close();
    }
}
console.log('performing filter operation....')
filterUsers();