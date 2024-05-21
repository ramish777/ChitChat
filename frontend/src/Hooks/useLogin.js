import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useLogin=()=>{
    const [Loading,setLoading] =useState(false);
    const {setAuthUser}=useAuthContext();

    const login=async({username,password})=>{
        if(!username || !password){
            toast.error('Please fill all fields')
            return
        }
        if(password.length<6){
            toast.error('Password must be at least 6 characters')
            return
        }

        setLoading(true)
        try{
            const res= await fetch("http://localhost:5000/auth/login",{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body:JSON.stringify({username,password})
            })

            const data=await res.json();
            console.log(data.token);
            if(data.error){
                throw new Error(data.error)
            }
            toast.success("Success")

            //authcontext started
            localStorage.setItem("chat-user",JSON.stringify(data));
            //get from localstorage
            setAuthUser(data);


        }catch(error){
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    return {Loading,login}
}

export default useLogin;