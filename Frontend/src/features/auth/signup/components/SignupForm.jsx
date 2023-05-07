import React from "react"
import {useForm} from "react-hook-form"
import { useAuth } from "../../context/AuthContext";

    const validateEmail= function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

function SignupForm(){
    const { register, handleSubmit,watch,formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = React.useState(false)
    const {actions : {signupuserWithEmailAndUsername},isFetching,error} = useAuth()
   
     const onSubmit =handleSubmit(async (data)=>{
       await signupuserWithEmailAndUsername({
            email:data.email,
            username:data.username,
            password:data.password,
            firstName:data.firstName,
            lastName:data.lastName
       })  
    })
    return (
        <form onSubmit={onSubmit} className="py-6 px-2 flex flex-col gap-4 ">
            {error && <div className="text-red-500">Error while login: {error.message}</div>}
            {isFetching && <div className="text-green-5OO">Sign up...</div>}
           
            <div className="flex flex-col"> 
                <label htmlFor="username">Username</label>
                <input className="border-gray-400 border-2 rounded-lg px-4 py-2" type="text"  {...register("username", {
                    required: "Username is required",
                    })}/>
                {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
            </div>

            <div className="flex flex-col"> 
                <label htmlFor="email">Email</label>
                <input className="border-gray-400 border-2 rounded-lg px-4 py-2" type="email"  {...register("email", {
                    required: "Email is required",
                    validate : (value)=>validateEmail(value) || "Email is not valid"
                    })}/>
                {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="password">password
                <span className="cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>(show)</span>
                </label>
                <input className="border-gray-400 border-2 rounded-lg px-4 py-2" type="password"  {...register("password", {
                    required: "Password is required",
                    minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                    }
                    })}/>
                {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="confirmPassword">  Confirm Password
                <span className="cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>(show)</span>
                </label>
                <input className="border-gray-400 border-2 rounded-lg px-4 py-2" type="password"  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                    },
                    validate: (value) => value === watch('password') || "passwords do not match"
                    })}/>
                {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <div className="flex flex-col"> 
                <label htmlFor="firstName">First Name</label>
                <input className="border-gray-400 border-2 rounded-lg px-4 py-2" type="text"  {...register("firstName", {
                    required: "First Name is required",
                    })}/>
                {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
            </div>

            <div className="flex flex-col"> 
                <label htmlFor="lastName">Last Name</label>
                <input className="border-gray-400 border-2 rounded-lg px-4 py-2" type="text"  {...register("lastName", {
                    required: "Last Name is required",
                    })}/>
                {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
            </div>

            <div>
                <button className="bg-emerald-300 text-white px-4 py-2 rounded-lg" type="submit">Sign Up</button>
            </div>
        </form>
    )
} 
export default SignupForm