import React from "react";

const initialState = {
    products: [],
    loading: false,
    error: null,
    total: {
        amount : 0,
        currency: 'USD'
    }
}

 export const CartContext = React.createContext(initialState);

export function CartProvider({children}) {
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [total, setTotal] = React.useState({
        amount : 0,
        currency: 'USD'
    });
    const AddToCart = (product) => {
        const prodectInCart = products.find(item => item.id === product.id);
        if(prodectInCart){
            prodectInCart.quantity += 1;
            setProducts([...products]);
        }else{
            setProducts([...products, {...product, quantity: 1}]);
        }
    }
    const getProductsCount = () => {
       const count = products.reduce((acc, item) => acc + item.quantity, 0);
       if(count >= 100){
        return '99+'
       } 
       return count;
    }
     const getTotalPrice = () => {
        const totalPrice = products.reduce((acc, item) => {
            const priceInUSD = item.price.find(peice => peice.currency === 'USD');
            return acc + priceInUSD.value * item.quantity    
        }, 0);
        return totalPrice;
    }



    return <CartContext.Provider value={{
        products,
        loading,
        error,
        total,
        actions: {
            AddToCart,
            getProductsCount,
            getTotalPrice
        } 
    }}>
        {children}
        
        </CartContext.Provider>
}
export const useCart = () => React.useContext(CartContext);
export default CartContext;
