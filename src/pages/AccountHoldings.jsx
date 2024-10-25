import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"
import { FaCircle } from "react-icons/fa6";
import { CiSearch, CiFilter, CiUndo } from "react-icons/ci";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { TbLoader2 } from "react-icons/tb";
import { motion } from "framer-motion";

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

    return (
        <div data-theme="dark" className={`flex-1 bg-base-300 p-10`}>
            <div className={`w-full mx-auto grid grid-cols-12 gap-3`}>
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