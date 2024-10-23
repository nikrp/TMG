import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { TbLoader2, TbPlus } from "react-icons/tb";
import { FaEllipsisVertical } from "react-icons/fa6";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";
import { CiShare1 } from "react-icons/ci";
import QRCode from "react-qr-code";
import gmail from '../assets/gmail.svg'
import whatsapp from '../assets/whatsapp.svg'
import x from '../assets/x.svg'
import instagram from '../assets/instagram.svg'
import facebook from '../assets/facebook.svg'
import axios from "axios";

const CustomTick = (props) => {
    const { x, y, payload, index } = props;
  
    return (
      <text x={x} y={y + 10} textAnchor="middle" className={`rotate-[65] text-white`}>
        {payload.value}
      </text>
    );
  };

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
    const [oneDayData, setOneDayData] = useState(undefined);
    const [relatedCompanies, setRelatedCompanies] = useState(undefined);
    const [tickerNews, setTickerNews] = useState(undefined);
    const [currentMultiplier, setCurrentMutiplier] = useState("1D");
    const [copied, setCopied] = React.useState(false);
    const [currentArticle, setCurrentArticle] = React.useState("");
    const [newsInsights, setNewsInsights] = React.useState([]);
    const [keywords, setKeywords] = React.useState([]);

    useEffect(() => {
        if (oneDayData && fiveDayData && tickerData) {
            if (currentMultiplier === "1D") {
                setMinValue((oneDayData.sort((a, b) => a.close - b.close)[0].close - 4.5).toFixed(2));
                setMaxValue((oneDayData.sort((a, b) => b.close - a.close)[0].close + 4.5).toFixed(2));
            } else if (currentMultiplier === "5D") {
                setMinValue((fiveDayData.sort((a, b) => a.close - b.close)[0].close - 4.5).toFixed(2));
                setMaxValue((fiveDayData.sort((a, b) => b.close - a.close)[0].close + 4.5).toFixed(2));
            }
        }
    }, [currentMultiplier]);

    useEffect(() => {
        async function collectTickerData() {
            const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${location.pathname.split(`/`)[2].toUpperCase()}/range/1/day/2019-10-12/2024-10-12?adjusted=true&apiKey=${import.meta.env.VITE_API_TOKEN}`);
            const response2 = await axios.get(`https://api.polygon.io/v3/reference/tickers/${location.pathname.split(`/`)[2].toUpperCase()}?apiKey=${import.meta.env.VITE_API_TOKEN}`);
            const response3 = await axios.get(`https://api.polygon.io/vX/reference/financials?ticker=${location.pathname.split(`/`)[2].toUpperCase()}&apiKey=${import.meta.env.VITE_API_TOKEN}`);
            const response4 = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${location.pathname.split(`/`)[2].toUpperCase()}/range/1/hour/2024-10-10/2024-10-15?adjusted=true&apiKey=${import.meta.env.VITE_API_TOKEN}`);
            const response5 = await axios.get(`https://api.polygon.io/v1/related-companies/${location.pathname.split(`/`)[2].toUpperCase()}?apiKey=${import.meta.env.VITE_API_TOKEN}`);
            setTickerData(formatDataForChart(response.data.results));
            setTickerDetails(response2.data.results);
            setFinancials(response3.data.results);
            setRelatedCompanies(response5.data.results ? response5.data.results.slice(0, 8) : []);

            const fiveDaysInMillis = 5 * 24 * 60 * 60 * 1000;
            const latestEntry = formatDataForOneChart(response4.data.results)[response4.data.results.length - 1].timestamp;
            const cutoffTimestamp = latestEntry - fiveDaysInMillis;

            setFiveDayData(formatDataForOneChart(response4.data.results).filter(entry => entry.timestamp <= cutoffTimestamp));

            const oneDayInMillis = 1 * 24 * 60 * 60 * 1000;
            const latestEntryOne = formatDataForOneChart(response4.data.results)[response4.data.results.length - 1].timestamp;
            const cutoffTimestampOne = latestEntryOne - oneDayInMillis;

            setOneDayData(formatDataForOneChart(response4.data.results).filter(entry => entry.timestamp <= cutoffTimestampOne).slice(0, 8));
            
            setMinValue(formatDataForOneChart(response4.data.results).filter(entry => entry.timestamp <= cutoffTimestampOne).slice(0, 8).sort((a, b) => a.close - b.close)[0].close - 4.5).toFixed(2);
            setMaxValue(formatDataForOneChart(response4.data.results).filter(entry => entry.timestamp <= cutoffTimestampOne).slice(0, 8).sort((a, b) => b.close - a.close)[0].close - 4.5).toFixed(2);
        }

        async function collectTickerNews() {
            try {
                const response = await axios.get(`https://api.polygon.io/v2/reference/news?ticker=${location.pathname.split(`/`)[2].toUpperCase()}&limit=20&apiKey=${import.meta.env.VITE_API_TOKEN}`);

                console.log(response.data);
                setTickerNews(response.data.results);
            } catch (e) {
                setTimeout(() => {
                    collectTickerNews();
                }, 1000);
            }
        }

        collectTickerData();
        collectTickerNews();
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
        setCurrentMutiplier(event.target.dataset.multiplier);
    }

    const formatDataForChart = (data) => {
        return data.map(item => ({
            dateAndTime: [
                formatDate(item.t),  // Use the custom formatDate function
                new Date(item.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) // Format timestamp to time
            ],  // Format timestamp to a readable date
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

    const handleCopyClick = () => {
        setCopied(true);
        console.log(currentArticle)
        navigator.clipboard.writeText(currentArticle);

        // Switch back to IoCopyOutline after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
    };

    return (
        tickerData !== undefined && tickerDetails !== undefined && financials !== undefined && fiveDayData !== undefined && oneDayData !== undefined && relatedCompanies !== undefined ? (
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
                            <div className={`col-span-12 rounded-md border border-neutral bg-base-200 p-3 shadow-xl w-full h-full`}>
                                <div className={`py-1 px-1 rounded-lg border border-neutral bg-base-300 shadow-sm flex items-center gap-2 text-base-content w-fit mx-auto mb-2.5`}>
                                    <p onClick={handleMultiplierClick} data-multiplier="1D" className={`px-2.5 py-0.5 rounded-lg border ${currentMultiplier === "1D" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>1D</p>
                                    <p onClick={handleMultiplierClick} data-multiplier="5D" className={`px-2.5 py-0.5 rounded-lg border ${currentMultiplier === "5D" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>5D</p>
                                    <p onClick={handleMultiplierClick} data-multiplier="3M" className={`px-2.5 py-0.5 rounded-lg border ${currentMultiplier === "3M" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>3M</p>
                                    <p onClick={handleMultiplierClick} data-multiplier="6M" className={`px-2.5 py-0.5 rounded-lg border ${currentMultiplier === "6M" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>6M</p>
                                    <p onClick={handleMultiplierClick} data-multiplier="1Y" className={`px-2.5 py-0.5 rounded-lg border ${currentMultiplier === "1Y" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>1Y</p>
                                    <p onClick={handleMultiplierClick} data-multiplier="YTD" className={`px-2.5 py-0.5 rounded-lg border ${currentMultiplier === "YTD" ? `border-neutral bg-base-200` : `border-base-300 bg-base-300`} hover:bg-base-100 cursor-pointer transition-all duration-200 ease-in-out`}>YTD</p>
                                </div>
                                <ResponsiveContainer width="99%" height={200} className={`mx-auto`}>
                                    <AreaChart width={600} height={300} data={currentMultiplier === "1D" ? oneDayData : currentMultiplier === "5D" ? fiveDayData : tickerData}>
                                        <XAxis dataKey="dateAndTime[0]" tick={{ fill: "#FFFFFF" }} tickMargin={10} />
                                        <YAxis domain={[minValue, maxValue]} width={75} tick={{ fill: '#FFFFFF' }} tickMargin={10} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                                        <Area type="monotone" dataKey="close" fill={dataColorChoices[minValue > maxValue ? 2 : 0]} stroke={dataColorChoices[minValue > maxValue ? 2 : 0]} fillOpacity={0.5} />
                                        <Tooltip cursor={false} content={(props) => {
                                            return (props.payload.length > 0 ? (
                                                <div className={`rounded-lg bg-neutral p-2 bg-opacity-80`}>
                                                    <p className={`text-sm mb-1`}>{props.payload[0].payload.dateAndTime[1]} UTC-7</p>
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
                    <div className={`col-span-4 rounded-md border border-neutral bg-base-200 p-3 shadow-xl h-full flex flex-col justify-between`}>
                        <div className={`mb-3.5`}>
                            <p className={`font-medium text-white text-lg`}>Stock Details</p>
                            <div className={`h-px rounded-full bg-neutral w-full mt-3`}></div>
                        </div>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>PREVIOUS CLOSE <span className={`text-white text-opacity-100 font-medium`}>${tickerData[1].close}</span></p>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>DAY RANGE <span className={`text-white text-opacity-100 font-medium`}>${tickerData[0].low} - ${tickerData[0].high}</span></p>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>YEAR RANGE <span className={`text-white text-opacity-100 font-medium`}>${tickerData[364].low} - ${tickerData[0].high}</span></p>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>MARKET CAPITALIZATION <span className={`text-white text-opacity-100 font-medium`}>{formatNumber(tickerDetails.market_cap)} USD</span></p>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>AVERAGE VOLUME <span className={`text-white text-opacity-100 font-medium`}>{formatNumber(tickerData[0].volume)} USD</span></p>
                        <p className={`flex items-center justify-between text-base-content mb-5`}>P/E RATIO <span className={`text-white text-opacity-100 font-medium`}>{(tickerData[0].close / financials[0].financials.income_statement.diluted_earnings_per_share.value).toFixed(2)}</span></p>
                        <p className={`flex items-center justify-between text-base-content`}>PRIMARY EXCHANGE <span className={`text-white text-opacity-100 font-medium`}>{tickerDetails.primary_exchange}</span></p>
                    </div>
                    <div className={`col-span-12 rounded-md border border-neutral bg-base-200 p-3 shadow-xl`}>
                        <div className={`mb-3.5`}>
                            <p className={`font-medium text-white text-lg`}>Compare With</p>
                            <div className={`h-px rounded-full bg-neutral w-full mt-3`}></div>
                        </div>
                        <div className={`flex flex-row flex-wrap gap-2`}>
                            {relatedCompanies.map((company, index) => {
                                return (
                                    <div key={index} className={`rounded-md border border-neutral bg-base-300 shadow p-2.5 w-[49%] hover:bg-base-200 hover:bg-opacity-25 transition-all ease-in-out duration-200 cursor-pointer`}>
                                        <p className={`text-base-content text-sm uppercase mb-1.5`}>COMPANY NAME</p>
                                        <p className={`text-white text-lg font-medium mb-1.5`}>${(100 + ((index + 1.364) * 10)).toFixed(2)} USD</p>
                                        <p className={`text-base-content text-sm uppercase`}>{company.ticker} {index % 2 === 0 ? <span className={`text-emerald-500`}>+{index}.52%</span> : <span className={`text-red-500`}>-{index}.29%</span>}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={`col-span-12 rounded-md border border-neutral bg-base-200 p-3 shadow-xl`}>
                        <div className={`mb-3.5`}>
                            <p className={`font-medium text-white text-lg`}>Stock News</p>
                            <div className={`h-px rounded-full bg-neutral w-full mt-3`}></div>
                        </div>
                        <div className={`flex flex-col gap-2`}>
                            {tickerNews ? (
                                tickerNews.slice(0, 4).map((result, index) => {
                                    return (
                                        <a key={index} target="blank_" href={result.article_url} className={`mb-1`}>
                                            <div className={`flex gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-400 hover:bg-opacity-5 transition-all duration-200 ease-in-out`}>
                                                <img src={result.image_url} className={`rounded-md h-28 w-48`} />
                                                <div className={`flex-1`}>
                                                    <p className={`flex items-center justify-between mb-2`}>
                                                        <p className={`flex items-center gap-1`}>
                                                            <img className={`w-6 h-6 rounded-full mr-1`} src={result.publisher.favicon_url} />
                                                            <a target="blank_" href={result.publisher.homepage_url} className={`no-underline visited:text-white text-white hover:underline hover:underline-offset-2 cursor-pointer mr-2`}>{result.publisher.name}</a>
                                                            <div className={`flex items-center gap-1`}>
                                                                {result.tickers.slice(0, 3).map((ticker, index) => {
                                                                    return (
                                                                        <span key={index} onClick={(e) => e.stopPropagation()} className={`px-1 rounded-sm bg-gray-400 bg-opacity-20 font-semibold flex items-center gap-1 cursor-pointer hover:bg-opacity-30 transition-all duration-200 ease-in-out`}>
                                                                            <a href={`https://www.tradingview.com/symbols/${ticker}/`} target="_blank" rel="noopener noreferrer">
                                                                                {ticker}
                                                                                <span className={`text-green-500 text-sm ml-1`}>+{0.35 + index}%</span>
                                                                            </a>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </div>
                                                            <span className={`mx-1`}>•</span>
                                                            {(new Date(result.published_utc)).toLocaleString()}
                                                        </p>
                                                        <div className="dropdown 2xl:dropdown-right xl:dropdown-left">
                                                            <p tabIndex={0} onClick={(e) => {e.preventDefault(); e.stopPropagation()}} role="button" className={`hover:bg-gray-400 hover:bg-opacity-15 rounded-md p-1 cursor-pointer transition-all duration-200 ease-in-out`}>
                                                                <FaEllipsisVertical size={18} className={`fill-gray-300`} />
                                                            </p>
                                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                                <li><a>Save for Later</a></li>
                                                                <li onClick={(e) => {e.preventDefault(); e.stopPropagation(); setCurrentArticle(result.article_url); document.getElementById("share-modal").showModal()}}><a>Share</a></li>
                                                            </ul>
                                                        </div>
                                                    </p>
                                                    <p className={`text-xl font-bold mb-1 line-clamp-1`}>{result.title}</p>
                                                    {result.author !== "N/A" && <p className={`text-gray-400 font-medium mb-1`}>by {result.author}</p>}
                                                    <p className={`leading-relaxed line-clamp-2 text-sm text-gray-200`}>{result.description}</p>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })
                            ) : (
                                <TbLoader2 size={24} className={`text-white mx-auto w-fit animate-spin`} />
                            )}
                        </div>
                    </div>
                    <dialog id="share-modal" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg mb-2">Share Article</h3>
                            <div className={`flex gap-2 p-2 rounded-md border border-neutral shadow`}>
                                <div className={`p-1 rounded-sm bg-white w-24 h-24`}>
                                    <QRCode
                                        size={365}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={currentArticle}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                                <div className={`flex-1 flex flex-col justify-between`}>
                                    <div className={`flex gap-1 h-fit`}>
                                        <input type="text" value={currentArticle} readOnly className="input input-bordered border border-neutral input-sm h-fit flex-1" />
                                        <div className={`border border-neutral shadow-md rounded-md cursor-pointer h-fit hover:scale-105 duration-150 transition-all ease-in-out`}>
                                            <a href={currentArticle} target="_blank" rel="noopener noreferrer">
                                                <CiShare1 size={20} className={`m-1.5`} />
                                            </a>
                                            </div>
                                        <div data-tip={copied ? "Copied" : "Copy"} onClick={handleCopyClick} className={`tooltip tooltip-bottom border border-neutral shadow-md rounded-md cursor-pointer h-fit hover:scale-105 duration-150 transition-all ease-in-out`}>{copied ? <IoCheckmark size={20} className={`m-1.5`} /> : <IoCopyOutline size={20} className={`m-1.5`} />}</div>
                                    </div>
                                    <div className={`flex items-center justify-between`}>
                                        <div className={`rounded-full border border-neutral shadow hover:bg-gray-400 hover:bg-opacity-15 cursor-pointer`}><img src={gmail} alt="Gmail" className={`w-9 h-9 m-1.5`} /></div>
                                        <div className={`rounded-full border border-neutral shadow hover:bg-gray-400 hover:bg-opacity-15 cursor-pointer`}><img src={whatsapp} alt="WhatsApp" className={`w-9 h-9 m-1.5`} /></div>
                                        <div className={`rounded-full border border-neutral shadow hover:bg-gray-400 hover:bg-opacity-15 cursor-pointer`}><img src={x} alt="X" className={`w-9 h-9 m-1.5`} /></div>
                                        <div className={`rounded-full border border-neutral shadow hover:bg-gray-400 hover:bg-opacity-15 cursor-pointer`}><img src={instagram} alt="Instagram" className={`w-9 h-9 m-1.5`} /></div>
                                        <div className={`rounded-full border border-neutral shadow hover:bg-gray-400 hover:bg-opacity-15 cursor-pointer`}><img src={facebook} alt="Facebook" className={`w-9 h-9 m-1.5`} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
        ) : (
            <></>
        )
    );    
}