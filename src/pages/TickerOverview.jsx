import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { TbPlus } from "react-icons/tb";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
    {
        name: "Aug 1",
        "Total Equity": 99980.12,
        "Total Longs": 0,
        "Total Shorts": 0,
        Cash: 99980.12,
        amt: 150000
    },
    {
        name: "Aug 2",
        "Total Equity": 100005.34,
        "Total Longs": 0,
        "Total Shorts": 0,
        Cash: 100005.34,
        amt: 150000
    },
    {
        name: "Aug 5",
        "Total Equity": 99975.21,
        "Total Longs": 0,
        "Total Shorts": 0,
        Cash: 99975.21,
        amt: 150000
    },
    {
        name: "Aug 6",
        "Total Equity": 99990.48,
        "Total Longs": 2500.56,
        "Total Shorts": 0,
        Cash: 97489.92,
        amt: 150000
    },
    {
        name: "Aug 7",
        "Total Equity": 100015.60,
        "Total Longs": 2523.90,
        "Total Shorts": 0,
        Cash: 97491.70,
        amt: 150000
    },
    {
        name: "Aug 8",
        "Total Equity": 100025.20,
        "Total Longs": 2500.34,
        "Total Shorts": 0,
        Cash: 97489.66,
        amt: 150000
    },
    {
        name: "Aug 9",
        "Total Equity": 99985.45,
        "Total Longs": 2487.23,
        "Total Shorts": -500,
        Cash: 97998.22,
        amt: 150000
    },
    {
        name: "Aug 12",
        "Total Equity": 99995.67,
        "Total Longs": 2480.65,
        "Total Shorts": -750,
        Cash: 98265.02,
        amt: 150000
    },
    {
        name: "Aug 13",
        "Total Equity": 100005.75,
        "Total Longs": 2475.23,
        "Total Shorts": -800,
        Cash: 98230.52,
        amt: 150000
    },
    {
        name: "Aug 14",
        "Total Equity": 100035.88,
        "Total Longs": 2450.45,
        "Total Shorts": -1200,
        Cash: 98260.43,
        amt: 150000
    },
    {
        name: "Aug 15",
        "Total Equity": 99980.32,
        "Total Longs": 2498.12,
        "Total Shorts": -1150,
        Cash: 98432.20,
        amt: 150000
    },
    {
        name: "Aug 16",
        "Total Equity": 100005.14,
        "Total Longs": 2482.30,
        "Total Shorts": -800,
        Cash: 98100.84,
        amt: 150000
    },
    {
        name: "Aug 19",
        "Total Equity": 100015.44,
        "Total Longs": 2510.90,
        "Total Shorts": -800,
        Cash: 98090.54,
        amt: 150000
    },
    {
        name: "Aug 20",
        "Total Equity": 100010.70,
        "Total Longs": 2500.45,
        "Total Shorts": -1300,
        Cash: 98050.25,
        amt: 150000
    },
    {
        name: "Aug 21",
        "Total Equity": 100030.89,
        "Total Longs": 2490.34,
        "Total Shorts": -1100,
        Cash: 98250.55,
        amt: 150000
    },
    {
        name: "Aug 22",
        "Total Equity": 99990.88,
        "Total Longs": 2450.12,
        "Total Shorts": -1600,
        Cash: 98210.76,
        amt: 150000
    },
    {
        name: "Aug 23",
        "Total Equity": 100010.50,
        "Total Longs": 2440.90,
        "Total Shorts": -1250,
        Cash: 98250.60,
        amt: 150000
    },
    {
        name: "Aug 26",
        "Total Equity": 99950.80,
        "Total Longs": 2415.23,
        "Total Shorts": -1450,
        Cash: 98085.12,
        amt: 150000
    },
    {
        name: "Aug 27",
        "Total Equity": 100020.20,
        "Total Longs": 2390.56,
        "Total Shorts": -1000,
        Cash: 98250.12,
        amt: 150000
    },
    {
        name: "Aug 28",
        "Total Equity": 100035.90,
        "Total Longs": 2385.12,
        "Total Shorts": -1500,
        Cash: 98450.78,
        amt: 150000
    },
    {
        name: "Aug 29",
        "Total Equity": 100045.10,
        "Total Longs": 2350.60,
        "Total Shorts": -1200,
        Cash: 98555.20,
        amt: 150000
    },
    {
        name: "Aug 30",
        "Total Equity": 99985.20,
        "Total Longs": 2325.45,
        "Total Shorts": -1500,
        Cash: 98600.00,
        amt: 150000
    },
    {
        name: "Sep 3",
        "Total Equity": 100005.10,
        "Total Longs": 2345.90,
        "Total Shorts": -1000,
        Cash: 98659.20,
        amt: 150000
    },
    {
        name: "Sep 4",
        "Total Equity": 99950.34,
        "Total Longs": 2385.10,
        "Total Shorts": -1200,
        Cash: 98565.12,
        amt: 150000
    },
    {
        name: "Sep 5",
        "Total Equity": 100020.89,
        "Total Longs": 2360.30,
        "Total Shorts": -800,
        Cash: 98750.20,
        amt: 150000
    },
    {
        name: "Sep 6",
        "Total Equity": 99980.45,
        "Total Longs": 2340.50,
        "Total Shorts": -1100,
        Cash: 98655.95,
        amt: 150000
    },
    {
        name: "Sep 9",
        "Total Equity": 100045.23,
        "Total Longs": 2320.90,
        "Total Shorts": -900,
        Cash: 98725.33,
        amt: 150000
    },
    {
        name: "Sep 10",
        "Total Equity": 100030.75,
        "Total Longs": 2300.12,
        "Total Shorts": -1200,
        Cash: 98715.63,
        amt: 150000
    },
    {
        name: "Sep 11",
        "Total Equity": 99990.12,
        "Total Longs": 2290.50,
        "Total Shorts": -1300,
        Cash: 98675.40,
        amt: 150000
    },
    {
        name: "Sep 12",
        "Total Equity": 100045.84,
        "Total Longs": 0,
        "Total Shorts": 0,
        Cash: 100045.84,
        amt: 150000 
    },
    {
        name: "Sep 13",
        "Total Equity": 100045.84,
        "Total Longs": 0,
        "Total Shorts": 0,
        Cash: 100045.84,
        amt: 150000
    },
    {
        name: "Sep 16",
        "Total Equity": 100055.53,
        "Total Longs": 5165.7,
        "Total Shorts": 0,
        Cash: 100045.84,
        amt: 150000
    },
    {
        name: "Sep 17",
        "Total Equity": 100063.33,
        "Total Longs": 5173.5,
        "Total Shorts": 0,
        Cash: 94889.3,
        amt: 150000
    },
    {
        name: "Sep 18",
        "Total Equity": 100065.73,
        "Total Longs": 5175.9,
        "Total Shorts": 0,
        Cash: 94889.3,
        amt: 150000
    },
    {
        name: "Sep 19",
        "Total Equity": 100038.60,
        "Total Longs": 5159.1,
        "Total Shorts": -11346.3,
        Cash: 94879.5,
        amt: 150000
    }
];

