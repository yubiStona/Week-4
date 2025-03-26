const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  department: String,
  status: String
});

// Create a model
const User = mongoose.model('User', userSchema);

async function matching(){
    try{
        mongoose.connect('mongodb://localhost:27017/testDB');
        console.log('MongoDB connected');
        const users=await User.aggregate([
            {$match:{status:'active'}}
        ])

        console.log('matched data: ',users);
    }catch (error) {
        console.error('Error Matching  users data:', error);
      } finally {
        mongoose.connection.close();
      }
}
matching();