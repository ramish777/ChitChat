import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";


const useLogout=()=>{
    const [Loading,setLoading] =useState(false);
    const {setAuthUser}=useAuthContext();

    const Logout = async()=>{
        setLoading(true)
        try{
            const res= await fetch("http://localhost:5000/auth/logout",{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            })

            const data=await res.json();
           
            if(data.error){
                throw new Error(data.error);
            }
            
            //authcontext started
            localStorage.removeItem("chat-user");
            //get from localstorage
            setAuthUser(null);


        }catch(error){
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    return {Loading,Logout}

}

export default useLogout;