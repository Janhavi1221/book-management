const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    BookTitle:{
        type:String,
        required:true
    },
    BookAuthor:{
        type:String,
        required:true
    },
    PublishDate:{
        type:Date,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:false
    },
},{timestamps:true})

 const book= mongoose.model("book",bookSchema);
 module.exports=book;