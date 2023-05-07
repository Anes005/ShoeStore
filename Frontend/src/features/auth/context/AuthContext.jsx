import React from "react";
import {default as loginAPI} from "../login/api/request";
import {default as SignupAPI} from "../signup/api/request";

import {useNavigate} from "react-router-dom";


const initialState = {
    user: null,
    isFetching: false,
    error: false,
    isLoggedIn: false,
    actions: {}
}

const AuthContext = React.createContext(initialState)

export const AuthProvider = ({children}) => {

    const[user, setUser] = React.useState(null)
    const[isFetching, setIsFetching] = React.useState(false)
    const[error, setError] = React.useState(false)
    const[isLoggedIn, setIsLoggedIn] = React.useState(false)
    const navigate = useNavigate() 

    const loginWithUsernameOrEmail= async (usernameOrEmail, password) => {
        try{
            setIsFetching(true)
            const user = await loginAPI.loginWithUsernameOrEmail(usernameOrEmail, password)
            console.log(user)
            setUser(user)
            setIsLoggedIn(true)
            setIsFetching(false)
            navigate("/")
        }catch(err){
            setError(err)
            setIsFetching(false)
        }
    }

    const signupuserWithEmailAndUsername = async ({email, username, password,firstName,lastName}) => {
        try{
            setIsFetching(true)
            const user = await SignupAPI.signupuserWithEmailAndUsername({email, username, password,firstName,lastName})
            setUser(user)
            setIsLoggedIn(true)
            setIsFetching(false)
            navigate("/")
        }catch(err){
            setError(err)
            setIsFetching(false)
        }
    }

    const logout = () => {
        setUser(null)
        setIsLoggedIn(false)
        navigate("/login")
    }




return<AuthContext.Provider
    value={{
        user,
        isFetching,
        error,
        isLoggedIn,
        actions: {
            loginWithUsernameOrEmail,
            signupuserWithEmailAndUsername,
            logout
        }

    }}>
    {children}
</AuthContext.Provider>
}
export const useAuth = () => React.useContext(AuthContext)
export default AuthContext