import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { supabase } from "../utils/supabase";
import { motion } from "framer-motion";

export default function MakeTrade() {
    const [selectedTab, setSelectedTab] = useState(0);

    const [symbol, setSymbol] = useState("");
    const [tradeType, setTradeType] = useState("buy");
    const [quantity, setQuantity] = useState(0);
    const [orderType, setOrderType] = useState("market");
    const [limitPrice, setLimitPrice] = useState(0);
    const [notes, setNotes] = useState("");
    const [tradeSuccessfull, setTradeSuccessfull] = useState([false, '', '']);

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

    const handleChange = (event) => {
        setTradeType(event.target.value);
    };

    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    async function makeStockTrade() {
        setTradeSuccessfull([false, '', '']);
        const response = await supabase.auth.getUser();
        const { data, error } = await supabase.from('stock_trades').insert([
            { ticker: symbol, type: tradeType, quantity: quantity, price_per_share: 248.84, total_value: 248.84 * quantity, order_type: orderType, commission: 2.34, user: response.data.user.id, notes: notes },
        ]).select();

        if (error) {
            console.error("Error inserting trade:", error);
        } else {
            setTradeSuccessfull([true, tradeType, symbol]);
            //clearValues();
        }
    }

    function clearValues() {
        setSymbol("");
        setTradeType("buy");
        setQuantity(0);
        setOrderType("market");
        setLimitPrice(0);
        setNotes("");
    }

    return (
        <div data-theme="dark" className={`flex-1 bg-base-300 p-10`}>
            <div className={`w-full bg-base-200 rounded-md border border-neutral p-5 mx-auto`}>
                <div role="tablist" className="tabs tabs-lifted tabs-lg">
                    <input type="radio" name="my_tabs_2" role="tab" className={`tab`} aria-label="Stock Trade" defaultChecked />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div className={`flex flex-row gap-10`}>
                            <div className={`w-[40%]`}>
                                <div className={`mb-4`}>
                                    <p className={`mb-1`}>Search Symbol or Company Name</p>
                                    <div className={`relative`}>
                                        <CiSearch size={24} className={`absolute inset-2.5 inset-x-2 text-white`} />
                                        <input value={symbol} onChange={(e) => setSymbol(e.target.value)} className={`px-4 pl-9 py-2 focus:outline-none bg-base-300 border border-neutral rounded-md w-full`} placeholder="(e.g. AAPL or Apple Inc...)" />
                                    </div>
                                </div>
                                <div className={`mb-4`}>
                                    <p className={`mb-1`}>Select a Trade Type</p>
                                    <div className={`flex items-center gap-3 w-full`}>
                                        <div className={`flex items-center gap-2`}>
                                            <input onChange={handleChange} checked={tradeType === 'buy'} value={`buy`} type="radio" name="radio-5" className="radio radio-success radio-sm" defaultChecked />
                                            <p className={`text-white`}>Buy</p>
                                        </div>
                                        <div className={`flex items-center gap-2`}>
                                            <input onChange={handleChange} checked={tradeType === 'short'} value={`short`} type="radio" name="radio-5" className="radio radio-success radio-sm" />
                                            <p className={`text-white`}>Short</p>
                                        </div>
                                        <div className={`flex items-center gap-2`}>
                                            <input onChange={handleChange} checked={tradeType === 'sell'} value={`sell`} type="radio" name="radio-5" className="radio radio-success radio-sm" />
                                            <p className={`text-white`}>Sell</p>
                                        </div>
                                        <div className={`flex items-center gap-2`}>
                                            <input onChange={handleChange} checked={tradeType === 'short_cover'} value={`short_cover`} type="radio" name="radio-5" className="radio radio-success radio-sm" />
                                            <p className={`text-white`}>Short Cover</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`mb-4`}>
                                    <p className={`mb-1`}>Number of Shares</p>
                                    <div className={`relative`}>
                                        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" className={`px-4 py-2 focus:outline-none bg-base-300 border border-neutral rounded-md w-full`} placeholder="" />
                                    </div>
                                </div>
                                <div className={` mb-4`}>
                                    <p className={`mb-1`}>Order Type</p>
                                    <div className={``}>
                                        <select value={orderType} onChange={(e) => setOrderType(e.target.value)} className="select w-full bg-base-300 select-bordered border-neutral">
                                            <option selected value={`market`}>Market</option>
                                            <option value={`limit`}>Limit</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={`mb-4`}>
                                    <p className={`mb-1`}>Limit Price</p>
                                    <div className={``}>
                                        <input value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)} type="number" className={`px-4 py-2 focus:outline-none bg-base-300 border border-neutral rounded-md w-full`} placeholder="" />
                                    </div>
                                </div>
                                <div className={`mb-4`}>
                                    <p className={`mb-1`}>Notes (Optional)</p>
                                    <div className={``}>
                                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className={`px-2 py-2 focus:outline-none bg-base-300 border border-neutral rounded-md w-full`} rows={3} placeholder="Add any notes about this trade if you want."></textarea>
                                    </div>
                                </div>
                                <div className={`flex flex-row gap-4`}>
                                    <button onClick={makeStockTrade} className={`w-1/2 px-4 py-1 rounded-md bg-emerald-500 text-black hover:bg-opacity-75 transition-all ease-in-out duration-200`}>Preview Trade</button>
                                    <button className={`w-1/2 px-4 py-2 rounded-md bg-base-200 border border-neutral hover:bg-neutral transition-all ease-in-out duration-200`}>Clear Values</button>
                                </div>
                            </div>
                            <div className={`w-[60%]`}>
                                <p className={`text-xl font-medium text-white mb-5`}>SPDR S&P500 ETF Trust</p>
                                <ResponsiveContainer width={`100%`} height={280} className={`mb-10`}>
                                    <AreaChart width={`100%`} height={`100%`} data={data}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <XAxis axisLine={false} tickLine={false} tick={{ fill: '#FFFFFF' }} height={50} tickMargin={20} dataKey="name"  />
                                        <YAxis axisLine={false} tickLine={false} orientation="left" tick={{ fill: '#FFFFFF' }} width={60} tickMargin={10} />
                                        <Tooltip cursor={false} content={(props) => {
                                            return ( props.payload.length > 0 ? (
                                                <div className={`rounded-lg bg-neutral p-2 bg-opacity-80`}>
                                                    <p className={`text-sm mb-1`}>{props.label}</p>
                                                    <p style={{ color: props.payload[0].color }}>{props.payload[0].dataKey}: ${Number(props.payload[0].value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                </div>) : (<div className={`hidden fixed top-0 left-0`}></div>)
                                            )
                                        }} formatter={(value) => `$${value.toLocaleString()}`} />
                                        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={0.6} strokeWidth={2} fill="#82ca9d" />
                                        <CartesianGrid vertical={false} strokeDasharray={``} stroke="#FFFFFF" strokeLinecap="round" strokeOpacity={0.1} strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <div className={`w-full grid grid-cols-2 gap-8`}>
                                    <div className={`flex flex-col gap-2`}>
                                        <p className={`flex items-center justify-between`}>Close Price: <span>$584.59</span></p>
                                        <p className={`flex items-center justify-between`}> Outstanding Shares (1000s): <span>36939740</span></p>
                                        <p className={`flex items-center justify-between`}>Market Cap (Millions): <span>601737.19</span></p>
                                        <p className={`flex items-center justify-between`}>Annual Dividend: <span>7.01</span></p>
                                        <p className={`flex items-center justify-between`}>Estimate: <span></span></p>
                                    </div>
                                    <div className={`flex flex-col gap-2`}>
                                        <p className={`flex items-center justify-between`}>High Ask: <span>$585.39</span></p>
                                        <p className={`flex items-center justify-between`}>Low Bid: <span>$582.58</span></p>
                                        <p className={`flex items-center justify-between`}>EPS: <span>10,000.00</span></p>
                                        <p className={`flex items-center justify-between`}>ETF: <span>Y</span></p>
                                    </div>
                                </div>
                                <motion.div key={tradeSuccessfull[0]===true} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.15 }} className={`w-full mt-4 rounded-md border-emerald-500 border bg-emerald-600 bg-opacity-35 ${!tradeSuccessfull[0] === true && `hidden`} px-4 py-4 text-white`}>
                                    <p>{toTitleCase(tradeSuccessfull[1])} order for {tradeSuccessfull[2].toUpperCase()} was successfull! Visit <span className={`cursor-pointer text-cyan-300 hover:text-opacity-75 transition-all duration-200 ease-in-out`}>Pending Orders</span> for End-of-Day accounts or <span className={`cursor-pointer text-cyan-300 hover:text-opacity-75 transition-all duration-200 ease-in-out`}>Account Holdings</span> for Real-Time accounts.</p>
                                </motion.div>
                            </div>
                        </div>
                        <div className={`flex flex-row gap-5`}>

                        </div>
                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className={`tab`} aria-label="Mutual Fund Trade" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        Tab content 2
                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className={`tab`} aria-label="Bond Trade" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        Tab content 3
                    </div>
                </div>
            </div>
        </div>
    )
}