import {useContext, createContext, useState, useEffect,} from "react";
import { signInWithPopup ,signOut , onAuthStateChanged , GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const AuthContext = createContext()

export const  AuthContextProvider = ({children}) =>{

    const [user,setUser] = useState(null)

    const googleSignIn=()=>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth,provider)
    }

    const createWithEmail =(email,password)=>{
        createUserWithEmailAndPassword(auth, email, password)
    }

    const signInWithEmail = () =>{
        signInWithEmailAndPassword(auth, email, password)
    }

   
    const logOut =()=>{
        signOut(auth)
    }

   
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return ()=> unsubscribe()
    },[user])



    return(
        <AuthContext.Provider value={{user,googleSignIn,logOut,createWithEmail , signInWithEmail}}>
            {children}
        </AuthContext.Provider>
    )

}

export const UserAuth = () =>{
    return useContext(AuthContext)
}






