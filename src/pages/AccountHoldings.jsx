import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"
import { FaCircle } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

export default function AccountHoldings() {
    const [holdings, setHoldings] = useState(undefined);

    useEffect(() => {
        async function collectHoldings() {
            const response = await supabase.auth.getUser();
            const { data, error } = await supabase.from('stock_trades').select().eq('user', response.data.user.id).is('ridden_of', null);
            setHoldings(data)
            console.log(data);
        }

        collectHoldings();
    }, []);

    return (
        <div data-theme="dark" className={`flex-1 bg-base-300 p-10`}>
            <div className={`w-full mx-auto grid grid-cols-12 gap-5`}>
                <div className={`col-span-4 relative`}>
                    <CiSearch size={23} className={`absolute inset-2.5`} />
                    <input className={`w-full rounded-md border border-neutral bg-base-200 px-4 pl-10 py-2 focus:outline-none focus:border-base-100`} placeholder="Search for specific tickers..." />
                </div>
                <div className={`flex items-center justify-center`}><button className={`w-full rounded-md bg-emerald-500 h-fit text-black hover:bg-opacity-80 transition-all duration-200 ease-in-out px-4 py-[7.15px]`}>Search</button></div>
                <div className={`col-start-9 rounded-md border border-neutral bg-base-200 px-4 py-2 col-span-2`}>HI2</div>
                <div className={`rounded-md border border-neutral bg-base-200 px-4 py-2 col-span-2`}>HI2</div>
                <div className={`rounded-md border border-neutral bg-base-200 col-span-12 p-6`}>
                    <div className="overflow-x-auto h-fit">
                        <table className="table table-zebra w-full h-fit">
                            <thead>
                                <tr>
                                    <th>Ticker</th>
                                    <th className={`w-fit`}>Date</th>
                                    <th>Position</th>
                                    <th>Quantity *</th>
                                    <th>Cost Basis</th>
                                    <th>Previous Close</th>
                                    <th>Current Price</th>
                                    <th>Price Change</th>
                                    <th>Market Value</th>
                                    <th>Gain/Loss</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className={`py-px`}>
                                {holdings && holdings.map((position, index) => {
                                    return (
                                        <tr key={index} className={`${index % 2 === 0 ? `bg-base-300` : `bg-base-100`} cursor-pointer hover:bg-base-200 ${index === 0 && `rounded-t-lg`} ${index === holdings.length - 1 && `rounded-b-lg`}`}>
                                            <td>{position.ticker}</td>
                                            <td className={`w-fit whitespace-nowrap`}>{position.entered.split("T")[0]}</td>
                                            <td>{position.type}</td>
                                            <td>{position.quantity}</td>
                                            <td>${position.total_value}</td>
                                            <td>${position.previousClose}</td>
                                            <td>${position.currentPrice}</td>
                                            <td className={`text-green-500`}>3.84%</td>
                                            <td>${position.total_value * 1.0384}</td>
                                            <td className={`text-green-500`}>${(position.total_value * 0.0384).toFixed(2)}</td>
                                            <td className={`flex items-center gap-1.5`}><FaCircle size={10} className={`${position.status === "pending" ? `fill-yellow-500` : 'fill-green-500'} m-0 p-0`} />{position.status}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className={`w-full h-0.5 bg-gray-400 rounded-full my-2`}></div>
                    <div className={`w-full flex items-center justify-between`}>
                        <div className="join ml-auto">
                            <button /*onClick={goToPreviousPage}*/ className={`join-item disabled:cursor-not-allowed btn btn-disabled`}>«</button>
                            <button disabled className="join-item btn disabled:bg-base-200 disabled:text-white">Page 1 of 1{/*{currentEquityPage}*/}</button>
                            <button /*onClick={goToNextPage}*/ className={`join-item disabled:cursor-not-allowed btn ${/*currentEquityPage === totalPages &&*/ `btn-disabled`}`}>»</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}