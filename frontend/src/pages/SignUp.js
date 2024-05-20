import { Link } from "react-router-dom";
import { useState } from "react";
import UserSignUp from "../Hooks/userSignUp";

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
	const {Loading, signUp}=UserSignUp();

    const handleChangeName = (e) => {
        setFullName(e.target.value);
    };

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleChangeGender = (e) => {
        setGender(e.target.value);
    };

	const onSubmit = async (e) => {
        e.preventDefault();
		const user={fullName,username,password,confirmPassword,gender}
        console.log(user);
		await signUp(user)
        
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-blue-900'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up
                </h1>

                <form onSubmit={onSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input 
                            type='text' 
                            placeholder='John Doe' 
                            className='w-full input input-bordered h-10' 
                            value={fullName}
                            onChange={handleChangeName}
                        />
                    </div>

                    <div>
                        <label className='label p-2 '>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input 
                            type='text' 
                            placeholder='johndoe' 
                            className='w-full input input-bordered h-10' 
                            value={username}
                            onChange={handleChangeUsername}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={password}
                            onChange={handleChangePassword}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full input input-bordered h-10'
                            value={confirmPassword}
                            onChange={handleChangeConfirmPassword}
                        />
                    </div>

                    <div className='flex'>
                        <div className='form-control'>
                            <label className='label gap-2 cursor-pointer'>
                                <span className='label-text'>Male</span>
                                <input 
                                    type='radio' 
                                    name='gender' 
                                    value='Male' 
                                    className='radio border-slate-900' 
                                    checked={gender === 'Male'}
                                    onChange={handleChangeGender}
                                />
                            </label>
                        </div>
                        <div className='form-control'>
                            <label className='label gap-2 cursor-pointer'>
                                <span className='label-text'>Female</span>
                                <input 
                                    type='radio' 
                                    name='gender' 
                                    value='Female' 
                                    className='radio border-slate-900' 
                                    checked={gender === 'Female'}
                                    onChange={handleChangeGender}
                                />
                            </label>
                        </div>
                    </div>

                    <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Already have an account?
                    </Link>

                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
