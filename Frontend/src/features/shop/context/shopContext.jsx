import React from "react";
import  productsAPI  from "../api/request";

const initialState = {
    products: [],
    loading: false,
    error: null,
}

 const ShopContext = React.createContext(initialState)

 export function ShopProvider({children}) {
    const [products,setproducts] = React.useState();
    const [loading,setloading] = React.useState(false);
    const [error,seterror] = React.useState(null);

    const fetchProducts = async () => {
        setloading(true);
        try {
            const data = await productsAPI.getProducts();
            setproducts(data);
            setloading(false);
        } catch (error) {
            seterror(error);
            setloading(false);
        }
    }

    React.useEffect(() => {
        fetchProducts() 
    },[])

     return (
         <ShopContext.Provider value={{products,loading,error}}>
             {children}
         </ShopContext.Provider>
     )
 }

 export const useShop = () => React.useContext(ShopContext);

 export default ShopContext;