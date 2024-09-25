import { motion } from "framer-motion"
import { RiStockLine } from "react-icons/ri"

export default function Home() {
    return (
        <div className={`min-h-screen bg-gray-950`}>
            <div className={`flex items-center py-3 pt-6 w-3/6 justify-between mx-auto mb-20`}>
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
            <div className={`w-3/6 mx-auto`}>
                <div className={`w-1/2`}>
                    <p className={`py-0.5 px-4 rounded-full text-lg bg-base-100 text-base-content w-fit font-medium mb-8`}>LEARN THE FUTURE</p>
                    <p className={`text-6xl font-semibold text-white mb-5`}>Empowring Young Investors Around the World</p>
                    <p className={`text-lg text-base-content`}>
                        Our stock market game empowers students to master financial literacy through virtual investing. By navigating the global economy, they develop critical thinking and risk management skills while fostering a community of future leaders. Together, we're shaping informed investors ready to take charge of their financial futures.
                    </p>
                </div>
                <div className={`w-1/2`}>
                    
                </div>
            </div>
        </div>
    )
}