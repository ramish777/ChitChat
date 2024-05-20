import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";


const UserSignUp=()=>{
    const [Loading,setLoading] =useState(false);
    const {setAuthUser}=useAuthContext();

    const signUp=async({fullName,username,password,confirmPassword,gender})=>{
        if(!fullName || !username || !password || !confirmPassword || !gender){
            toast.error('Please fill all fields')
            return
        }
        if(password!==confirmPassword){
            toast.error('Make sure password is correct')
            return
        }
        if(password.length<6){
            toast.error('Password must be at least 6 characters')
            return
        }

        setLoading(true)
        try{
            const res= await fetch("http://localhost:5000/auth/signup",{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({fullName,username,password,confirmPassword,gender:gender.toLowerCase()})
            })

            const data=await res.json();
            console.log(data);
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

    return {Loading,signUp}

}

export default UserSignUp;