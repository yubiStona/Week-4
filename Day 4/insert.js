const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/testDB', {
});

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

// Insert sample users
const insertUsers = async () => {
  try {
    const users = await User.insertMany([
        { firstName: 'John', lastName: 'Doe', age: 30, department: 'IT', status: 'active' },
        { firstName: 'Jane', lastName: 'Smith', age: 25, department: 'HR', status: 'inactive' },
        { firstName: 'Mike', lastName: 'Brown', age: 35, department: 'Finance', status: 'active' },
        { firstName: 'Sara', lastName: 'Wilson', age: 28, department: 'Marketing', status: 'active' },
        { firstName: 'Tom', lastName: 'Clark', age: 40, department: 'IT', status: 'inactive' },
        { firstName: 'Emma', lastName: 'Taylor', age: 45, department: 'Finance', status: 'active' },
        { firstName: 'Noah', lastName: 'Harris', age: 22, department: 'IT', status: 'active' },
        { firstName: 'Olivia', lastName: 'Martin', age: 50, department: 'HR', status: 'inactive' },
        { firstName: 'Liam', lastName: 'Thompson', age: 27, department: 'Marketing', status: 'active' },
        { firstName: 'Sophia', lastName: 'Anderson', age: 33, department: 'Finance', status: 'inactive' }
      ]);

    console.log('Users inserted:', users);
  } catch (error) {
    console.error('Error inserting users:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Call function to insert users
insertUsers();
