import Cart from "./Cart.model.js";
import {Product} from "../product/product.model.js";
class CartController {
    async addProductToCart(userID,productsIDs) {
        const products = await Product.find({_id: {$in: productsIDs}})
        if (products.langth ==0){
            throw {
                code: 1, 
                message: "No products found"
            }
        }
        let cart;
        try {
            cart =await this.getCart(userID)
        } catch (error) {
            if (error.code === 1){
                cart = new Cart({
                    owner: userID,
                    items: {}
                })
            }else{
                throw{
                    code: 2,
                    message: error.message
                }
            }
        }
        products.forEach(product => {
            if (cart.items.get(product._id) !==undefined){
             // increment quantity of the product if it already exist
                const obj = cart.items.get(product._id)
                const newObj = { product: obj.product, _id: obj._id,quantity: obj.quantity + 1}
                cart.items.set(product._id,newObj)
            }else{
                // if it doesn't exist then we add it
                const obj ={
                    product: product._id,
                    quantity: 1
                }
                cart.items.set(product._id,obj)
            }
        });
        try {
            const doc = await cart.save()
            return doc
        } catch (error) {
            throw{
                code: 3,
                message: "Error while saving the cart"
            }
        }
    }
    // Get cart
    async getCart(userID) {
        try{
            const cart = await Cart.findById(userID)
            if (!cart){
                throw{
                    code: 1,
                    message: "User doesn't have a cart"
                }
            }
            return cart
        }catch(error){
            throw{
                code: 2,
                message: "Error while fetching cart for user with id: " + userId
            }
        }

    }

    async updateProductQuantity(userID,productID,quantity) {
        let cart;
        try {
            cart = await this.getCart(userID)
        }
        catch(error){
            throw{
                code: 1,
                message: error.message
            }
        }
        const productCart = cart.items.get(productID)
        if (!productCart){
            throw{
                code: 2,
                message: "Product not found in cart"
            }
        }
        const product = await Product.findById(productID)
        if (!product){
            throw{
                code: 3,
                message: "Product not found"
            }
        }
        cart.items.set(productID,{
           _id: productCart._id,
           product: productCart.product,
           quantity: Math.max(1,Math.floor(Number(quantity)))  
        })
        try {
            const doc = await cart.save()
            return doc
        }
        catch(error){
            throw{
                code: 4,
                message: "Error while saving cart"
            }
        }
    }
}
export default new CartController();
