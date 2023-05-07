import LoginForm from "../../features/auth/login/components/loginForm" 
 
 function Login(){
    return (
    
     <div className="h-full grid place-items-center">
          <div className="pt-24 max-w-5x1 flex flex-col space-y-10 md:flex-row mx-auto md:space-x-10 md:space-y-0">
            <div>
                <h1 className="text-4xl font-bold">Welcom to ShoeStore</h1>
                <p className="text-gray-500">Sign in to your account</p>
               <LoginForm/>
               
            </div>
            <div>
                <img className="rounded-lg drop-shadow-4x1" alt="ShoeStore" src="https://images.unsplash.com/photo-1606324249921-c5add55e8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"></img>
            </div>
        </div>

     </div>
      
    )
}
export default Login