export default function TickerOverview() {
    const location = useLocation();
    const choices = ["Total Equity", "Total Longs", "Total Shorts", "Cash"]
    const dataColorChoices = ["#82ca9d", "#FFA500", "#FF6347", "#007BFF"]

    const [graphData, setGraphData] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [tickerData, setTickerData] = useState(undefined);
    const [tickerDetails, setTickerDetails] = useState(undefined);
    const [financials, setFinancials] = useState(undefined);
    const [fiveDayData, setFiveDayData] = useState(undefined);
    const [currentMultiplier, setCurrentMutiplier] = useState("1D");

    useEffect(() => {
        setMinValue(Math.min(...data.map(d => graphData === 0 ? d.te : graphData === 1 ? d.tl : graphData === 2 ? d.ts : d.c)) - (Math.min(...data.map(d => graphData === 0 ? d.te : graphData === 1 ? d.tl : graphData === 2 ? d.ts : d.c)) === 0 ? 0 : 1));
        setMaxValue(Math.max(...data.map(d => graphData === 0 ? d.te : graphData === 1 ? d.tl : graphData === 2 ? d.ts : d.c)) + 1);
    }, [graphData]);

    useEffect(() => {
        console.log(currentMultiplier)
        async function collectTickerData() {
            const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${location.pathname.split(`/`)[2].toUpperCase()}/range/1/day/2019-10-12/2024-10-12?adjusted=true&sort=desc&apiKey=${import.meta.env.VITE_API_TOKEN}`);
            const response2 = await axios.get(`https://api.polygon.io/v3/reference/tickers/${location.pathname.split(`/`)[2].toUpperCase()}?apiKey=${import.meta.env.VITE_API_TOKEN}`);
            const response3 = await axios.get(`https://api.polygon.io/vX/reference/financials?ticker=${location.pathname.split(`/`)[2].toUpperCase()}&apiKey=${import.meta.env.VITE_API_TOKEN}`);
            const response4 = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${location.pathname.split(`/`)[2].toUpperCase()}/range/1/hour/2024-10-10/2024-10-15?adjusted=true&apiKey=${import.meta.env.VITE_API_TOKEN}`)
            setTickerData(formatDataForChart(response.data.results));
            setTickerDetails(response2.data.results);
            setFinancials(response3.data.results);

            const fiveDaysInMillis = 5 * 24 * 60 * 60 * 1000;
            const latestEntry = formatDataForOneChart(response4.data.results)[response4.data.results.length - 1].timestamp;
            const cutoffTimestamp = latestEntry - fiveDaysInMillis;

            setFiveDayData(formatDataForOneChart(response4.data.results).filter(entry => entry.timestamp <= cutoffTimestamp));
            console.log(formatDataForOneChart(response4.data.results).filter(entry => entry.timestamp <= cutoffTimestamp));
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

    function handleMultiplierClick(event) {
        console.log(event.target.dataset.multiplier)
        setCurrentMutiplier(event.target.dataset.multiplier);
    }

    const formatDataForChart = (data) => {
        console.log("IN THE FORMATTING:", data)
        return data.map(item => ({
            name: new Date(item.t).toLocaleDateString(),  // Format timestamp to a readable date
            open: item.o,
            high: item.h,
            low: item.l,
            close: item.c,
            volume: item.v,
            timestamp: item.t,
        }));
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        
        // Shorten month for specific formats
        const monthShort = formattedDate.split(' ')[0].substring(0, 3);
        const year = formattedDate.split(' ')[2];
    
        return `${date.getDate()} ${monthShort}${date.getDate() === 1 ? '' : "'"} ${year}`;
    };
    
    const formatDataForOneChart = (data) => {
        console.log("IN THE FORMATTING:", data);
        return data.map(item => ({
            dateAndTime: [
                formatDate(item.t),  // Use the custom formatDate function
                new Date(item.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) // Format timestamp to time
            ],
            open: item.o,
            high: item.h,
            low: item.l,
            close: item.c,
            volume: item.v,
            timestamp: item.t,
        }));
    };

    return (
        tickerData !== undefined && tickerDetails !== undefined && financials !== undefined && fiveDayData !== undefined ? (
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
                    <div className={`col-span-8`}>
                        <div className={`grid grid-cols-12 gap-4`}>
                            <div className={`col-span-4 rounded-md border border-neutral bg-base-200 p-3 shadow-xl h-fit`}>
                                <p className={`text-base-content mb-2`}>Last Open</p>
                                <p className={`text-white font-medium text-xl`}>{tickerData[0].open} <span className={`form-normal text-base-content`}>USD</span></p>
                            </div>
                            <div className={`col-span-4 rounded-md border border-neutral bg-base-200 p-3 shadow-xl h-fit`}>
                                <p className={`text-base-content mb-2`}>Market Cap</p>
                                <p className={`text-white font-medium text-xl`}>{formatNumber(tickerDetails.market_cap)} <span className={`form-normal text-base-content`}>USD</span></p>
                            </div>
                            <div className={`col-span-4 rounded-md border border-neutral bg-base-200 p-3 shadow-xl h-fit`}>
                                <p className={`text-base-content mb-2`}>Volume</p>
                                <p className={`text-white font-medium text-xl`}>{formatNumber(tickerData[0].volume)} <span className={`font-normal text-base-content`}>USD</span></p>
                            </div>
                            <div className={`col-span-12 rounded-md border border-neutral bg-base-200 p-3 shadow-xl`}>
                                <div className={`py-1.5 px-1.5 rounded-lg border border-neutral bg-base-300 shadow-sm flex items-center gap-2 text-base-content w-fit mx-auto mb-2.5`}>
                                    <p onClick={handleMultiplierClick} data-multiplier="1D" className={`px-3 py-1 rounded-lg border ${currentMultiplier === "1D" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>1D</p>
                                    <p onClick={handleMultiplierClick} data-multiplier="5D" className={`px-3 py-1 rounded-lg border ${currentMultiplier === "5D" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>5D</p>
                                    <p onClick={handleMultiplierClick} data-multiplier="3M" className={`px-3 py-1 rounded-lg border ${currentMultiplier === "3M" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>3M</p>
                                    <p onClick={handleMultiplierClick} data-multiplier="6M" className={`px-3 py-1 rounded-lg border ${currentMultiplier === "6M" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>6M</p>
                                    <p onClick={handleMultiplierClick} data-multiplier="1Y" className={`px-3 py-1 rounded-lg border ${currentMultiplier === "1Y" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>1Y</p>
                                    <p onClick={handleMultiplierClick} data-multiplier="YTD" className={`px-3 py-1 rounded-lg border ${currentMultiplier === "YTD" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>YTD</p>
                                </div>
                                <ResponsiveContainer width="99%" height={200} className={`mx-auto`}>
                                    <AreaChart width={600} height={300} data={currentMultiplier === "1D" ? fiveDayData : tickerData}>
                                        <XAxis dataKey="dateAndTime[1]" tick={{ fill: '#FFFFFF' }} tickMargin={10} />
                                        <YAxis width={50} tick={{ fill: '#FFFFFF' }} tickMargin={10} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                                        <Area type="monotone" dataKey="close" stroke={dataColorChoices[currentMultiplier === "1D" ? fiveDayData[0].open < fiveDayData[fiveDayData.length - 1].close ? 0 : 2 : tickerData[0].open < tickerData[tickerData.length - 1].close ? 0 : 2]} strokeWidth={1} fill={dataColorChoices[currentMultiplier === "1D" ? fiveDayData[0].open < fiveDayData[fiveDayData.length - 1].close ? 0 : 2 : tickerData[0].open < tickerData[tickerData.length - 1].close ? 0 : 2]} fillOpacity={0.5} />
                                        <Tooltip cursor={false} content={(props) => {
                                            console.log(props.payload[0]);
                                            return (props.payload.length > 0 ? (
                                                <div className={`rounded-lg bg-neutral p-2 bg-opacity-80`}>
                                                    <p className={`text-sm mb-1`}>{props.label} UTC-7</p>
                                                    <p className={`text-sm mb-1`}>{props.payload[0].payload.dateAndTime[0]}</p>
                                                    <p style={{ color: props.payload[0].color }}>Price: ${Number(props.payload[0].value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                </div>) : (<div className={`hidden fixed top-0 left-0`}></div>)
                                            )
                                        }} formatter={(value) => `$${value.toLocaleString()}`} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className={`col-span-4 rounded-md border border-neutral bg-base-200 p-3 shadow-xl h-fit`}>
                        <p className={`font-medium text-white text-lg`}>Stock Details</p>
                        <div className={`h-px rounded-full bg-neutral w-full my-3.5`}></div>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>PREVIOUS CLOSE <span className={`text-white text-opacity-100 font-medium`}>${tickerData[1].close}</span></p>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>DAY RANGE <span className={`text-white text-opacity-100 font-medium`}>${tickerData[0].low} - ${tickerData[0].high}</span></p>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>YEAR RANGE <span className={`text-white text-opacity-100 font-medium`}>${tickerData[364].low} - ${tickerData[0].high}</span></p>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>MARKET CAPITALIZATION <span className={`text-white text-opacity-100 font-medium`}>{formatNumber(tickerDetails.market_cap)} USD</span></p>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>AVERAGE VOLUME <span className={`text-white text-opacity-100 font-medium`}>{formatNumber(tickerData[0].volume)} USD</span></p>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>P/E RATIO <span className={`text-white text-opacity-100 font-medium`}>{(tickerData[0].close / financials[0].financials.income_statement.diluted_earnings_per_share.value).toFixed(2)}</span></p>
                        <p className={`flex items-center justify-between text-base-content`}>PRIMARY EXCHANGE <span className={`text-white text-opacity-100 font-medium`}>{tickerDetails.primary_exchange}</span></p>
                    </div>
                </div>
            </div>
        ) : (
            <></>
        )
    );    
}