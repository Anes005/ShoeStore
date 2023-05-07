import productController from "./product.controller.js";
import userController from "../user-mgmt/user.controller.js";
import { Comment, Product } from "./product.model.js";
class CommentController{
    async getCommentsByProductId(Id){
        try {
            const query = Product.findById(Id).populate({
                path: 'Comments',
                populate: {
                    path: 'UserId',
                    select: 'Username'
                },
                Options: { sort: { "upvotes": -1 } }
            })
            const product = await query.exec()
            return product.Comments
        } catch (err) {
            throw {
                code: 1,
                message: "cannot find product with id " + Id
            }
        }
    }
    async createComment({Comment, ProductId, UserId}){
        try {
            const product = await productController.getProductById(ProductId)
            const user = await userController.getUserById(UserId)
            const newComment = new Comment({
                text: Comment,
                user: user._id,
            })
            const doc = await newComment.save()
            product.Comments.push(doc._id)
            await product.save()
        } catch (err) {
            switch (err.code) {
                case 1:// product not found
                case 2:// user not found
                    throw err
                default:
                    throw {
                        code: 3,
                        message: "Error while creating comment"
                    }
            }
        }
    }

    async updateCommentByID(user,productId, commentId, update) {
        const product = await Product.findById(productId)
        if (!product) {
            throw {
                code: 1,
                message: `Product with id ${productId} not found.`
            }
        }
        try {
            const oldComment = await Comment.findById(commentId)
            if(!oldComment){ 
                throw {
                    code : 2,
                    message : "Comment doesnt exist"
                }
            }
            if(oldComment.user.toString() !== user._id){
                throw {
                    code : 3,
                    message: "Unauthorized to update this comment"
                }
            }
            const newComment =await Comment.findOneAndUpdate(commentId, update, {new: true})
            return newComment
        } catch (err) {
            if (err.code) throw err
            throw {
                code: 2,
                message: `Error while updating comment with id ${id}` 
            }
        }
    }
    async deleteCommentById(user,productId, commentId) {
        const product = await Product.findById(productId)
        if (!product) {
            throw {
                code: 1,
                message: `Product with id ${productId} not found.`
            }
        }
        const oldComment = await Comment.findById(commentId)
        if(!oldComment){
             throw {
                code : 2,
                message : "Comment doesnt exist"
            }
        }
        if(oldComment.user.toString() !== user._id){
            throw {
                code : 3,
                message: "Unauthorized to delete this comment"
            }
        }
        try {
            product.Comments = product.Comments.filter((comment) => comment._id !== commentId)
            await product.save()
        } catch (err) {
            if (err.code) throw err
            throw {
                code: 2,
                message: "Error while removing comment from product"
            }
        }
        try {
            await Comment.findByIdAndDelete(commentId)  
        } catch (err) {
            throw {
                code: 3,
                message: "Error while deleting comment"
            }
        }
    }
}
export default new CommentController()
        