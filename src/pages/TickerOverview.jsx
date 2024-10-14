import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { TbPlus } from "react-icons/tb";

export default function TickerOverview() {
    const location = useLocation();
    const [tickerData, setTickerData] = useState(undefined);
    const [tickerDetails, setTickerDetails] = useState(undefined)

    useEffect(() => {
        console.log(location.pathname.split(`/`))
        async function collectTickerData() {
            const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${location.pathname.split(`/`)[2].toUpperCase()}/range/1/day/2019-10-12/2024-10-12?adjusted=true&sort=desc&apiKey=${import.meta.env.VITE_API_TOKEN}`);
            const response2 = await axios.get(`https://api.polygon.io/v3/reference/tickers/${location.pathname.split(`/`)[2].toUpperCase()}?apiKey=${import.meta.env.VITE_API_TOKEN}`);
            setTickerData(response.data.results);
            setTickerDetails(response2.data.results);
            console.log(response2.data.results)
        }

        collectTickerData();
    }, []);

    function formatNumber(num) {
        if (num >= 1e12) {
            return (num / 1e12).toFixed(1) + 'T';  // Trillions
        } else if (num >= 1e9) {
            return (num / 1e9).toFixed(1) + 'B';   // Billions
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + 'M';   // Millions
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(1) + 'K';   // Thousands
        } else {
            return num.toString();  // Less than 1000, return as is
        }
    }   

    return (
        tickerData !== undefined && tickerDetails !== undefined ? (
            <div data-theme="dark" className={`flex-1 bg-base-300 p-10`}>
                <div className={`flex items-center justify-between mb-8`}>
                    <div className={`flex items-center gap-4`}>
                        <div className={`p-4 border border-neutral rounded-md shadow-xl bg-base-200`}>
                            <img className={`w-11 aspect-square rounded-md`} src={`https://logo.clearbit.com/${tickerDetails.homepage_url}`} alt={`${tickerDetails.name} logo`} />
                        </div>
                        <div>
                            <p className={`text-white text-2xl font-medium mb-0.5`}>{tickerDetails.name}</p>
                            <p className={`text-base-content text-lg font-normal`}>{tickerDetails.primary_exchange}: {tickerDetails.ticker}</p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-4`}>
                        <button className={`px-4 py-2.5 border border-neutral rounded-md flex items-center gap-2 text-white group hover:bg-neutral transition-all duration-200 ease-in-out`}>Add to Watchlist <TbPlus size={20} className={`text-white group-hover:rotate-90 transition-all duration-200 ease-in-out`} /></button>
                        <button className={`px-10 py-2.5 border border-neutral rounded-md flex items-center gap-2 text-black bg-white group hover:bg-opacity-75 transition-all duration-200 ease-in-out`}>Trade</button>
                    </div>
                </div>
                <div className={`grid grid-cols-12 gap-4`}>
                    <div className={`grid grid-cols-3 gap-4 col-span-7`}>
                        <div className={`col-span-1 rounded-md border border-neutral bg-base-200 p-3 shadow-xl`}>
                            <p className={`text-base-content mb-2`}>Last Open</p>
                            <p className={`text-white text-xl`}>{tickerData[0].o} <span className={`text-base-content`}>USD</span></p>
                        </div>
                        <div className={`col-span-1 rounded-md border border-neutral bg-base-200 p-3 shadow-xl`}>
                            <p className={`text-base-content mb-2`}>Market Cap</p>
                            <p className={`text-white text-xl`}>{formatNumber(tickerDetails.market_cap)} <span className={`text-base-content`}>USD</span></p>
                        </div>
                        <div className={`col-span-1 rounded-md border border-neutral bg-base-200 p-3 shadow-xl`}>
                            <p className={`text-base-content mb-2`}>Volume</p>
                            <p className={`text-white text-xl`}>{tickerData[0].o} <span className={`text-base-content`}>USD</span></p>
                        </div>
                        <div className={`col-span-3 rounded-md border border-neutral bg-base-200 p-3 shadow-xl`}></div>
                    </div>
                    <div className={`col-span-5 rounded-md border border-neutral bg-base-200 p-3 shadow-xl`}></div>
                </div>
            </div>
        ) : (
            <></>
        )
    );    
}