import { useState, useEffect } from "react";
import { CiFilter, CiUndo } from "react-icons/ci";
import { TbLoader2 } from "react-icons/tb";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabase";

export default function TransactionHistory() {
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

    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    return (
        <div data-theme="dark" className={`flex-1 bg-base-300 p-10`}>
            <div className={`grid grid-cols-12 gap-3 w-full mx-auto`}>
                <div className={`col-span-2`}>
                    <p className="mb-0.5">From</p>
                    <input type="date" className="col-start-9 col-span-2 w-full px-4 py-2 rounded-md border border-neutral focus:border-base-100 focus:outline-none bg-base-200" />
                </div>
                <div className={`col-span-2`}>
                    <p className="mb-0.5">To</p>
                    <input type="date" className="col-start-9 col-span-2 w-full px-4 py-2 rounded-md border border-neutral focus:border-base-100 focus:outline-none bg-base-200" />
                </div>
                <div className={`flex flex-col`}>
                    <p className={`mb-0.5 text-base-300`}>__</p>
                    <div className={`flex gap-3`}>
                        <p onClick={simulateReload} data-tip={`Reload Data`} className={`rounded-md tooltip tooltip-bottom border border-neutral bg-base-200 w-fit hover:bg-neutral transition-all duration-200 ease-in-out cursor-pointer`}><CiUndo size={23} className={`m-2 h-fit w-fit ${reloading && `animate-spin`}`} /></p>
                        <p data-tip={`Filters`} className={`rounded-md tooltip tooltip-bottom border border-neutral bg-base-200 w-fit hover:bg-neutral transition-all duration-200 ease-in-out cursor-pointer`}><CiFilter size={23} className={`m-2 h-fit w-fit`} /></p>
                    </div>
                </div>
                <div className={`rounded-md border border-neutral bg-base-200 col-span-12 p-6`}>
                    <div id="scrollable-table" className="overflow-x-auto h-fit">
                        <table className="table table-zebra w-full h-fit">
                            <thead>
                                <tr>
                                    <th>Order Type</th>
                                    <th className={`w-fit`}>Shares or $Value</th>
                                    <th>Ticker</th>
                                    <th>Date</th>
                                    <th>Cost per Share or $100</th>
                                    <th>Net Amount</th>
                                    <th>Fees and Commission</th>
                                </tr>
                            </thead>
                            <motion.tbody initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 100 } } }} className={`py-px`}>
                                {holdings && holdings.length != 0 ? holdings.map((position, index) => {
                                    
                                    return (
                                        <tr key={index} variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className={`${index % 2 === 0 ? `bg-base-300` : `bg-base-100`} cursor-pointer hover:bg-base-200 ${index === 0 && `rounded-t-lg`} ${index === holdings.length - 1 && `rounded-b-lg`}`}>
                                            <td>{toTitleCase(position.type)}</td>
                                            <td className={`w-fit whitespace-nowrap`}>{position.quantity}</td>
                                            <td>{position.ticker}</td>
                                            <td>{position.entered.split("T")[0]}</td>
                                            <td>${position.price_per_share}</td>
                                            <td>${position.previousClose}</td>
                                            <td>${position.total_value.toFixed(2)}</td>
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
                <div className={`rounded-md border border-neutral bg-base-200 col-span-12 w-fit px-4 py-2`}>
                    <p className={`w-fit text-white`}>The following values are based on the begin and end dates selected above.</p>
                </div>
                <div className={`rounded-md border border-neutral bg-base-200 col-span-4 px-4 py-2`}>
                    <p className={`text-white flex items-center justify-between`}><span>Total Net Amount</span><span>$46,948.67</span></p>
                </div>
                <div className={`rounded-md border border-neutral bg-base-200 col-span-4 px-4 py-2`}>
                    <p className={`text-white flex items-center justify-between`}><span>Total Fees & Commission</span><span className={`text-red-500`}>-$115.00</span></p>
                </div>
            </div>
        </div>
    )
}