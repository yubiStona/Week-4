const mongoose= require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    department:String,
    status:String
},{
    toJSON:{virtuals:true}
});

//adding virtual properties:
//for full name
userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`;
});

//for age 
userSchema.virtual('ageGroup').get(function() {
    if(this.age<30) return 'Young';
    if(this.age<=49) return 'middle-aged';
    return 'senior citizen';
});

//virtual properties for status of the user;
userSchema.virtual('statusDesc').get(function(){
    return this.status=='active'? 'currently-active':'currently-inactive'

});
//creating a modal 
const User=mongoose.model('User',userSchema);


//function to get the values of vitrual properties
async function showData() {
    try{
        mongoose.connect('mongodb://localhost:27017/testDB');
        const users= await User.find();
        console.log('datas of virtual properties')
        users.forEach(user=>{
            console.log({
                fullName:user.fullName,
                ageGroup:user.ageGroup,
                status:user.statusDesc,
                originalData:user.toObject(),  
            });
        })
    }catch(error){
        console.error('Error showing virtual properties', error);
    }finally{
        mongoose.connection.close();
    }
}
showData();