const mongoose=require("mongoose");

const dbConnect=async()=>{
   
       await mongoose.connect("mongodb+srv://janhavibhosale321_db_user:OTXKyRvhrk5Th0Ic@diploma.ll7nk4t.mongodb.net/?appName=diploma")
       .then(()=>{
            console.log("database connected");
       })
       .catch((err)=>{
        console.log(err);
       })
    }

module.exports=dbConnect;