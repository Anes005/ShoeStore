import { Link, Outlet } from "react-router-dom";
import Footer from "./compnents/footer.jsx";
import {HomeIcon,ShoppingCartIcon,BuildingStorefrontIcon} from '@heroicons/react/24/solid'
import {useAuth} from "../features/auth/context/AuthContext.jsx"
import {useCart} from "../features/cart/context/cartContext.jsx"

function RootLayout(props) {

  const {isLoggedIn,actions: authActions}=useAuth()
  const {actions: cartActions}=useCart()

  const cartCount = cartActions.getProductsCount();
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-black px-24 py-6 gap-4 flex flex-col justify-center md:gap-0 md:flex-row md:justify-between items-center">
       <div className="flex space-x-4 justify-center items-center ">
        <img className="w-20 h-15" src="logo.png"/>
        <h1 className="text-4xl font-bold text-white">ShoeStore</h1>
       </div>
       <div>
        <nav className="flex space-x-4 items-center text-white">
          <Link to="/" className="flex item-center gap-1"><HomeIcon className="w-6"/>Home</Link>
          <Link to="/shop" className="flex item-center gap-1"><BuildingStorefrontIcon className="w-6"/>Shop</Link>
          <Link to="/cart" className="flex item-center gap-1">
            <div className="relative">
            <ShoppingCartIcon className="w-6"/>
             {(cartCount ==="+99"||cartCount > 0 ) &&<span className="absolute top-4 -righet-1 w-4 h-4 text-center bg-red-500 text-xs rounded-full text-white">{cartActions.getProductsCount()}</span>}
            </div>
            Cart</Link>

         {
            isLoggedIn ? <>
            <button className="p-2 text-white bg-red-800 rounded-lg" onClick={authActions.logout}>LogOut</button>
            </>:<>
            <Link className="p-2 text-white bg-emerald-300 rounded-lg" to="/login">LogIn</Link>
            <Link className="p-2 text-white bg-emerald-300 rounded-lg" to="/signup">SignUp</Link>
            </>
         }
          </nav>
       </div>
      </header>

      <main className="pt-25 min-h-screen max-w-5x1 mx-auto">
        <Outlet/>

      </main>

      <Footer/>

    </>
  );
}
export default RootLayout