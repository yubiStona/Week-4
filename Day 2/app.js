const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/bankDB',{})
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("error connecting mongoDB", err));

//defining schema 
const customerSchema=new mongoose.Schema({
        _id:Number,
        name:String,
        bal:Number,
});

const Customer=mongoose.model('Customer',customerSchema);

//insert data first
async function insertData() {
    const sampleCustomers=[
        { _id: 1, name: 'John Doe', bal: 500 },
        { _id: 2, name: 'Jane Smith', bal: 1000 },
    ]
    
    try{
        await Customer.insertMany(sampleCustomers);
        console.log("sample data inserted");

    }catch(err){
        console.error("error inserting data",err);
    }
}



//function to update balances with transactions
async function transferFund() {
    const session = await mongoose.startSession();
    session.startTransaction();//session started

    try{
        
        await Customer.updateOne(
            {_id:1},
            {$inc:{bal:-100}},
            {session},
        );

        await Customer.updateOne(
            {_id:2},
            {$inc:{bal:100}},
            {session},
        )
        
        //commit session transaction if everything successful
        await session.commitTransaction();
        console.log("fund transferred successfully");
    }catch(error){
        await session.abortTransaction();
        console.log("transaction failed",error);
    }finally{
        session.endSession();
    }


}
insertData();   
transferFund();
