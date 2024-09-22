import { MdHistory } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import { RiStockLine } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { PiCoins } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbClockDollar } from "react-icons/tb";
import { TbReceiptDollar } from "react-icons/tb";
import { FaSearchDollar } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { PiNotebookLight } from "react-icons/pi";
import { RiMenuSearchLine } from "react-icons/ri";
import { AiOutlineAlert } from "react-icons/ai";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div data-theme="dark" id='sidebar' className={`w-64 bg-base-300 shadow-xl py-5 px-3 z-50 relative transition-all duration-300 ease-in-out text-base-content border-r-2 border-gray-500`}>
          <h1 className={`text-xl font-normal flex items-center gap-2 text-center text-base-content mx-auto mb-10`}><div className={`bg-emerald-600 rounded-full`}><RiStockLine size={21} color='white' className={`m-2`} /></div>The Market Game</h1>
          <p className={`font-bold text-sm text-base-content mt-2 mb-1`}>Account</p>
          <div className={`ml-2`}>
            <div onClick={() => navigate('/account-summary', { replace: true })} className={`text-base text-white ${location.pathname.endsWith("/account-summary") ? `bg-emerald-300 bg-opacity-20` : `hover:bg-gray-400 hover:bg-opacity-20`} transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><TbReportMoney size={22} className={`m-2 text-emerald-400`} />Account Summary</div>
            <div onClick={() => navigate('/account-holdings', { replace: true })} className={`text-base text-white ${location.pathname.endsWith("/account-holdings") ? `bg-emerald-300 bg-opacity-20` : `hover:bg-gray-400 hover:bg-opacity-20`} transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><PiCoins size={22} className={`m-2 text-emerald-400`} />Account Holdings</div>
            <div onClick={() => navigate('/transaction-history', { replace: true })} className={`text-base text-white ${location.pathname.endsWith("/transaction-history") ? `bg-emerald-300 bg-opacity-20` : `hover:bg-gray-400 hover:bg-opacity-20`} transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><MdHistory size={22} className={`m-2 text-emerald-400`} />Transaction History</div>
          </div>
          <p className={`font-bold text-sm text-base-content mt-2 mb-1`}>Trade</p>
          <div className={`ml-2`}>
            <div onClick={() => navigate('/make-trade', { replace: true })} className={`text-base text-white ${location.pathname.endsWith("/make-trade") ? `bg-emerald-300 bg-opacity-20` : `hover:bg-gray-400 hover:bg-opacity-20`} transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><FaMoneyBillTransfer size={22} className={`m-2 text-emerald-400`} />Make a Trade</div>
            <div onClick={() => navigate('/pending-orders', { replace: true })} className={`text-base text-white ${location.pathname.endsWith("/pending-orders") ? `bg-emerald-300 bg-opacity-20` : `hover:bg-gray-400 hover:bg-opacity-20`} transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><TbClockDollar size={22} className={`m-2 text-emerald-400`} />Pending Orders</div>
            <div onClick={() => navigate('/transaction-notes', { replace: true })} className={`text-base text-white ${location.pathname.endsWith("/transaction-notes") ? `bg-emerald-300 bg-opacity-20` : `hover:bg-gray-400 hover:bg-opacity-20`} transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><TbReceiptDollar size={22} className={`m-2 text-emerald-400`} />Transaction Notes</div>
          </div>
          <p className={`font-bold text-sm text-base-content mt-2 mb-1`}>Research</p>
          <div className={`ml-2`}>
            <div onClick={() => navigate('/ticker-search', { replace: true })} className={`text-base text-white ${location.pathname.endsWith("/ticker-search") ? `bg-emerald-300 bg-opacity-20` : `hover:bg-gray-400 hover:bg-opacity-20`} transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><FaSearchDollar size={22} className={`m-2 text-emerald-400`} />Ticker Search</div>
            <div onClick={() => navigate('/news', { replace: true })} className={`text-base text-white ${location.pathname.endsWith("/news") ? `bg-emerald-300 bg-opacity-20` : `hover:bg-gray-400 hover:bg-opacity-20`} transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><IoNewspaperOutline size={22} className={`m-2 text-emerald-400`} />News</div>
            <div onClick={() => navigate('/blog', { replace: true })} className={`text-base text-white ${location.pathname.endsWith("/blog") ? `bg-emerald-300 bg-opacity-20` : `hover:bg-gray-400 hover:bg-opacity-20`} transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><PiNotebookLight size={22} className={`m-2 text-emerald-400`} />Blog</div>
            <div onClick={() => navigate('/watchlists', { replace: true })} className={`text-base text-white ${location.pathname.endsWith("/watchlists") ? `bg-emerald-300 bg-opacity-20` : `hover:bg-gray-400 hover:bg-opacity-20`} transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><RiMenuSearchLine size={22} className={`m-2 text-emerald-400`} />Watchlists</div>
            <div onClick={() => navigate('/alerts', { replace: true })} className={`text-base text-white ${location.pathname.endsWith("/alerts") ? `bg-emerald-300 bg-opacity-20` : `hover:bg-gray-400 hover:bg-opacity-20`} transition-all ease-in-out duration-200 flex items-center mx-auto rounded-md cursor-pointer mb-1`}><AiOutlineAlert size={22} className={`m-2 text-emerald-400`} />Alerts</div>
          </div>
        </div>
    )
}