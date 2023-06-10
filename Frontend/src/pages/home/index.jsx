import { Link } from "react-router-dom";
function Home(){
    return(
    <div className="flex flex-col justify-center items-center ">
        <div>
            <div>
                <img className="flex mx-auto mt-20 w-screen h-1/4 rounded-lg " src="./03.jpg" alt="backround" />
                <h1 className="font-bold text-6xl absolute inset-y-80 left-20 text-white">The best place to acquire <br/>your shoes</h1>
            </div>
        </div>

        <div className="flex justify-center items-center w-36 m-16  gap-5 ">
        <img className="rounded-xl" src="./nikeLogo.jpg"/>
        <img className="rounded-xl" src="./filaLogo.jpg"/>
        <img className="rounded-xl" src="./pumaLogo.jpg"/>
        <img className="rounded-xl" src="./adidasLogo.jpg"/>
        <img className="rounded-xl" src="./jordanLogo.jpg"/>
        </div>

        <div>
            <h1 className="font-bold text-4xl text-center">Our Products</h1>

            <div className="grid grid-cols-3 gap-2">

                <div className="p-2 m-8 h-80 w-96 border-2">
                 <img src= "./img01.jpg" className="objct.contain w-full h-full max-h-full max-w-full"/>
                 <h3 className="text-center m-3 font-bold text-4xl">Air Force</h3>
                </div>

                <div className="p-2 m-8 h-80 w-96 border-2">
                 <img src= "./img02.jpg" className="objct.contain w-full h-full max-h-full max-w-full"/>
                 <h3 className="text-center m-3 font-bold text-4xl">Air Force</h3>
                </div>

                <div className="p-2 m-8 h-80 w-96 border-2">
                 <img src= "./img03.jpg" className="objct.contain w-full h-full max-h-full max-w-full"/>
                 <h3 className="text-center m-3 font-bold text-4xl">Air Force</h3>
                </div>

                <div className="p-2 m-8 h-80 w-96 border-2">
                 <img src= "./img11.jpg" className="objct.contain w-full h-full max-h-full max-w-full"/>
                 <h3 className="text-center m-3 font-bold text-4xl">Air Jordan</h3>
                </div>

                <div className="p-2 m-8 h-80 w-96 border-2">
                 <img src= "./img10.jpg" className="objct.contain w-full h-full max-h-full max-w-full"/>
                 <h3 className="text-center m-3 font-bold text-4xl">Air Jordan</h3>
                </div>

                <div className="p-2 m-8 h-80 w-96 border-2">
                 <img src= "./img09.jpg" className="objct.contain w-full h-full max-h-full max-w-full"/>
                 <h3 className="text-center m-3 font-bold text-4xl">Air Jordan</h3>
                </div>

                <div className="p-2 m-8 h-80 w-96 border-2">
                 <img src= "./img06.jpg" className="objct.contain w-full h-full max-h-full max-w-full"/>
                 <h3 className="text-center m-3 font-bold text-4xl">Air Force 1 Haute</h3>
                </div>

                

            </div>

            <button className="  bg-emerald-300 rounded-2xl m-20 p-3 font-bold text-2xl drop-shadow-lg"> <Link to="/products">see all</Link></button>
    
               



        </div>

       
        
















    </div>
    )
}
export default Home