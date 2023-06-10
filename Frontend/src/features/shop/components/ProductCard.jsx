import React from "react";
import {StarIcon} from'@heroicons/react/24/solid';
import { useCart } from "../../cart/context/cartContext";
import { useAuth } from "../../auth/context/AuthContext";


function ProductCard(product) {
 const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i < Math.round(rating); i++) {
        stars.push(<StarIcon className="w-4 text-yellow-500" />);
        }
    return stars;
    }
    const priceInUSD = product.price.find(peice => peice.currency === 'USD');
    
    const {actions}=useCart();
    const {isLoggedIn}=useAuth
    return (
    <div className="p-2">
        <div className="h-90 w-full">
            <img src={product.image} alt={product.name}  className="objct.contain w-full h-full max-h-full max-w-full"/>
        </div>
        <h3 className="my-4 text-xl">{product.name}</h3>
        <div className="flex items-center gap-3">
            <span>
                <ul className="flex space-x-1">
                    {renderStars(product.rating).map((star, index) => <li key={index}>{star}</li>)}
                </ul>
            </span> <span className="text-slate-500">({product.rating})</span>
        </div> 

        <div className="flex justify-between">
         <p className="text-3xl font-bold">
            {priceInUSD.value} $
         </p>
        </div>

        <button disabled={!isLoggedIn} className="bg-slate-900 text-white px-4 py-2 rounded-md mx-2 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200 ease-in disabled:bg-slate-200 disabled:text-slate-400" onclick={(e)=>{
         e.preventDefault();
         actions.addToCart(product)
         }}>Add to cart</button>
       
    </div>
    ) }
export default ProductCard 