import express from 'express';
import {authMiddleware as auth} from '../../middlewares/auth.js';
import cartController from './cart.controller.js';

const router = express.Router();

// /cart/ 
router
.route('/')
// Route to get the cart of the user
.get(auth, async (req,res) => {
    try {
        const cart = await cartController.getCart(req.user._id)
        return res.send(cart)
    } catch (error) {
        switch (error.code) {
            case 1:
            case 2:
                return res.status(400).send({success: false, message: error.message})
            default:
                next(error)
        }
    }
})
// /cart/products
router
.route('/products')
// Route to add products to the cart
.post(auth, async (req,res) => {
    try{
        const productsToAdd = req.body.productIDs
        const cart = await cartController.addProductsToCart(req.user._id, productsToAdd)
        return res.send(cart)
    } catch (error) {
        switch (error.code) {
            case 1:
                return res.status(404).send({success: false, message: error.message})
            default:
                next(error)
        }
    }
})
.put(auth, async (req,res) => {
    try {
        const {productId,quantity} = req.body
        const NewCart = await cartController.updateProductQuantity(req.user._id, productId, quantity)
        res.send(NewCart)
    } catch (error) {
        switch (error.code) {
            case 1:
                return res.status(400).send({success: false, message: error.message})
            default:
                next(error)
        }
    }
})
export default router;