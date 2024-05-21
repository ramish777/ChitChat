import { Link } from "react-router-dom";
import{useState} from "react";
import useLogin from "../Hooks/useLogin";


const Login = () => {
	const [username,setUsername]=useState('');
	const [password,setPassword]=useState('');
	const {Loading, login}=useLogin();


	const handleUsername=(e)=>{
		setUsername(e.target.value);
	}

	const handlePassword=(e)=>{
		setPassword(e.target.value);
	}
	const handleSubmit= async (e)=>{
		e.preventDefault();
		const user={username, password}
		await login(user)
	}
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-blue-900'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					<span className='text-blue-200'>Chit Chat</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10'
						value={username}
						onChange={handleUsername} />
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
							onChange={handlePassword}
						/>
					</div>
					<Link to='/signUp' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2'>Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;