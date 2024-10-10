import { motion } from 'framer-motion';
import { RiDiscordFill, RiStockLine } from "react-icons/ri"
import { FaMoneyBills } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { TbDeviceImacSearch } from "react-icons/tb";
import { TbDatabaseSearch } from "react-icons/tb";
import { TbAlertSquareRounded } from "react-icons/tb";
import { TbCheck } from "react-icons/tb";
import { FiClock } from "react-icons/fi";
import { YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const [x, setX] = useState(0);
    const [currentFeature, setCurrentFeature] = useState('portfolio-tracking');
    const itemWidth = 160;
    const navigate = useNavigate();

    const slideLeft = () => {
        // Move the items to the left
        if (x < 0) setX(x + itemWidth);
    };

    const slideRight = () => {
        // Move the items to the right
        const maxWidth = -(itemWidth * (items.length - 3)); // Show 3 items at a time
        if (x > maxWidth) setX(x - itemWidth);
    };

    const items = [
        { logo: 'tesla.com' },
        { logo: 'bny.com' },
        { logo: 'apple.com' },
        { logo: 'microsoft.com' },
        { logo: 'fidelity.com' },
        { logo: 'dribbble.com' },
    ];

    return (
        <div className={`min-h-screen bg-gray-950`}>
            <div className={`flex items-center py-3 pt-6 xl:w-5/6 2xl:w-3/6 justify-between mx-auto mb-20`}>
                <h1 className={`text-xl font-medium flex items-center gap-2 text-center text-white`}><div className={`bg-emerald-600 rounded-full`}><RiStockLine size={21} color='white' className={`m-2`} /></div>The Market Game</h1>
                <div className={`flex items-center gap-8`}>
                    <p className={`text-lg text-base-content text-opacity-80 hover:text-opacity-100 cursor-pointer transition-all duration-200 ease-in-out`}>Features</p>
                    <p className={`text-lg text-base-content text-opacity-80 hover:text-opacity-100 cursor-pointer transition-all duration-200 ease-in-out`}>About</p>
                    <p className={`text-lg text-base-content text-opacity-80 hover:text-opacity-100 cursor-pointer transition-all duration-200 ease-in-out`}>Support</p>
                    <p className={`text-lg text-base-content text-opacity-80 hover:text-opacity-100 cursor-pointer transition-all duration-200 ease-in-out`}>Contact</p>
                </div>
                <div className={`flex items-center gap-2`}>
                    <button onClick={() => navigate('/login', { replace: true })} className={`bg-neutral hover:bg-opacity-50 transition-all duration-200 ease-in-out py-2 px-5 rounded-lg`}>Login</button>
                    <button onClick={() => navigate('/register', { replace: true })} className={`bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 ease-in-out py-2 px-5 rounded-lg text-black`}>Register</button>
                </div>
            </div>
            <div className={`xl:w-5/6 2xl:w-3/6 mx-auto flex mb-32`}>
                <motion.div className={`w-1/2`}>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0 }} className={`text-lg text-emerald-500 w-fit font-medium overflow-hidden`}>LEARN THE FUTURE</motion.p>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.1 }} className={`text-5xl font-semibold text-white text-opacity-95 mb-5 leading-tight`}>Empowering Young Investors</motion.p>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.2 }} className={`text-lg text-base-content text-opacity-90 mb-7`}>
                        Explore the World of Investing: Real-World Learning, Virtual Portfolios, and a Global Economy at Your Fingertips.
                    </motion.p>
                    <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.3, type: "spring" }} className={`px-6 py-3 rounded-lg bg-green-500 text-black hover:bg-green-600 transition-all duration-200 ease-in-out`}>Get Started</motion.button>
                </motion.div>
                <motion.div className="w-1/2 relative flex justify-center">
                    <motion.div
                        className="w-8/12 aspect-video rounded-full opacity-60 bg-gradient-to-b from-emerald-950 to-blue-400 blur-xl z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.75, delay: 0.4 }}
                    ></motion.div>

                    <motion.div
                        className="w-2/5 aspect-square absolute right-2 top-5 rounded-full bg-gradient-to-tr from-emerald-950 to-blue-400 p-20 blur-xl z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.75, delay: 0.4 }}
                    >
                        <div className="bg-gray-950 rounded-full w-full h-full"></div>
                    </motion.div>

                    <motion.div
                        className="bg-base-200 z-50 opacity-60 h-fit w-4/6 absolute right-5 shadow-lg border border-neutral text-white p-3 rounded-lg flex flex-col justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.75, delay: 0.9 }}
                    >
                        <p className="font-semibold text-gray-400 flex mb-2 justify-between">
                            <span>Total Equity</span>
                            <span className="bg-green-500 bg-opacity-50 border-2 rounded-md border-green-500 border-opacity-75">
                                <FaMoneyBills color="white" className="m-1.5" size={25} />
                            </span>
                        </p>
                        <p className="text-2xl flex items-center justify-between font-semibold">
                            <span>$100,038.60</span>
                            <span className="text-green-400 text-sm font-medium">+0.039% <span className="text-gray-400"> +$38.60</span></span>
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-base-200 z-40 opacity-60 h-full w-4/5 absolute left-15 top-5 shadow-lg border border-neutral text-white p-3 rounded-lg flex flex-col justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.75, delay: 1.4 }}
                    >
                        <p className="font-semibold text-gray-400 text-2xl flex mb-2"><span>Cash</span></p>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart width={200} height={66} data={data}>
                                <Area type="monotone" dataKey="pv" stroke="#007BFF" fill="#007BFF" strokeWidth={1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>

                    <motion.div
                        className="bg-base-200 z-50 opacity-60 aspect-video w-1/4 absolute -bottom-10 right-5 shadow-lg border border-neutral text-white p-3 rounded-lg flex flex-col justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.75, delay: 1.9 }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                        <img src="https://logo.clearbit.com/tesla.com" className="w-10 aspect-square rounded-full" />
                        <div>
                            <p className="font-semibold">TSLA</p>
                            <p>Tesla Inc.</p>
                        </div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                        <AreaChart width={200} height={44} data={data2}>
                            <YAxis hide domain={[264, 285]} />
                            <Area type="monotone" dataKey="price" stroke="#FF6347" fill="#FF6347" strokeWidth={1} />
                        </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>
                </motion.div>
            </div>
            <div className={`xl:w-4/6 2xl:w-3/6 mx-auto flex items-center justify-center gap-5 overflow-hidden mb-32`}>
                {/* Left Arrow */}
                <div
                    onClick={slideLeft}
                    className={`rounded-full bg-neutral hover:bg-opacity-75 transition-all duration-200 ease-in-out cursor-pointer`}
                >
                    <GoArrowLeft size={24} className={`m-2`} color="white" />
                </div>

                {/* Carousel Container */}
                <div className={`flex items-center gap-5 overflow-hidden`}>
                    <motion.div
                        animate={{ x }}
                        transition={{ type: 'tween', ease: "easeInOut" }}
                        className={`flex gap-5`}
                    >
                        {items.map((item, index) => (
                            <a href={`https://${item.logo}`} target='_blank' rel='noopener noreferrer'>
                                <motion.div
                                    key={index}
                                    className={`w-32 aspect-square rounded-lg flex items-center justify-center p-3 bg-neutral cursor-pointer hover:opacity-75 transition-all duration-200 ease-in-out group`}
                                >
                                    <img
                                        src={`https://logo.clearbit.com/${item.logo}`}
                                        className={`grayscale group-hover:grayscale-0 rounded-lg w-20 transition-all duration-200 ease-in-out aspect-square`}
                                    />
                                </motion.div>
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Right Arrow */}
                <div
                    onClick={slideRight}
                    className={`rounded-full bg-neutral hover:bg-opacity-75 transition-all duration-200 ease-in-out cursor-pointer`}
                >
                    <GoArrowRight size={24} className={`m-2`} color="white" />
                </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, type: "spring", stiffness: 50 }} className={`xl:w-4/6 2xl:w-3/6 mx-auto flex flex-col mb-24`}>
                <p className={`text-xl font-normal text-emerald-500 tracking-widest mb-2 text-center`}>FEATURES</p>
                <h1 className={`text-base-content text-4xl font-medium mb-5 text-center`}>Our Solutions</h1>
                <div className={`flex`}>
                    <div className={`flex flex-col gap-3 w-1/2 px-3`}>
                        <motion.div 
                            className={`flex gap-3 items-center p-4 w-full rounded-xl bg-base-200 group cursor-pointer hover:bg-neutral transition-all duration-150 ease-in-out border ${currentFeature === 'portfolio-tracking' ? `border-emerald-500` : `border-base-200`}`}
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 50 }}  // Delay 0.1s
                            onClick={() => setCurrentFeature("portfolio-tracking")}
                        >
                            <div className={`rounded-full flex items-center justify-center bg-green-500 text-black`}>
                                <TbDeviceDesktopAnalytics size={25} color='black' className='m-3' />
                            </div>
                            <p className={`text-xl text-green-500 font-normal`}>Track your Portfolio</p>
                        </motion.div>

                        <motion.div 
                            className={`flex gap-3 items-center p-4 w-full rounded-xl bg-base-200 group cursor-pointer hover:bg-neutral transition-all duration-150 ease-in-out border ${currentFeature === 'real-time-trades' ? `border-emerald-500` : `border-base-200`}`}
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 50 }}  // Delay 0.2s
                            onClick={() => setCurrentFeature("real-time-trades")}
                        >
                            <div className={`rounded-full flex items-center justify-center bg-green-500 text-black`}>
                                <FiClock size={25} color='black' className='m-3' />
                            </div>
                            <p className={`text-xl text-green-500 font-normal`}>Make Real-Time Trades</p>
                        </motion.div>

                        <motion.div 
                            className={`flex gap-3 items-center p-4 w-full rounded-xl bg-base-200 group cursor-pointer hover:bg-neutral transition-all duration-150 ease-in-out border ${currentFeature === 'market-research' ? `border-emerald-500` : `border-base-200`}`}
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 50 }}  // Delay 0.3s
                            onClick={() => setCurrentFeature("market-research")}
                        >
                            <div className={`rounded-full flex items-center justify-center bg-green-500 text-black`}>
                                <TbDeviceImacSearch size={25} color='black' className='m-3' />
                            </div>
                            <p className={`text-xl text-green-500 font-normal`}>In-Depth Market Research</p>
                        </motion.div>

                        <motion.div 
                            className={`flex gap-3 items-center p-4 w-full rounded-xl bg-base-200 group cursor-pointer hover:bg-neutral transition-all duration-150 ease-in-out border ${currentFeature === 'trade-tracking' ? `border-emerald-500` : `border-base-200`}`}
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 50 }}  // Delay 0.4s
                            onClick={() => setCurrentFeature("trade-tracking")}
                        >
                            <div className={`rounded-full flex items-center justify-center bg-green-500 text-black`}>
                                <TbDatabaseSearch size={25} color='black' className='m-3' />
                            </div>
                            <p className={`text-xl text-green-500 font-normal`}>Keep Track of Every Trade</p>
                        </motion.div>

                        <motion.div 
                            className={`flex gap-3 items-center p-4 w-full rounded-xl bg-base-200 group cursor-pointer hover:bg-neutral transition-all duration-150 ease-in-out border ${currentFeature === 'stay-ahead-with-alerts' ? `border-emerald-500` : `border-base-200`}`}
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 50 }}  // Delay 0.5s
                            onClick={() => setCurrentFeature("stay-ahead-with-alerts")}
                        >
                            <div className={`rounded-full flex items-center justify-center bg-green-500 text-black`}>
                                <TbAlertSquareRounded size={25} color='black' className='m-3' />
                            </div>
                            <p className={`text-xl text-green-500 font-normal`}>Stay Ahead with Alerts</p>
                        </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, type: "spring", stiffness: 50 }} className={`w-1/2 p-5 bg-base-200 rounded-xl h-fit`}>
                        {currentFeature === 'portfolio-tracking' ? (
                            <motion.div key={currentFeature} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, type: "spring", stiffness: 75 }}>
                                <h3 className={`text-3xl font-bold text-emerald-500 mb-5`}>Track your Portfolio</h3>
                                <p className={`text-base-content text-lg`}>
                                    Using our in depth analytics, you can understand your portfolio and your progress in the market.
                                </p>
                            </motion.div>
                        ) : currentFeature === 'real-time-trades' ? (
                            <motion.div key={currentFeature} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, type: "spring", stiffness: 75 }}>
                                <h3 className={`text-3xl font-bold text-emerald-500 mb-5`}>Make Real-Time Trades</h3>
                                <p className={`text-base-content text-lg`}>
                                    Something Something Something Something Something Somthing Something Something Something Something Something Something Something Something
                                </p>
                            </motion.div>
                        ) : currentFeature === 'market-research' ? (
                            <motion.div key={currentFeature} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, type: "spring", stiffness: 75 }}>
                                <h3 className={`text-3xl font-bold text-emerald-500 mb-5`}>In-Depth Market Research</h3>
                                <p className={`text-base-content text-lg`}>
                                    Something Something Something Something Something Somthing Something Something Something Something Something Something Something Something Something
                                </p>
                            </motion.div>
                        ) : currentFeature === 'trade-tracking' ? (
                            <motion.div key={currentFeature} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, type: "spring", stiffness: 75 }}>
                                <h3 className={`text-3xl font-bold text-emerald-500 mb-5`}>Keep Track of Every Trade</h3>
                                <p className={`text-base-content text-lg`}>
                                    Something Something Something Something Something Somthing Something Something Something Something Something Something Something Something Something Something
                                </p>
                            </motion.div>
                        ) : currentFeature === 'stay-ahead-with-alerts' && (
                            <motion.div key={currentFeature} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, type: "spring", stiffness: 75 }}>
                                <h3 className={`text-3xl font-bold text-emerald-500 mb-5`}>Stay Ahead with Alerts</h3>
                                <p className={`text-base-content text-lg`}>
                                    Something Something Something Something Something Somthing Something Something Something Something Something Something Something Something Something Something Something
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, type: "spring", stiffness: 50 }} className={`xl:w-4/6 2xl:w-3/6 mx-auto flex mb-24`}>
                <div className={`w-3/5 px-5`}>
                    
                </div>
                <div className={`w-2/5 px-5`}>
                    <p className={`text-xl font-normal text-emerald-500 tracking-widest mb-2 text-left`}>FEATURES</p>
                    <h1 className={`text-base-content text-4xl font-medium mb-5 text-left`}>Why Choose Us</h1>
                    <div className={`flex items-center gap-3 mb-4`}>
                        <div className={`w-10 bg-emerald-900 bg-opacity-25 flex justify-center items-center aspect-square rounded-full`}><TbCheck className={`text-emerald-500 m-2`} size={21} /></div>
                        <div>
                            <p className={`text-xl text-base-content mb-0.5`}>Easy to Use</p>
                            <p className={`text-lg text-base-content font-thin text-opacity-80`}>Our market analysis and trading tools provide a smooth user experience.</p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-3 mb-4`}>
                        <div className={`w-10 bg-emerald-900 bg-opacity-25 flex justify-center items-center aspect-square rounded-full`}><TbCheck className={`text-emerald-500 m-2`} size={21} /></div>
                        <div>
                            <p className={`text-xl text-base-content mb-0.5`}>Collaboration</p>
                            <p className={`text-lg text-base-content font-thin text-opacity-80`}>Connect with traders, share insights, and reach your financial goals together.</p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-3 mb-4`}>
                        <div className={`w-10 bg-emerald-900 bg-opacity-25 flex justify-center items-center aspect-square rounded-full`}><TbCheck className={`text-emerald-500 m-2`} size={21} /></div>
                        <div>
                            <p className={`text-xl text-base-content mb-0.5`}>Learning</p>
                            <p className={`text-lg text-base-content font-thin text-opacity-80`}>Connect with traders and achieve financial goals together.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, type: "spring", stiffness: 50 }} className={`xl:w-3/6 2xl:w-2/6 mx-auto flex flex-col mb-24`}>
                <p className={`text-xl font-normal text-emerald-500 tracking-widest mb-2 text-center`}>ABOUT</p>
                <h1 className={`text-base-content text-4xl font-medium mb-5 text-center`}>Our Mission</h1>
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, type: "spring", stiffness: 50 }} className={`flex gap-4 items-center justify-between mb-16`}>
                    <img src='https://logo.clearbit.com/apple.com' className={`w-52 aspect-square rounded-lg`} />
                    <p className={`w-fit text-lg`}>Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, type: "spring", stiffness: 50 }} className={`flex gap-4 items-center justify-between mb-16`}>
                    <p className={`w-fit text-right text-lg`}>Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something</p>
                    <img src='https://logo.clearbit.com/tesla.com' className={`w-52 aspect-square rounded-lg`} />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, type: "spring", stiffness: 50 }} className={`flex gap-4 items-center justify-between mb-16`}>
                    <img src='https://logo.clearbit.com/microsoft.com' className={`w-52 aspect-square rounded-lg`} />
                    <p className={`w-fit text-lg`}>Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, type: "spring", stiffness: 50 }} className={`flex gap-4 items-center justify-between`}>
                    <p className={`w-fit text-right text-lg`}>Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something Something</p>
                    <img src='https://logo.clearbit.com/google.com' className={`w-52 aspect-square rounded-lg`} />
                </motion.div>
            </motion.div>
        </div>
    )
}