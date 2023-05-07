import{Link} from 'react-router-dom'
import SignupForm from '../../features/auth/signup/components/SignupForm.jsx'
 function SignUp(){
    return (
    
     <div className="h-full grid place-items-center">
          <div className="pt-24 max-w-5x1 flex flex-col space-y-10 md:flex-row mx-auto md:space-x-10 md:space-y-0">
            <div>
                <h1 className="text-4xl font-bold">Welcom to ShoeStore</h1>
                <p className="text-gray-500">Create your account</p>
               <SignupForm/>
               <Link to="/login" className="text-slate-900 font-bold">Already have an account? </Link>
            </div>
            <div>
                <img className="rounded-lg drop-shadow-4xl" alt="ShoeStore" src="https://images.unsplash.com/photo-1606324249921-c5add55e8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"></img>
            </div>
        </div>

     </div>
      
    )
}
export default SignUp
