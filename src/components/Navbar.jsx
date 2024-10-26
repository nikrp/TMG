import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { PiMoon } from "react-icons/pi";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { GoCopy } from "react-icons/go";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(undefined);
    const [tooltipText, setTooltipText] = useState("Copy");

    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    useEffect(() => {
        async function getUserData() {
            const response = await supabase.auth.getUser();
            setUser(response.data.user);
        }

        getUserData();
    }, []);

    function copyUserId() {
        setTooltipText("Copied!");
        navigator.clipboard.writeText(user.id);

        setTimeout(() => {
            setTooltipText("Copy");
        }, 1500);
    }

    return (
        <div className={`min-h-16 bg-base-300 p-5 border-b border-neutral`} data-theme="dark">
            <div className={`flex items-center justify-between`}>
                <div className={`breadcrumbs text-lg`}>
                    <ul>
                        <li><a>{toTitleCase(location.pathname.split("-").join(" ").substring(1))}</a></li>
                    </ul>
                </div>
                <p onClick={user !== undefined ? copyUserId : null} data-tip={tooltipText} className={`text-white text-lg flex items-center gap-1 ${user !== undefined && `hover:text-emerald-500 cursor-pointer transition-all group tooltip tooltip-bottom`}`}>Team ID: {user === undefined ? <div className={`skeleton h-4 w-52`}></div> : (<><p className={`flex items-center gap-2 text-white group-hover:cursor-pointer group-hover:text-emerald-500 transition-all`}>{user.id}</p><GoCopy size={20} className={`text-white group-hover:text-emerald-500 transition-all`} /></>)}</p>
                <div className={`flex items-center gap-2`}>
                    <div className={`dropdown`}>
                        <div tabIndex={0} role="button" className={`flex items-center gap-3 mr-2 px-2 py-1 cursor-pointer rounded-md hover:bg-gray-600 hover:bg-opacity-20 transition-all ease-in-out duration-200`}>
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                    <span>NP</span>
                                </div>
                            </div>
                            <FaAngleDown size={20} color="white" fill="white" />
                        </div>
                        <ul tabIndex={0} className={`dropdown-content dropdown-left menu bg-base-200 rounded-md w-44 z-[1] p-2 shadow text-base-content`}>
                            <li onClick={() => navigate('/account/profile', { replace: true })} className={`font-medium`}><a>Profile</a></li>
                            <li onClick={() => navigate('/account/settings', { replace: true })} className={`font-medium`}><a>Settings</a></li>
                            <li className={`font-medium`}><a>Rules</a></li>
                            <li className={`font-medium`}><a>Outside Links</a></li>
                        </ul>
                    </div>
                    <div className={`bg-gray-700 rounded-full cursor-pointer transition-all ease-in-out duration-200 group`}><IoMdNotificationsOutline size={24} className={`m-2 group-hover:scale-100 group-hover:-scale-x-100 transition-all ease-in-out duration-300`} color="white" /></div>
                    <div className={`bg-gray-700 rounded-full cursor-pointer transition-all ease-in-out duration-200 group`}><PiMoon size={24} className={`m-2 group-hover:scale-100 group-hover:-scale-x-100 transition-all ease-in-out duration-300`} color="white" /></div>
                </div>
            </div>
        </div>
    )
}