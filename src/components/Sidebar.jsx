import { useState } from 'react';
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { MdAnalytics, MdSettings } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { TbHealthRecognition } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { RiDashboard2Fill, RiHealthBookFill } from "react-icons/ri";
import { MdMedicalInformation } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { RiStockLine } from "react-icons/ri";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { GrDocumentPerformance } from "react-icons/gr";
import { TbReportMoney } from "react-icons/tb";
import { PiCoins } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbClockDollar } from "react-icons/tb";
import { TbReceiptDollar } from "react-icons/tb";
import { FaSearchDollar } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { PiNotebookLight } from "react-icons/pi";

export default function Sidebar() {
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    const navigationData = [
        {
          title: "Dashboard",
          icon: MdAnalytics,
          color: "fill-blue-500",
          linkName: 'dashboard'
        },
        {
          title: "Scan History",
          icon: MdHistory,
          color: "fill-purple-400",
          linkName: 'scanhistory'
        },
        {
          title: "New Scan",
          icon: TbHealthRecognition,
          color: "text-emerald-500",
          linkName: 'newscan'
        },
        {
          title: "Professionals Search",
          icon: FaUserDoctor,
          color: "fill-sky-400",
          linkName: 'professionalssearch'
        },
        {
          title: "Health Records",
          icon: RiHealthBookFill,
          color: "fill-orange-500",
          linkName: 'healthrecords'
        },
        {
          title: "Blog",
          icon: MdMedicalInformation,
          color: "fill-yellow-400",
          linkName: 'blog'
        }
    ]

    return (
        <div data-theme="dark" id='sidebar' className={`w-64 bg-base-300 shadow-xl py-5 px-3 z-50 relative transition-all duration-300 ease-in-out text-base-content border-r-2 border-gray-500`}>
          <h1 className={`text-xl font-normal flex items-center gap-2 text-center text-base-content mx-auto mb-10`}><div className={`bg-emerald-600 rounded-full`}><RiStockLine size={21} color='white' className={`m-2`} /></div>The Market Game</h1>
          <div className={`text-base text-white border-left-2 border-emerald-400 bg-emerald-300 bg-opacity-20 flex items-center mx-auto rounded-md cursor-pointer`}><MdAnalytics size={24} className={`m-2 text-emerald-400`} />Dashboard</div>
          <p className={`font-bold text-sm text-base-content mt-2 mb-1`}>Account</p>
          <div className={`ml-2`}>
            <div className={`text-base text-white border-left-2 border-emerald-400 hover:bg-gray-400 hover:bg-opacity-20 transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><TbReportMoney size={22} className={`m-2 text-emerald-400`} />Account Summary</div>
            <div className={`text-base text-white border-left-2 border-emerald-400 hover:bg-gray-400 hover:bg-opacity-20 transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><PiCoins size={22} className={`m-2 text-emerald-400`} />Account Holdings</div>
            <div className={`text-base text-white border-left-2 border-emerald-400 hover:bg-gray-400 hover:bg-opacity-20 transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><MdHistory size={22} className={`m-2 text-emerald-400`} />Transaction History</div>
          </div>
          <p className={`font-bold text-sm text-base-content mt-2 mb-1`}>Trade</p>
          <div className={`ml-2`}>
            <div className={`text-base text-white border-left-2 border-emerald-400 hover:bg-gray-400 hover:bg-opacity-20 transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><FaMoneyBillTransfer size={22} className={`m-2 text-emerald-400`} />Make a Trade</div>
            <div className={`text-base text-white border-left-2 border-emerald-400 hover:bg-gray-400 hover:bg-opacity-20 transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><TbClockDollar size={22} className={`m-2 text-emerald-400`} />Pending Orders</div>
            <div className={`text-base text-white border-left-2 border-emerald-400 hover:bg-gray-400 hover:bg-opacity-20 transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><TbReceiptDollar size={22} className={`m-2 text-emerald-400`} />Transaction Notes</div>
          </div>
          <p className={`font-bold text-sm text-base-content mt-2 mb-1`}>Research</p>
          <div className={`ml-2`}>
            <div className={`text-base text-white border-left-2 border-emerald-400 hover:bg-gray-400 hover:bg-opacity-20 transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><FaSearchDollar size={22} className={`m-2 text-emerald-400`} />Ticker Search</div>
            <div className={`text-base text-white border-left-2 border-emerald-400 hover:bg-gray-400 hover:bg-opacity-20 transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><IoNewspaperOutline size={22} className={`m-2 text-emerald-400`} />News</div>
            <div className={`text-base text-white border-left-2 border-emerald-400 hover:bg-gray-400 hover:bg-opacity-20 transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><PiNotebookLight size={22} className={`m-2 text-emerald-400`} />Blog</div>
          </div>
        </div>
    )
}