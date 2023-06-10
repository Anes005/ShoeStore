import axios from 'axios';

const cartAPI = {
   AddToCart : async ({ name, image, value,quantity }) => {
        const response= await axios.post('https://localhost:3000/cart',{
        name,
        image,
        value,
        quantity,
            });
        return response.data;
    },
    RemoveToCart : async ({ name, image, value,quantity }) => { 
        const response= await axios.delete('https://localhost:3000/cart',{
        name,
        image,
        value,
        quantity,
            });
        return response.data;
    },
    ModifyToCart : async ({ name, image, value,quantity }) => {
        const response= await axios.put('https://localhost:3000/cart',{
        name,
        image,
        value,
        quantity,
            });
        return response.data;
    } 

}
export default cartAPI;