import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

export default function Navbar() {
    return (
        <div className={`min-h-16 bg-base-300 p-5 border-b-2 border-gray-500`} data-theme="dark">
            <div className={`flex items-center justify-between`}>
                <div className={`breadcrumbs text-base`}>
                    <ul>
                        <li><a>Dashboard</a></li>
                    </ul>
                </div>
                <div className={`flex items-center gap-2`}>
                    <div className={`bg-gray-700 rounded-full cursor-pointer hover:scale-110 transition-all ease-in-out duration-200`}><IoMdNotificationsOutline size={24} className={`m-2`} color="white" /></div>
                    <div className={`bg-gray-700 rounded-full cursor-pointer hover:scale-110 transition-all ease-in-out duration-200`}><IoSettingsOutline size={24} className={`m-2`} color="white" /></div>
                    <div className={`flex items-center gap-1 ml-3 px-2 py-1 cursor-pointer rounded-md hover:bg-gray-600 hover:bg-opacity-20 transition-all ease-in-out duration-200`}>
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                <span>NP</span>
                            </div>
                        </div>
                        <FaAngleDown size={20} color="white" fill="white" />
                    </div>
                </div>
            </div>
        </div>
    )
}