import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"
import { FaCircle } from "react-icons/fa6";
import { CiSearch, CiFilter, CiUndo, CiCirclePlus } from "react-icons/ci";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { TbLoader2 } from "react-icons/tb";
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GoPlus } from "react-icons/go";

export default function AccountHoldings() {
    const [holdings, setHoldings] = useState(undefined);
    const [reloading, setReloading] = useState(false);

    useEffect(() => {
        async function collectHoldings() {
            const response = await supabase.auth.getUser();
            const { data, error } = await supabase.from('stock_trades').select().eq('user', response.data.user.id).eq('status', 'trading').is('ridden_of', null);
            setHoldings(data)
            console.log(data);
            const scrollableTable = document.getElementById('scrollable-table');
            scrollableTable.addEventListener('wheel', function (e) {
                e.preventDefault();
                scrollableTable.scrollLeft += e.deltaY;
            });
        }

        collectHoldings();
    }, []);

    function simulateReload() {
        setReloading(true);
        setTimeout(() => {
            setReloading(false);
        }, 1500);
    }

    const data = [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400,
          "amt": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398,
          "amt": 2210
        },
        {
          "name": "Page C",
          "uv": 2000,
          "pv": 9800,
          "amt": 2290
        },
        {
          "name": "Page D",
          "uv": 2780,
          "pv": 3908,
          "amt": 2000
        },
        {
          "name": "Page E",
          "uv": 1890,
          "pv": 4800,
          "amt": 2181
        },
        {
          "name": "Page F",
          "uv": 2390,
          "pv": 3800,
          "amt": 2500
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        }
    ]

    return (
        <div data-theme="dark" className={`flex-1 bg-base-300 p-10`}>
            <div className={`w-full mx-auto grid grid-cols-12 gap-3`}>
                <div className={`col-span-6 p-6 border border-neutral bg-base-200 rounded-md`}>
                    <p className={`font-medium text-white text-xl mb-4`}>Top Holdings Performance</p>
                    <div className={`flex items-center gap-3 mb-4`}>
                        <p className={`px-3 py-1.5 rounded-full border border-neutral bg-base-300 flex flex-row items-center gap-1.5`}><img src={`https://logo.clearbit.com/tesla.com`} alt="Tesla Logo" className={`w-5 aspect-square rounded-full`} />TSLA</p>
                        <p className={`px-3 py-1.5 rounded-full border border-neutral bg-base-300 flex flex-row items-center gap-1.5`}><img src={`https://logo.clearbit.com/apple.com`} alt="Apple Logo" className={`w-5 aspect-square rounded-full`} />AAPL</p>
                        <p className={`px-3 py-1.5 rounded-full border border-neutral bg-base-300 flex flex-row items-center gap-1.5`}><img src={`https://logo.clearbit.com/microsoft.com`} alt="Microsoft Logo" className={`w-5 aspect-square rounded-full`} />MSFT</p>
                        <p className={`border border-neutral bg-base-300 rounded-full aspect-square hover:bg-neutral transition-all cursor-pointer`}><GoPlus size={23} className={`m-1.5`} /></p>
                    </div>
                    <ResponsiveContainer width={`100%`} height={250} className={``}>
                        <AreaChart width={`100%`} height={`100%`} data={data}>
                            <XAxis axisLine={false} tickLine={false} tick={{ fill: '#FFFFFF' }} height={30} tickMargin={15} dataKey="name"  />
                            <YAxis axisLine={false} tickLine={false} orientation="left" tick={{ fill: '#FFFFFF' }} width={60} tickMargin={10} />
                            <Tooltip cursor={false} content={(props) => {
                                return ( props.payload.length > 0 ? (
                                    <div className={`rounded-lg bg-neutral p-2 bg-opacity-80`}>
                                        <p className={`text-sm mb-1`}>{props.label}</p>
                                        <p style={{ color: props.payload[0].color }}>{props.payload[0].dataKey}: ${Number(props.payload[0].value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        <p style={{ color: props.payload[1].color }}>{props.payload[1].dataKey}: ${Number(props.payload[1].value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        <p style={{ color: props.payload[2].color }}>{props.payload[2].dataKey}: ${Number(props.payload[2].value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>) : (<div className={`hidden fixed top-0 left-0`}></div>)
                                )
                            }} formatter={(value) => `$${value.toLocaleString()}`} />
                            <Area type="monotone" dataKey="pv" stroke="#82CA9D" strokeWidth={1} fill="#82CA9D" fillOpacity={0.8} />
                            <Area type="monotone" dataKey="uv" stroke="#FFFFFF" strokeWidth={1} fill="#FFFFFF" fillOpacity={0.8}/>
                            <Area type="monotone" dataKey="amt" stroke="#8884D8" strokeWidth={1} fill="#8884D8" fillOpacity={0.8}/>
                            <CartesianGrid vertical={false} strokeDasharray={``} stroke="#FFFFFF" strokeLinecap="round" strokeOpacity={0.1} strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className={`col-span-6 p-6 border border-neutral bg-base-200 rounded-md`}>
                    <p className={`font-medium text-white text-xl mb-4`}>Portfolio Statistics</p>
                    <div className={``}>
                        <div className={`shadow mb-2 flex items-center justify-between`}>
                            <div className={``}>
                                <div className={`text-2xl text-white font-bold`}>35</div>
                                <div className={`text-lg text-base-content`}>Stock Trades</div>
                            </div>
                            <div className={``}>
                                <div className={`text-2xl text-white font-bold`}>5</div>
                                <div className={`text-lg text-base-content`}>Mutual Fund Trades</div>
                            </div>
                            <div className={``}>
                                <div className={`text-2xl text-white font-bold`}>0</div>
                                <div className={`text-lg text-base-content`}>Bond Trades</div>
                            </div>
                        </div>
                        <div className={`w-full rounded-md overflow-hidden flex-1 flex flex-row h-10 mb-6`}>
                            <div className={`h-full w-[90%] bg-accent tooltip tooltip-top cursor-pointer rounded-l-md hover:bg-opacity-75 transition-all`} data-tip={`Total Stock Trades: 90%`}></div>
                            <div className={`h-full w-[10%] bg-primary tooltip tooltip-top cursor-pointer rounded-r-md hover:bg-opacity-75 transition-all`} data-tip={`Total Mutual Fund Trades: 10%`}></div>
                            {/* <div className={`w-full h-1/3 bg-warning`}></div> */}
                        </div>
                        <div className={`shadow mb-2 flex items-center justify-between`}>
                            <div className={``}>
                                <div className={`text-2xl text-white font-semibold`}>$80,000.00</div>
                                <div className={`text-lg text-base-content`}>Equity in Stocks</div>
                            </div>
                            <div className={``}>
                                <div className={`text-2xl text-white font-semibold`}>$10,000.00</div>
                                <div className={`text-lg text-base-content`}>Equity in Mutual Funds</div>
                            </div>
                            <div className={``}>
                                <div className={`text-2xl text-white font-semibold`}>$10,000.00</div>
                                <div className={`text-lg text-base-content`}>Equity in Cash</div>
                            </div>
                        </div>
                        <div className={`w-full rounded-md overflow-hidden flex-1 flex flex-row h-10 mb-6`}>
                            <div className={`h-full w-[80%] bg-accent tooltip tooltip-top cursor-pointer rounded-l-md hover:bg-opacity-75 transition-all`} data-tip={`Equity in Stocks: 80%`}></div>
                            <div className={`h-full w-[10%] bg-primary tooltip tooltip-top cursor-pointer hover:bg-opacity-75 transition-all`} data-tip={`Equity in Mutual Funds: 10%`}></div>
                            <div className={`h-full w-[10%] bg-warning tooltip tooltip-top cursor-pointer rounded-r-md hover:bg-opacity-75 transition-all`} data-tip={`Equity in Cash: 10%`}></div>
                            {/* <div className={`w-full h-1/3 bg-warning`}></div> */}
                        </div>
                    </div>
                </div>
                <div className={`col-span-4`}>
                    <p className={`mb-0.5`}>Search for Tickers</p>
                    <div className={`relative flex flex-row gap-2`}>
                        <CiSearch size={23} className={`absolute inset-2.5`} />
                        <input className={`w-full rounded-md border border-neutral bg-base-200 px-4 pl-10 py-2 focus:outline-none focus:border-base-100`} placeholder="e.g. AAPL" />
                        <div className={`flex items-center justify-center`}><button className={`w-full rounded-md bg-emerald-500 h-fit text-black hover:bg-opacity-80 transition-all duration-200 ease-in-out px-4 py-[7.15px]`}>Search</button></div>
                    </div>
                </div>
                <div className={`col-start-8 flex justify-end items-end flex-col`}>
                    <p className={`mb-0.5`}></p>
                    <div className={`flex gap-3`}>
                        <p onClick={simulateReload} data-tip={`Reload Data`} className={`rounded-md tooltip tooltip-bottom border border-neutral bg-base-200 w-fit hover:bg-neutral transition-all duration-200 ease-in-out cursor-pointer`}><CiUndo size={23} className={`m-2 h-fit w-fit ${reloading && `animate-spin`}`} /></p>
                        <p data-tip={`Filters`} className={`rounded-md tooltip tooltip-bottom border border-neutral bg-base-200 w-fit hover:bg-neutral transition-all duration-200 ease-in-out cursor-pointer`}><CiFilter size={23} className={`m-2 h-fit w-fit`} /></p>
                    </div>
                </div>
                <div className={`col-span-2`}>
                    <p className="mb-0.5">From</p>
                    <input type="date" className="col-start-9 col-span-2 w-full px-4 py-2 rounded-md border border-neutral focus:border-base-100 focus:outline-none bg-base-200" />
                </div>
                <div className={`col-span-2`}>
                    <p className="mb-0.5">To</p>
                    <input type="date" className="col-start-9 col-span-2 w-full px-4 py-2 rounded-md border border-neutral focus:border-base-100 focus:outline-none bg-base-200" />
                </div>
                <div className={`rounded-md border border-neutral bg-base-200 col-span-12 p-6`}>
                    <div id="scrollable-table" className="overflow-x-auto h-fit">
                        <table className="table table-zebra w-full h-fit">
                            <thead>
                                <tr>
                                    <th>Ticker</th>
                                    <th className={`w-fit`}>Date</th>
                                    <th>Position</th>
                                    <th>Quantity</th>
                                    <th>Net Cost per Share or $100</th>
                                    <th>Net Cost</th>
                                    <th>Current Price per Share or $100</th>
                                    <th>Current Value</th>
                                    <th>Unrealized Gains Losses</th>
                                    <th>% Unrealized Gains Losses</th>
                                </tr>
                            </thead>
                            <motion.tbody initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 100 } } }} className={`py-px`}>
                                {holdings && holdings.length != 0 ? holdings.map((position, index) => {
                                    
                                    return (
                                        <tr key={index} variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className={`${index % 2 === 0 ? `bg-base-300` : `bg-base-100`} cursor-pointer hover:bg-base-200 ${index === 0 && `rounded-t-lg`} ${index === holdings.length - 1 && `rounded-b-lg`}`}>
                                            <td>{position.ticker}</td>
                                            <td className={`w-fit whitespace-nowrap`}>{position.entered.split("T")[0]}</td>
                                            <td>{position.type}</td>
                                            <td>{position.quantity}</td>
                                            <td>${position.total_value.toFixed(2)}</td>
                                            <td>${position.previousClose}</td>
                                            <td>${position.price_per_share}</td>
                                            <td className={`text-green-500`}>3.84%</td>
                                            <td>${(position.total_value * 1.0384).toFixed(2)}</td>
                                            <td className={`text-green-500`}>{(position.total_value * 0.0384).toFixed(2)}%</td>
                                        </tr>
                                    )
                                }) : holdings ? (
                                    <tr>
                                        <td colSpan={11}>
                                            <p className={`text-center text-lg text-white`}>You have no securities currently trading in your portfolio.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan={11}>
                                            <TbLoader2 size={30} className={`text-white animate-spin mx-auto`} />
                                        </td>
                                    </tr>
                                )}
                            </motion.tbody>
                        </table>
                    </div>
                </div>
                <div className={`col-span-3`}>
                    <p className={`px-4 py-2 border border-neutral bg-base-200 rounded-md text-white h-full flex justify-between items-center`}>Total Net Cost: <span className={`text-red-500`}>-$7,463.92</span></p>
                </div>
                <div className={`col-span-4`}>
                    <p className={`px-4 py-2 border border-neutral bg-base-200 rounded-md text-white h-full flex justify-between items-center`}>$ Total Unrealized Gains Losses: <span className={`text-green-500`}>+$3,659.44</span></p>
                </div>
                <div className={`col-start-8 col-span-5 flex items-center justify-end`}>
                    <div className={`join`}>
                        <button className={`join-item px-3 rounded-l-md border border-neutral bg-base-200 hover:bg-neutral flex items-center justify-center transition-all`}><BsArrowLeft size={20} className={`text-white`} /></button>
                        <p className={`join-item text-white text-lg text-center px-4 py-2 border border-neutral bg-base-200 flex items-center`}>Page 1 of 1</p>
                        <button className={`join-item px-3 rounded-r-md border border-neutral bg-base-200 hover:bg-neutral flex items-center justify-center transition-all`}><BsArrowRight size={20} className={`text-white`} /></button>
                    </div>
                </div>
                <div className={`col-span-3`}>
                    <p className={`px-4 py-2 border border-neutral bg-base-200 rounded-md text-white h-full flex justify-between items-center`}>Total Current Value: <span className={`text-red-500`}>-$4,139.85</span></p>
                </div>
                
                <div className={`col-span-4`}>
                    <p className={`px-4 py-2 border border-neutral bg-base-200 rounded-md text-white h-full flex justify-between items-center`}>% Total Unrealized Gains Losses: <span className={`text-red-500`}>-46.92%</span></p>
                </div>
            </div>
            
        </div>
    )
}