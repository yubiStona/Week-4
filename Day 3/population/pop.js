const mongoose = require('mongoose');

 const profileSchema = new mongoose.Schema({
    bio:String,
    website:String
 })

const authorSchema = new mongoose.Schema({
    name: String,
    age: Number,
     profile:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Profile'
        }
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
});

const Profile = mongoose.model('Profile',profileSchema);
const Author = mongoose.model('Author', authorSchema);
const Post = mongoose.model('Post', postSchema);

async function getValue() {
    try {
        await mongoose.connect('mongodb://localhost:27017/testDB');
        console.log('MongoDB connected');
        console.log('fetching................')
        const posts = await Post.find().populate('author').exec();
        console.log(posts);
    } catch (error) {
        console.log('Error fetching data:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}
getValue();