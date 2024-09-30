import React from "react"
import { GoSearch, GoArrowDown, GoArrowUp } from "react-icons/go";
import { PiCursorClick } from "react-icons/pi";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function TickerSearch() {
    const [searchInput, setSearchInput] = React.useState("");
    const [data, setData] = React.useState(undefined);
    const [loadingData, setLoadingData] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const intervalId = React.useRef(null);
    const navigate = useNavigate();

    async function collectSuggestions() {
        setLoadingData(true);
        const response = await axios.get(`https://api.polygon.io/v3/reference/tickers?market=stocks&search=${searchInput}&active=true&limit=50&apiKey=${import.meta.env.VITE_API_TOKEN}`);
        console.log(response.data);
        setData(response.data);
        setLoadingData(false);
    }

    const handleFocus = () => {
        setIsFocused(true);
        intervalId.current = setInterval(() => {
          collectSuggestions();
        }, 1000);
    };

    const handleBlur = () => {
        setIsFocused(false);
        clearInterval(intervalId.current);
    };

    return (
        <div data-theme="dark" className={`flex-1 bg-base-300 p-10`}>
            <div className={`shadow 2xl:w-3/6 xl:w-4/6 mx-auto`}>
                <div className={`relative w-full mx-auto`}>
                    <GoSearch size={22} className={`text-white inset-3.5 absolute`}/>
                    <input className={`px-4 pl-12 py-3 rounded-lg rounded-b-none bg-base-100 focus:outline-none focus:bg-opacity-75 w-full border border-neutral`} type="text" value={searchInput} onFocus={handleFocus} onBlur={handleBlur} onChange={(e) => setSearchInput(e.target.value)} placeholder="Symbol, eg. AAPL" />
                </div>
                {(
                    <div className={`w-full bg-base-200 border border-t-0 border-neutral h-64 overflow-y-auto max-h-64 mx-auto scrollbar-none`}>
                        {data ? data.results.map((result, index) => {
                            return (
                                <div onClick={() => navigate(`/ticker-search/${result.ticker}/overview`, { replace: true })} key={index} className={`grid grid-cols-10 gap-2 px-4 py-2 hover:bg-neutral border-b border-b-neutral cursor-pointer`}>
                                    <p className={`col-span-2 font-medium`}>{result.ticker}</p>
                                    <p className={`col-span-5 line-clamp-1`}>{result.name}</p>
                                    <p className={`col-span-3 text-gray-200 text-right`}><span className={`mr-1 text-base-content font-medium`}>{result.market.toLowerCase()}</span> {result.primary_exchange}</p>
                                </div>
                            )
                        }) : <p className={`w-full text-center my-5`}>No stocks found from search input.</p>}
                    </div>
                )}
                {(
                    <div className={`px-4 py-3 rounded-b-lg border border-neutral`}>
                        <p className={`w-full flex items-center justify-between text-lg`}>
                            <span>Data Collected using <a onClick={(e) => {e.preventDefault(); e.stopPropagation()}} href="polygon.io" target="_blank" rel="noopener noreferrer" className={`link`}>Polygon.io</a></span>
                            <span className={`flex items-center gap-5`}>
                                <span className={`flex items-center gap-1.5`}>
                                    <span className={`rounded-xl border-neutral border bg-neutral bg-opacity-20`}><GoArrowUp size={20} color="white" className={`m-1.5`} /></span>
                                    <span className={`rounded-xl border-neutral border bg-neutral bg-opacity-20`}><GoArrowDown size={20} color="white" className={`m-1.5`} /></span>
                                    <p className={`m-0 p-0 h-fit`}>navigate</p>
                                </span>
                                <span className={`flex items-center gap-1.5`}>
                                    <span className={`rounded-xl border-neutral border bg-neutral bg-opacity-20`}><PiCursorClick size={20} color="white" className={`m-1.5`} /></span>
                                    <p className={`m-0 p-0 h-fit`}>view stock</p>
                                </span>
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}