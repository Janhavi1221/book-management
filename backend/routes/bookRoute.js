const express=require("express")
const {handleBookController, handleBookListController, handleFindBookController, handleUpdateBookController, handleDeleteBookController} =require("../controller/bookController");
const router=express.Router()

router.get("/",(req,res)=>{
    res.send("Routing on book route page");
})
//addbook-title author
router.post("/add",handleBookController);
//getallbooks
router.get("/getbooks",handleBookListController);
//findone
router.post("/findbook",handleFindBookController);
//update
router.put("/update/:id",handleUpdateBookController);
//delete
router.delete("/delete/:id",handleDeleteBookController);
module.exports=router;