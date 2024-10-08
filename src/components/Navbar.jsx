import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    return (
        <div className={`min-h-16 bg-base-300 p-5 border-b border-neutral`} data-theme="dark">
            <div className={`flex items-center justify-between`}>
                <div className={`breadcrumbs text-lg`}>
                    <ul>
                        <li><a>{toTitleCase(location.pathname.split("-").join(" ").substring(1))}</a></li>
                    </ul>
                </div>
                <div className={`flex items-center gap-2`}>
                    <div className={`bg-gray-700 rounded-full cursor-pointer hover:scale-110 transition-all ease-in-out duration-200`}><IoMdNotificationsOutline size={24} className={`m-2`} color="white" /></div>
                    <div className={`bg-gray-700 rounded-full cursor-pointer hover:scale-110 transition-all ease-in-out duration-200`}><IoSettingsOutline size={24} className={`m-2`} color="white" /></div>
                    <div className={`dropdown`}>
                        <div tabIndex={0} role="button" className={`flex items-center gap-1 ml-3 px-2 py-1 cursor-pointer rounded-md hover:bg-gray-600 hover:bg-opacity-20 transition-all ease-in-out duration-200`}>
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                    <span>NP</span>
                                </div>
                            </div>
                            <FaAngleDown size={20} color="white" fill="white" />
                        </div>
                        <ul tabIndex={0} className={`dropdown-content dropdown-left menu bg-base-200 rounded-sm z-[1] p-2 shadow text-base-content`}>
                            <li className={`font-medium`}><a>Support</a></li>
                            <li className={`font-medium`}><a>Dark Mode <input type="checkmark" className={`toggle toggle-md`} /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}