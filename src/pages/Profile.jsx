import { TbUserEdit, TbSettings } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile({ secondElement }) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div data-theme="dark" className={`flex-1 bg-base-300 flex`}>
            <div className={`bg-base-300 py-10 px-5 border-r border-neutral w-1/5`}>
                <button onClick={() => navigate('/account/profile', { replace: true })} className={`px-2.5 py-1.5 rounded-md hover:bg-neutral ${location.pathname.endsWith(`/account/profile`) && `bg-opacity-75 bg-neutral`} flex items-center gap-2 text-base-content w-full mb-1 transition-all duration-200 ease-in-out`}><TbUserEdit size={20} className={`text-base-content`} />Profile</button>
                <button onClick={() => navigate('/account/settings', { replace: true })} className={`px-2.5 py-1.5 rounded-md hover:bg-neutral ${location.pathname.endsWith(`/account/settings`) && `bg-opacity-75 bg-neutral`} flex items-center gap-2 text-base-content w-full mb-3 transition-all duration-200 ease-in-out`}><TbSettings size={20} className={`text-base-content`} />Account</button>
                <button className={`px-2.5 py-1.5 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full transition-all duration-200 ease-in-out`}>Delete Account</button>
            </div>
            {secondElement}
        </div>
    )
}