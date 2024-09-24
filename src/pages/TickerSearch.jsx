import React from "react"
import { GoSearch } from "react-icons/go";
import axios from 'axios';

export default function TickerSearch() {
    const [searchInput, setSearchInput] = React.useState("");
    const [data, setData] = React.useState(undefined);
    const [loadingData, setLoadingData] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const intervalId = React.useRef(null);

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
        }, 2500);
    };

    const handleBlur = () => {
        setIsFocused(false);
        clearInterval(intervalId.current);
    };

    return (
        <div data-theme="dark" className={`flex-1 bg-base-200 p-10`}>
            <label className={`input input-bordered flex items-center gap-2 mx-auto w-3/6 ${isFocused && `mb-5`}`}>
                <GoSearch size={22} className={`text-white`} />
                <input type="text" value={searchInput} onFocus={handleFocus} onBlur={handleBlur} onChange={(e) => setSearchInput(e.target.value)} placeholder="Symbol, eg. AAPL" />
            </label>
            <div className={`p-2 bg-base-100 border rounded-lg border-neutral h-5/6 max-h-96 overflow-y-scroll shadow w-3/6 mx-auto mt-5`}>
                <p className={`text-2xl`}>Results ({data ? data.results.length : 0})</p>
                {data && data.results.map((result, index) => {
                    return (
                        <div key={index} className={`grid grid-cols-10 gap-2 py-1 border-b border-b-neutral cursor-pointer hover:bg-base-200`}>
                            <p className={`col-span-2 font-medium`}>{result.ticker}</p>
                            <p className={`col-span-5 line-clamp-1`}>{result.name}</p>
                            <p className={`col-span-3 text-gray-200 text-right`}><span className={`mr-1 text-base-content font-medium`}>{result.market.toLowerCase()}</span> {result.primary_exchange}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}