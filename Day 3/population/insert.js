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

//sample data insetion 
async function insertData() {
    try {
        await mongoose.connect('mongodb://localhost:27017/testDB');
        console.log('MongoDB connected');

        const profile1 = await Profile.create({ bio: 'Full Stack Developer', website: 'https://yubrajdhungana.com.np' });
        const profile2 = await Profile.create({ bio: 'pull Stack Developer', website: 'https://ankit.com.np' });

        const author1 = await Author.create({ name: 'yubi', age: 24,profile:profile1._id});
        const author2 = await Author.create({ name: 'ankit', age: 30, profile:profile2._id });

        const post1 = await Post.create({ title: 'Learning Node.js', content: 'Node.js provide runtime for javascript', author: author1._id });
        const post2 = await Post.create({ title: 'Learning MongoDB', content: 'MongoDB is nosql database', author: author2._id });

        console.log("data insertion succesful");
    } catch (error) {
        console.log('Error during data insertion:', error);
    }
}

insertData();
