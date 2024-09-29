import { motion } from "framer-motion"
import { RiStockLine } from "react-icons/ri"
import summary_page_snap from '../assets/summary_page_snap.png';
import total_equity_snap from '../assets/total_equity_snap.png';
import net_equity_snap from '../assets/net_equity_snap.png';

export default function Home() {
    return (
        <div className={`min-h-screen bg-gray-950`}>
            <div className={`flex items-center py-3 pt-6 xl:w-4/6 2xl:w-3/6 justify-between mx-auto mb-20`}>
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
            <div className={`xl:w-4/6 2xl:w-3/6 mx-auto flex`}>
                <div className={`w-1/2`}>
                    <p className={`py-0.5 px-4 rounded-full text-lg bg-base-100 text-base-content w-fit font-medium mb-8`}>LEARN THE FUTURE</p>
                    <p className={`text-7xl font-semibold text-white mb-5 leading-tight`}>Empowering Young Investors</p>
                    <p className={`text-lg text-base-content`}>
                        Explore the World of Investing: Real-World Learning, Virtual Portfolios, and a Global Economy at Your Fingertips.
                    </p>
                </div>
                <div className={`w-1/2 relative flex`}>
                    <div class="aspect-square -rotate-45 absolute rounded-full blur-2xl -left-2 -top-10 w-4/6 bg-gradient-to-r from-green-500 to-emerald-500 z-20"></div>
                    <div class="aspect-square -rotate-45 absolute rounded-full blur-2xl right-0 -bottom-24 w-4/6 bg-gradient-to-r from-emerald-500 to-emerald-300 z-20"></div>
                    <img src={summary_page_snap} alt="Account Summary Snapshot" className={`rounded-lg w-[500px] z-50 absolute`} />
                    <img src={total_equity_snap} alt="Total Equity Snapshot" className={`shadow-[rgba(0,0,15,0.5)_-0.5px_-3px_10px_1px] fixed left-0 top-0 z-[100] w-[250px] h-[65px] rounded-lg border border-neutral`}/>
                    <img src={net_equity_snap} alt="Total Equity Snapshot" className={`shadow-[rgba(0,0,15,0.5)_-0.5px_-3px_10px_1px] fixed left-0 top-7 z-[110] w-[250px] h-[65px] rounded-lg border border-neutral`}/>
                </div>
            </div>
        </div>
    )
}