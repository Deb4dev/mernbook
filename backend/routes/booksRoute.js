import express from "express"
import { Book } from "../models/bookModel.js"

const router  = express.Router()

router.post("/",async(req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear ){
            return res.status(400).send({message:'Send all required fields: title, author, publishYear',})
        }
        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear,
        }

        const book = await Book.create(newBook)
        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message : error.message})
    }
})

router.get("/" ,async(req,res)=>{
    try {
        
        const books = await Book.find({})
        if(books.length === 0) return res.status(400).send({message: "no books added to library"})
        return res.status(200).send({
            count : books.length,
            data : books
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message : error.message})
    }
})
//single book
router.get("/:id" ,async(req,res)=>{
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        if(book === "" || book === null) return res.status(400).send({message: "nope don't have this book"})
        return res.status(200).send(book)

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message : error.message})
    }
})

router.put("/:id",async(req,res)=>{
    try {
        if(!req.body.title ||
            !req.body.author||
            !req.body.publishYear
        ){
            return res.status(400).send({message:"you need to give every param"})
        }
    
        const {id} = req.params
    
        const book = await Book.findByIdAndUpdate(id,req.body)
        return (!book)?res.status(404).send({message: "book not found"}):res.status(200).send({message : "book updated"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Book.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  })

  export default router