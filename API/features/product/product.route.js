import express from 'express';
import ProductController from './product.controller.js';
import {authMiddleware as auth, isAdmin }from '../../middlewares/auth.js';
import CommentController from './CommentController.js';

const router = express.Router();

 router
.route('/')
//Get All the Products 
.get(async (req, res,next) => {
    try{
        const products = await ProductController.getAllProducts()
        res.send(products)
    }catch{
        switch(err.code){
            case 1:
                res.status(500).send({success: false, message: err.message})
            default:
                next(err)     
    }
}
})
//Create Produuct Route
.post (auth , isAdmin, async (req, res,next) => {
    try{
        const productInfo = req.body
        const product = await ProductController.createNewProduct(productInfo)
        res.send(product)
    }catch{
        switch (err.code) { 
            case 1:
                return res.status (400).send({success: false, message: err.message}); 
              default:
                next (err);
        }
   }
})


// /products/:id
router
.route('/:id')
//Get Product by ID
.get(async (req, res,next) => {
    try{
        const product = await ProductController.getProductById(req.params.id)
        res.send(product)
    }catch (err){
        switch (err.code) { 
            case 1:
                return res.status (404).send({success: false, message: err.message}); 
              default:
                next (err);
        }
    }
})
// products/:id/comments
router
.route('/:id/comments')
// Create Comment on product with id :id
.get(async (req, res,next) => {
    try{
        const comments = await ProductController.getCommentsByProductId(req.params.id)
        res.send(comments)
    }catch{
        switch (err.code){
            default:
                next(err)
        }
    }
})
.post(auth, async (req, res,next) => {
    try{
        await CommentController.createNewComment({
            Comment: req.body.Comment,
            ProductId: req.params.id,
            UserId: req.user._id
        })
        res.status(201).send({success: true})
    }catch{
        switch (err.code){
            case 1:
            case 2:
                return res.status(400).send({success: false, message: err.message})
            default:
                next(err)
        }
    }
})
router
.route('/:id/comments/:commentId')
.patch(auth, async (req, res,next) => {
    try{
        const newUpdatedComment = await CommentController.updateCommentById(req.params.commentId, req.body)
        res.send(newUpdatedComment)
    }catch{
        switch (err.code){
            case 1:
                return res.status(404).send({success: false, message: err.message})
            case 2:
                return res.status(500).send({success: false, message: err.message})
            case 3:
                return res.status(401).send({success: false, message: err.message})
            default:
                next(err)
        }
    }
})
.delete(auth, async (req, res,next) => {
    try{
        await CommentController.deleteCommentById(req.params.commentId)
        res.send({success: true})
    }catch{
        switch (err.code){
            case 1:
            case 2:
                return res.status(404).send({success: false, message: err.message})
            case 3:
                return res.status(401).send({success: false, message: err.message})
            default:
                next(err)
        }
    }
})

export default router;
