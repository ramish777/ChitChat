import { BiLogOut } from "react-icons/bi";
import useLogout from "../../Hooks/useLogout";

const LogoutButton = () => {
	const { Loading, Logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!Loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={Logout} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;