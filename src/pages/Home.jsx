import { motion } from "framer-motion"
import { RiStockLine } from "react-icons/ri"
import { FaMoneyBills } from "react-icons/fa6";
import summary_page_snap from '../assets/summary_page_snap.png';
import total_equity_snap from '../assets/total_equity_snap.png';
import net_equity_snap from '../assets/net_equity_snap.png';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const data2 = [
    { name: "Sep 5", price: 285 },
    { name: "Sep 6", price: 282 },
    { name: "Sep 7", price: 280 },
    { name: "Sep 8", price: 279 },
    { name: "Sep 11", price: 280 },
    { name: "Sep 12", price: 278 },
    { name: "Sep 13", price: 275 },
    { name: "Sep 14", price: 270 },
    { name: "Sep 15", price: 268 },
    { name: "Sep 18", price: 265 },
    { name: "Sep 19", price: 267 }
]

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
                    <div className={`w-8/12 aspect-video rounded-full opacity-60 bg-gradient-to-b from-emerald-950 to-blue-400 blur-xl z-10`}></div>
                    <div className={`w-2/5 aspect-square absolute right-2 top-5 rounded-full bg-gradient-to-tr from-emerald-950 to-blue-400 p-20 blur-xl z-20`}>
                        <div className={`bg-gray-950 rounded-full w-full h-full`}></div>
                    </div>

                    <div className={`bg-base-200 z-50 opacity-60 h-fit w-4/6 absolute right-10 shadow-lg border border-neutral text-white p-3 rounded-lg flex flex-col justify-between`}>
                        <p className={`font-semibold text-gray-400 flex mb-2 justify-between`}><span>Total Equity</span><span className={`bg-green-500 bg-opacity-50 border-2 rounded-md border-green-500 border-opacity-75`}><FaMoneyBills color="white" className={`m-1.5`} size={25} /></span></p>
                        <p className={`text-2xl flex items-center justify-between font-semibold`}><span>$100,038.60</span><span className={`text-green-400 text-sm font-medium`}> +0.039% <span className={`text-gray-400`}> +$38.60</span></span></p>
                    </div>

                    <div className={`bg-base-200 z-40 opacity-60 h-full w-4/5 absolute left-10 top-5 shadow-lg border border-neutral text-white p-3 rounded-lg flex flex-col justify-between`}>
                        <p className={`font-semibold text-gray-400 text-2xl flex mb-2`}><span>Cash</span></p>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart width={200} height={66} data={data}>
                                <Area type="monotone" dataKey="pv" stroke="#007BFF" fill="#007BFF" strokeWidth={1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className={`bg-base-200 z-50 opacity-60 aspect-video w-1/4 absolute -bottom-10 right-10 shadow-lg border border-neutral text-white p-3 rounded-lg flex flex-col justify-between`}>
                        <div className={`flex items-center gap-2 mb-1`}>
                            <img src={`https://logo.clearbit.com/tesla.com`} className={`w-10 aspect-square rounded-full`} />
                            <div>
                                <p className={`font-semibold`}>TSLA</p>
                                <p>Tesla Inc.</p>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart width={200} height={44} data={data2}>
                                <YAxis hide domain={[264, 285]} />
                                <Area type="monotone" dataKey="price" stroke="#FF6347" fill="#FF6347" strokeWidth={1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}