import { motion } from "framer-motion"
import { RiStockLine } from "react-icons/ri"
import { FaMoneyBills } from "react-icons/fa6";
import summary_page_snap from '../assets/summary_page_snap.png';
import total_equity_snap from '../assets/total_equity_snap.png';
import net_equity_snap from '../assets/net_equity_snap.png';

export default function Home() {
    return (
        <div className={`min-h-screen bg-gray-950`}>
            <div className={`flex items-center py-3 pt-6 xl:w-5/6 2xl:w-3/6 justify-between mx-auto mb-20`}>
                <h1 className={`text-xl font-medium flex items-center gap-2 text-center text-white`}><div className={`bg-emerald-600 rounded-full`}><RiStockLine size={21} color='white' className={`m-2`} /></div>The Market Game</h1>
                <div className={`flex items-center gap-8`}>
                    <p className={`text-lg text-base-content cursor-pointer`}>About Us</p>
                    <p className={`text-lg text-base-content cursor-pointer`}>Features</p>
                    <p className={`text-lg text-base-content cursor-pointer`}>Support</p>
                    <p className={`text-lg text-base-content cursor-pointer`}>Contact</p>
                </div>
                <div className={`flex items-center gap-2`}>
                    <button className={`bg-neutral hover:bg-opacity-50 transition-all duration-200 ease-in-out py-2 px-5 rounded-lg`}>Login</button>
                    <button className={`bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 ease-in-out py-2 px-5 rounded-lg text-black`}>Register</button>
                </div>
            </div>
            <div className={`xl:w-5/6 2xl:w-3/6 mx-auto flex`}>
                <div className={`w-1/2`}>
                    <p className={`text-lg text-emerald-500 w-fit font-medium`}>LEARN THE FUTURE</p>
                    <p className={`text-5xl font-semibold text-white text-opacity-95 mb-5 leading-tight`}>Empowering Young Investors</p>
                    <p className={`text-lg text-base-content text-opacity-90`}>
                        Explore the World of Investing: Real-World Learning, Virtual Portfolios, and a Global Economy at Your Fingertips.
                    </p>
                </div>
                <div className={`w-1/2 relative flex justify-center`}>
                    <div className={`w-8/12 aspect-video rounded-full opacity-15 bg-gradient-to-b from-emerald-950 to-blue-400 blur-xl z-10`}></div>
                    <div className={`w-2/5 aspect-square absolute right-2 top-5 opacity-75 rounded-full bg-gradient-to-tr from-emerald-950 to-blue-400 p-16 blur-lg z-20`}>
                        <div className={`bg-gray-950 rounded-full w-full h-full`}></div>
                    </div>

                    <div className={`bg-base-200 z-50 opacity-60 h-fit w-4/6 absolute right-10 shadow-lg border border-neutral text-white p-3 rounded-lg flex flex-col justify-between`}>
                        <p className={`font-semibold text-gray-400 flex mb-2 justify-between`}><span>Total Equity</span><span className={`bg-green-500 bg-opacity-50 border-2 rounded-md border-green-500 border-opacity-75`}><FaMoneyBills color="white" className={`m-1.5`} size={25} /></span></p>
                        <p className={`text-2xl flex items-center justify-between font-semibold`}><span>$100,038.60</span><span className={`text-green-400 text-sm font-medium`}> +0.039% <span className={`text-gray-400`}> +$38.60</span></span></p>
                    </div>

                    <div className={`bg-base-200 z-40 opacity-60 h-full w-3/6 absolute left-20 top-5 shadow-lg border border-neutral text-white p-3 rounded-lg flex flex-col justify-between`}>
                        <p className={`font-semibold text-gray-400 flex mb-2 justify-between`}><span>Total Equity</span><span className={`bg-green-500 bg-opacity-50 border-2 rounded-md border-green-500 border-opacity-75`}><FaMoneyBills color="white" className={`m-1.5`} size={25} /></span></p>
                        <p className={`text-2xl flex items-center justify-between font-semibold`}><span>$100,038.60</span><span className={`text-green-400 text-sm font-medium`}> +0.039% <span className={`text-gray-400`}> +$38.60</span></span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}