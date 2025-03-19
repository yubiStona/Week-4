const cron = require('node-cron');
const mongoose = require('mongoose');

async function dataFetch() {
    try {
        await mongoose.connect('mongodb://localhost:27017/bankDB')
            .then(() => console.log("MongoDB connected"))
            .catch((err) => console.log("error connecting mongoDB", err));
        const db = await mongoose.connection.db;
        cron.schedule('* * * * * *',async ()=>{
            console.log("fetching lates user data....")
            const usersData= await db.collection('customers').find().toArray();
            const custData=await db.collection('cust').find().toArray();
            console.log(usersData);
            console.log(custData);
        })
    } catch {
        console.error("error inserting data", err);
    }
}
console.log("cron job started");
dataFetch();