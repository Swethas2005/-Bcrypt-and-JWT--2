let express = require("express")

let BookModel = require("../models/library")

let bookRouter = express.Router();

bookRouter.get("/getBook",async (req,res)=>{
    try {
        let bookData = await BookModel.find()
        res.status(200).json({
            message:"Data received successfully",
            data:bookData
        })
    } catch (error) {
        res.status(400).send("something went wrong while getting the data")
    }
})

bookRouter.post("/addBook", async (req,res)=>{
   try {
    let {author,title,publishedDate,genre,pages}= req.body;

    let bookData = new BookModel({
        author,
        title,
        publishedDate,
        genre,
        pages
    })
    await bookData.save()
    res.status(201).send("book created successfully")

   } catch (error) {
    res.status(400).send("something went wrong while adding the data")
   }
})

bookRouter.put("/update-book/:bookId", async (req,res)=>{
    try {
     let {author,title,publishedDate,genre,pages}= req.body;

     let newData= {author,title,publishedDate,genre,pages};

     let id = req.params.bookId

     await BookModel.findByIdAndUpdate(id,newData,{new:true})
     
     res.status(201).send("book updated successfully")
 
    } catch (error) {
     res.status(400).send("something went wrong while adding the data")
    }
 })

bookRouter.patch("/update-book/:bookId", async (req,res)=>{
    try {

     let id = req.params.bookId

     await BookModel.findByIdAndUpdate(id,req.body)
     
     res.status(201).send("book updated successfully")
 
    } catch (error) {
     res.status(400).send("something went wrong while adding the data")
    }
 })

bookRouter.delete("/delete-book/:bookId", async (req,res)=>{
    try {

     let id = req.params.bookId

     await BookModel.findByIdAndDelete(id)
     
     res.status(201).send("book deleted successfully")
 
    } catch (error) {
     res.status(400).send("something went wrong while adding the data")
    }
 })

 module.exports = bookRouter