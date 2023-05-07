import React from "react";
import { useCart } from "../context/cartContext";

function CartProductList() {
    const { products } = useCart();
    return (
        <div className="flex flex-col gap-4">
            {products.map((product) => {
                return <CartProductList/>
            })}
        </div>
    );
}
export default CartProductList;