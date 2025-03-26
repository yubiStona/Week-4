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

async function grouping(){
    try{
        mongoose.connect('mongodb://localhost:27017/testDB');
        console.log('MongoDB connected');

        const users= await User.aggregate([
            {
                $group:{_id:'$department',avgAge:{$avg:'$age'}}
            }
        ]);
        console.log("Grouped user by department and average age: ",users);

    }catch (error) {
        console.error('Error paginating users:', error);
      } finally {
        mongoose.connection.close();
      }
}
grouping();