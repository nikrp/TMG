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
        const response = await axios.get(`https://api.polygon.io/v3/reference/tickers?market=stocks&search=${searchInput}&active=true&limit=20&apiKey=${import.meta.env.VITE_API_TOKEN}`);
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
            <div className={`${isFocused && `fixed w-screen top-0 left-0 bg-gray-600 bg-opacity-15 flex justify-center items-center flex-col h-screen`}`}>
                <label className={`input input-bordered flex items-center gap-2 mx-auto w-3/6 ${isFocused && `mb-5`}`}>
                    <GoSearch size={22} className={`text-white`} />
                    <input type="text" value={searchInput} onFocus={handleFocus} onBlur={handleBlur} onChange={(e) => setSearchInput(e.target.value)} placeholder="Symbol, eg. AAPL" />
                </label>
                {isFocused && (
                    <div className={`p-2 bg-base-100 border rounded-lg border-neutral shadow w-3/6`}>{data && data.results.map((result, index) => {
                        return (
                            <div key={index} className={`grid grid-cols-10 gap-2 mb-1 overflow-y-auto h-52`}>
                                <p className={`col-span-2 font-medium`}>{result.ticker}</p>
                                <p className={`col-span-5`}>{result.name}</p>
                                <p className={`col-span-3 text-gray-200`}><span className={`mr-1 text-base-content font-medium`}>{result.market.toLowerCase()}</span> {result.primary_exchange}</p>
                            </div>
                        )
                    })}</div>
                )}
            </div>
        </div>
    )
}