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

async function paginateData(page=1,limit=3){
    try{
        mongoose.connect('mongodb://localhost:27017/testDB');
        console.log('MongoDB connected');

        //number of documents to skip
        const skip=(page-1)*limit;

        //fetch paginated data
        const users=await User.find().skip(skip).limit(limit).sort({age:1});

        const totalDocument=await User.countDocuments();    
        const totalPages=Math.ceil(totalDocument/limit);

        //pagination metadata
        const pageInfo={
            currentPage:page,
            limit:limit,
            totalDocument:totalDocument,
            totalPages:totalPages,
            hasNextPage:page<totalPages,
            hasPrevPage:page>1
        }

        console.log('paginated users data:',users);
        console.log('pagination data info: ',pageInfo);


    }catch (error) {
        console.error('Error paginating users:', error);
      } finally {
        mongoose.connection.close();
      }
}
paginateData(2,3);