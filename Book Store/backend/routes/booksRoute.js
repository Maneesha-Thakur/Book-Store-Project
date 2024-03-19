import express from 'express'
import {Book} from '../models/bookModel.js'
const router = express.Router()

router.post('/',async(request,response)=>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear 
        ){
            return response.status(400).send({error:"All fields are required"})
        }

        const newBook ={
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook)

        return response.status(500).send({ book })

    } catch (error) {
        console.log(error.message)
        response.status(500).send({error:error.message})
    }
})



router.get('/',async (request,response)=>{
    try {
        const books = await Book.find({})

        return response.status(200).send({
            count:books.length,
            data:books
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({error:error.message})
    }
})



router.get('/:id',async (request,response)=>{
    try {
        const {id} = request.params
        const book = await Book.findById(id)

        return response.status(200).send({book
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({error:error.message})
    }
})


router.put('/:id',async (request,response)=>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({error:"All fields are required"})
        }
        const {id}= request.params
        const result= await Book.findByIdAndUpdate(id,request.body)
     if(!result){
        return response.status(404).send({error:"Book not found"})
     }
     return response.status(200).send({message:"Book updated succesfully"})

    } catch (error) {
        console.log(error.message)
        response.status(500).send({error:error.message})
    }
})

// Delete

router.delete('/:id',async (request,response)=>{
try {
    const {id} = request.params
    const result = await Book.findByIdAndDelete(id)

    if(!result){
        return response.status(404).send({error:"Book not found"})
    }
    return response.status(200).send({message:"Book deleted successfully"})
    
} catch (error) {
    console.log(error.message)
    response.status(500).send({error:error.message})
}
})

export default router