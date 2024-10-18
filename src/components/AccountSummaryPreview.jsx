import { FaMoneyBillTrendUp, FaMoneyBills, FaCreditCard, FaWallet, FaAngleDown, FaArrowRightLong, FaRotateRight, FaCircle, FaCircleArrowDown, FaCircleArrowUp, FaEllipsisVertical } from "react-icons/fa6";
import { CiShare1 } from "react-icons/ci";
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";
import * as React from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import axios from 'axios';
import QRCode from "react-qr-code";
import gmail from '../assets/gmail.svg'
import whatsapp from '../assets/whatsapp.svg'
import x from '../assets/x.svg'
import instagram from '../assets/instagram.svg'
import facebook from '../assets/facebook.svg'
import { motion } from "framer-motion";

// import { PieChart } from '@mui/x-charts/PieChart';

const accDetails = [
    { "Value of Long Stocks": "$5,159.10" },
    { "Value of Mutual Funds": "$0.00" },
    { "Value of Treasury Bonds": "$0.00" },
    { "Value of Municipal Bonds": "$0.00" },
    { "Value of Corporate Bonds": "$0.00" },
    { "Value of Shorts": "-$11,346.30" }
]
const accDetails2 = [
    { "Buy Margin Requirement": "$10,992.60" },
    { "Available Equity": "$89,046.00" },
    { "Minimum Maintenance": "$4,951.62" },
    { "Interest & Dividends": "$29.18" },
    { "Fees & Commission": "-$15.00" },
    { "Realized Gains/Loss": "$0.00" }
];
  
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

const equityPositions = [
    {
      ticker: "AMZN",
      date: "2024-09-20",
      position: "Long",
      quantity: 10,
      costBasis: "---",
      previousClose: 189.87,
      currentPrice: 191.28,
      priceChange: "0.743%",
      marketValue: 1912.80,
      gainLoss: "---",
      status: "Pending" // yellow bg-color
    },
    {
      ticker: "APLT",
      date: "2024-09-18",
      position: "Short",
      quantity: -18,
      costBasis: -136.29,
      previousClose: 8.00,
      currentPrice: 7.79,
      priceChange: "-2.62%",
      marketValue: -140.22,
      gainLoss: -4.22,
      status: "Trading"
    },
    {
      ticker: "BXSL",
      date: "2024-09-19",
      position: "Long",
      quantity: 75,
      costBasis: 2293.63,
      previousClose: 30.52,
      currentPrice: 30.605,
      priceChange: "0.279%",
      marketValue: 2295.38,
      gainLoss: 2.38,
      status: "Trading"
    },
    {
      ticker: "EWTX",
      date: "2024-09-19",
      position: "Long",
      quantity: 250,
      costBasis: 7380.00,
      previousClose: 29.50,
      currentPrice: 28.219,
      priceChange: "-4.34%",
      marketValue: 7054.75,
      gainLoss: -325.25,
      status: "Trading"
    },
    {
      ticker: "LMT",
      date: "2024-09-19",
      position: "Long",
      quantity: 30,
      costBasis: 16957.40,
      previousClose: 565.18,
      currentPrice: 567.235,
      priceChange: "0.364%",
      marketValue: 17017.05,
      gainLoss: 60.05,
      status: "Trading"
    },
    {
      ticker: "LUNR",
      date: "2024-09-18",
      position: "Short",
      quantity: -1500,
      costBasis: -11199.68,
      previousClose: 9.28,
      currentPrice: 9.165,
      priceChange: "-1.24%",
      marketValue: -13747.50,
      gainLoss: -2548.50,
      status: "Trading"
    },
    {
      ticker: "LUNR",
      date: "2024-09-19",
      position: "Long",
      quantity: 1500,
      costBasis: 13925.00,
      previousClose: 9.28,
      currentPrice: 9.165,
      priceChange: "-1.24%",
      marketValue: 13747.50,
      gainLoss: -177.50,
      status: "Trading"
    },
    {
      ticker: "VOO",
      date: "2024-09-19",
      position: "Long",
      quantity: 10,
      costBasis: 5253.10,
      previousClose: 524.91,
      currentPrice: 523.505,
      priceChange: "-0.267%",
      marketValue: 5235.05,
      gainLoss: -17.95,
      status: "Trading"
    }
];

const watchlist = [
    {
        companyName: "Apple Inc.",
        ticker: "AAPL",
        cost: 174,
        percentChange: 2.34,
        logo: "https://logo.clearbit.com/apple.com",
        graphData: [
            { name: "Sep 5", price: 168 },
            { name: "Sep 6", price: 169 },
            { name: "Sep 7", price: 171 },
            { name: "Sep 8", price: 170 },
            { name: "Sep 11", price: 170 },
            { name: "Sep 12", price: 171 },
            { name: "Sep 13", price: 172 },
            { name: "Sep 14", price: 173 },
            { name: "Sep 15", price: 170 },
            { name: "Sep 18", price: 175 },
            { name: "Sep 19", price: 174 }
        ]
    },
    {
        companyName: "Tesla Inc.",
        ticker: "TSLA",
        cost: 267,
        percentChange: -3.12,
        logo: "https://logo.clearbit.com/tesla.com",
        graphData: [
            { name: "Sep 5", price: 285 },
            { name: "Sep 6", price: 282 },
            { name: "Sep 7", price: 280 },
            { name: "Sep 8", price: 279 },
            { name: "Sep 11", price: 280 },
            { name: "Sep 12", price: 278 },
            { name: "Sep 13", price: 275 },
            { name: "Sep 14", price: 270 },
            { name: "Sep 15", price: 268 },
            { name: "Sep 18", price: 265 },
            { name: "Sep 19", price: 267 }
        ]
    },
    {
        companyName: "Amazon.com Inc.",
        ticker: "AMZN",
        cost: 132,
        percentChange: 1.05,
        logo: "https://logo.clearbit.com/amazon.com",
        graphData: [
            { name: "Sep 5", price: 128 },
            { name: "Sep 6", price: 128 },
            { name: "Sep 7", price: 129 },
            { name: "Sep 8", price: 130 },
            { name: "Sep 11", price: 129 },
            { name: "Sep 12", price: 130 },
            { name: "Sep 13", price: 131 },
            { name: "Sep 14", price: 133 },
            { name: "Sep 15", price: 132 },
            { name: "Sep 18", price: 134 },
            { name: "Sep 19", price: 135 }
        ]
    },
    {
        companyName: "Microsoft Corp.",
        ticker: "MSFT",
        cost: 313,
        percentChange: -0.78,
        logo: "https://logo.clearbit.com/microsoft.com",
        graphData: [
            { name: "Sep 5", price: 310 },
            { name: "Sep 6", price: 312 },
            { name: "Sep 7", price: 309 },
            { name: "Sep 8", price: 311 },
            { name: "Sep 11", price: 308 },
            { name: "Sep 12", price: 310 },
            { name: "Sep 13", price: 315 },
            { name: "Sep 14", price: 312 },
            { name: "Sep 15", price: 314 },
            { name: "Sep 18", price: 313 },
            { name: "Sep 19", price: 315 }
        ]
    },
    {
        companyName: "Alphabet Inc.",
        ticker: "GOOGL",
        cost: 138,
        percentChange: 1.42,
        logo: "https://logo.clearbit.com/google.com",
        graphData: [
            { name: "Sep 5", price: 132 },
            { name: "Sep 6", price: 133 },
            { name: "Sep 7", price: 134 },
            { name: "Sep 8", price: 135 },
            { name: "Sep 11", price: 134 },
            { name: "Sep 12", price: 135 },
            { name: "Sep 13", price: 136 },
            { name: "Sep 14", price: 137 },
            { name: "Sep 15", price: 135 },
            { name: "Sep 18", price: 138 },
            { name: "Sep 19", price: 139 }
        ]
    }
];

export default function AccountSummaryPreview({ showFullPreview }) {
    const rowsPerEquityPage = 5;
    const totalPages = Math.ceil(equityPositions.length / rowsPerEquityPage);
    const choices = ["Total Equity", "Total Longs", "Total Shorts", "Cash"]
    const dataColorChoices = ["#82ca9d", "#FFA500", "#FF6347", "#007BFF"]

    const [graphData, setGraphData] = React.useState(0);
    const [minValue, setMinValue] = React.useState(0);
    const [maxValue, setMaxValue] = React.useState(0);
    const [currentEquityPage, setCurrentEquityPage] = React.useState(1);
    const [currentRows, setCurrentRows] = React.useState(equityPositions.slice((currentEquityPage - 1) * rowsPerEquityPage, currentEquityPage * rowsPerEquityPage));
    const [marketNews, setMarketNews] = React.useState(undefined);
    const [copied, setCopied] = React.useState(false);
    const [currentArticle, setCurrentArticle] = React.useState("");
    const [newsInsights, setNewsInsights] = React.useState([]);
    const [keywords, setKeywords] = React.useState([]);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        setMinValue(Math.min(...data.map(d => graphData === 0 ? d.te : graphData === 1 ? d.tl : graphData === 2 ? d.ts : d.c)) - (Math.min(...data.map(d => graphData === 0 ? d.te : graphData === 1 ? d.tl : graphData === 2 ? d.ts : d.c)) === 0 ? 0 : 1));
        setMaxValue(Math.max(...data.map(d => graphData === 0 ? d.te : graphData === 1 ? d.tl : graphData === 2 ? d.ts : d.c)) + 1);
    }, [graphData]);

    React.useEffect(() => {
        setCurrentRows(equityPositions.slice((currentEquityPage - 1) * rowsPerEquityPage, currentEquityPage * rowsPerEquityPage));
    }, [currentEquityPage]);

    React.useEffect(() => {
        async function getNews() {
            const response = await axios.get(`https://api.polygon.io/v2/reference/news?limit=4&apiKey=${import.meta.env.VITE_API_TOKEN}`);
            setMarketNews(response.data);
        }

        getNews();
    }, []);

    const goToNextPage = () => {
        if (currentEquityPage < totalPages) {
          setCurrentEquityPage(currentEquityPage + 1);
        }
    };
    
    const goToPreviousPage = () => {
        if (currentEquityPage > 1) {
          setCurrentEquityPage(currentEquityPage - 1);
        }
    };

    function formatText(text, maxLength) {
        if (text.length > maxLength) {
          return text.substring(0, maxLength - 3) + "...";
        } else {
          return text.padEnd(maxLength, " ");
        }
    }

    const handleCopyClick = () => {
        setCopied(true);
        console.log(currentArticle)
        navigator.clipboard.writeText(currentArticle);

        // Switch back to IoCopyOutline after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      };

    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    return (
        <div data-theme="dark" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`flex-1 bg-base-300 p-10 group relative`}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                transition={{ type: "spring", duration: 0.2 }}
                className={`fixed top-5 left-5 px-5 py-2 rounded-md border-2 border-opacity-80 border-emerald-500 bg-emerald-800 w-3/12`}
            >
                <p className={`text-xl`}>Click to see full dashboard preview!</p>
            </motion.div>
            <div className={`bg-neutral opacity-0 absolute w-full h-full top-0 left-0 inset-0 z-[300] group-hover:opacity-15 group-hover:blur-xl group-hover:cursor-pointer`}></div>
            <div className={`grid xl:grid-cols-2 2xl:grid-cols-4 gap-7 mb-7`}>
                <div className={`bg-base-200 shadow-lg border border-neutral text-white p-3 rounded-lg flex flex-col justify-between`}>
                    <p className={`font-semibold text-gray-400 flex mb-2 justify-between`}><span>Total Equity</span><span className={`bg-green-500 bg-opacity-50 border-2 rounded-md border-green-500 border-opacity-75`}><FaMoneyBills color="white" className={`m-1.5`} size={25} /></span></p>
                    <p className={`text-2xl flex items-center justify-between font-semibold`}><span>$100,038.60</span><span className={`text-green-400 text-sm font-medium`}> +0.039% <span className={`text-gray-400`}> +$38.60</span></span></p>
                </div>
                <div className={`bg-base-200 shadow-lg border border-neutral text-white p-3 rounded-lg flex flex-col justify-between`}>
                    <p className={`font-semibold text-gray-400 flex mb-2 justify-between`}><span>Net Equity Gain</span><span className={`bg-blue-400 bg-opacity-50 border-2 rounded-md border-blue-400 border-opacity-75`}><FaMoneyBillTrendUp color="white" className={`m-1.5`} size={25} /></span></p>
                    <p className={`text-2xl font-semibold`}><span>$38.60</span></p>
                </div>
                <div className={`bg-base-200 shadow-lg border border-neutral text-white p-3 rounded-lg  flex flex-col justify-between`}>
                    <p className={`font-semibold text-gray-400 flex mb-2 justify-between`}><span>Buying Power</span><span className={`bg-purple-500 bg-opacity-50 border-2 rounded-md border-purple-500 border-opacity-75`}><FaCreditCard color="white" className={`m-1.5`} size={25} /></span></p>
                    <p className={`text-2xl font-semibold`}><span>$133,569.01</span></p>
                </div>
                <div className={`bg-base-200 shadow-lg border border-neutral text-white p-3 rounded-lg  flex flex-col justify-between`}>
                    <p className={`font-semibold text-gray-400 flex mb-2 justify-between`}><span>Cash Balance</span><span className={`bg-yellow-500 bg-opacity-50 border-2 rounded-md border-yellow-500 border-opacity-75`}><FaWallet color="white" className={`m-1.5`} size={25} /></span></p>
                    <p className={`text-2xl font-semibold`}><span>$94,879.50</span></p>
                </div>
            </div>
            <div className={`grid xl:grid-cols-1 2xl:grid-cols-2 gap-7 mb-7`}>
                <div className={`col-span-1 bg-base-200 border border-neutral text-white p-5 rounded-lg`}>
                    <p className={`text-2xl font-semibold mb-5 flex justify-between`}>
                        <span>Portfolio Summary</span>
                        <div className="dropdown dropdown-open dropdown-left">
                            <div tabIndex={0} role="button" className="btn bg-neutral m-1 flex items-center gap-1">{choices[graphData]} <FaAngleDown size={20} color="white" /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li onClick={() => setGraphData(0)}><a>Total Equity</a></li>
                                <li onClick={() => setGraphData(1)}><a>Total Longs</a></li>
                                <li onClick={() => setGraphData(2)}><a>Total Shorts</a></li>
                                <li onClick={() => setGraphData(3)}><a>Cash</a></li>
                            </ul>
                        </div>
                    </p>
                    <ResponsiveContainer width="90%" height={200} className={`mx-auto`}>
                        <AreaChart width={600} height={300} data={data}>
                            <XAxis dataKey="name" tick={{ fill: '#FFFFFF' }} tickMargin={10} />
                            <YAxis width={100} domain={[minValue, maxValue]} tick={{ fill: '#FFFFFF' }} tickMargin={10} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                            <Area type="monotone" dataKey={choices[graphData]} stroke={dataColorChoices[graphData]} strokeWidth={1} fill={dataColorChoices[graphData]} fillOpacity={0.5} />
                            <Tooltip cursor={false} content={(props) => {
                                console.log(props);
                                return ( props.payload.length > 0 ? (
                                    <div className={`rounded-lg bg-neutral p-2 bg-opacity-80`}>
                                        <p className={`text-sm mb-1`}>{props.label}</p>
                                        <p style={{ color: props.payload[0].color }}>{props.payload[0].dataKey}: ${Number(props.payload[0].value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>) : (<div className={`hidden fixed top-0 left-0`}></div>)
                                )
                            }} formatter={(value) => `$${value.toLocaleString()}`} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className={`bg-base-200 border border-neutral text-white p-5 rounded-lg col-span-1`}>
                    <p className={`text-2xl font-semibold mb-5 flex items-center justify-between`}>Account Details <span className={`flex items-center gap-2`}><input type={`date`} className={`text-base font-normal px-2 py-1 rounded-lg bg-base-100 border-2 hover:border-gray-500 border-gray-600 focus:border-gray-500 outline-none cursor-pointer`} /><FaRotateRight size={36} color="white" className={`cursor-pointer p-2 hover:bg-gray-400 hover:bg-opacity-25 rounded-lg transition-all duration-200 ease-in-out`} /></span></p>
                    <div className={`flex items-center gap-6`}>
                        <div className={`flex flex-col gap-3 w-1/2`}>
                            {accDetails.map((detail, index) => {
                                return (
                                    <div key={index} className={`flex items-center gap-3`}><span className={`text-base text-gray-400`}>{Object.keys(detail)[0]}</span><div className={`flex-1 h-0.5 rounded-full bg-gray-400`}></div><span className={`text-base text-gray-300`}>{Object.values(detail)[0]}</span></div>
                                )
                            })}
                        </div>
                        <div className={`flex flex-col gap-3 w-1/2`}>
                            {accDetails2.map((detail, index) => {
                                return (
                                    <div key={index} className={`flex items-center gap-3`}><span className={`text-base text-gray-400`}>{Object.keys(detail)[0]}</span><div className={`flex-1 h-0.5 rounded-full bg-gray-400`}></div><span className={`text-base text-gray-300`}>{Object.values(detail)[0]}</span></div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {showFullPreview === true && (
                <>
                    <div className={`grid grid-cols-3 gap-7 mb-7`}>
                        <div className={`2xl:col-span-2 xl:col-span-3 bg-base-200 border border-neutral text-white p-5 rounded-lg`}>
                            <p className={`text-2xl font-semibold mb-5 flex items-center justify-between`}>Equity Positions</p>
                            <div className="overflow-x-auto h-fit">
                                <table className="table table-zebrah-fit">
                                    <thead>
                                        <tr>
                                            <th>Ticker</th>
                                            <th>Date</th>
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
                                        {currentRows && currentRows.map((position, index) => {
                                            return (
                                                <tr key={index} className={`${index % 2 === 0 ? `bg-base-300` : `bg-base-100`} cursor-pointer hover:bg-base-200 ${index === 0 && `rounded-t-lg`} ${index === currentRows.length - 1 && `rounded-b-lg`}`}>
                                                    <td>{position.ticker}</td>
                                                    <td>{position.date}</td>
                                                    <td>{position.position}</td>
                                                    <td>{position.quantity}</td>
                                                    <td>{position.costBasis !== "---" && "$"}{position.costBasis}</td>
                                                    <td>${position.previousClose}</td>
                                                    <td>${position.currentPrice}</td>
                                                    <td className={`${parseFloat(position.priceChange.substring(0, position.priceChange.length)) < 0 ? 'text-red-500' : 'text-green-500'}`}>{position.priceChange}</td>
                                                    <td>${position.marketValue}</td>
                                                    <td className={`${position.gainLoss.toString().indexOf("-") === 0 && position.status !== "Pending" ? `text-red-500` : position.gainLoss.toString().indexOf("-") === -1 && position.status !== "Pending" && `text-green-500`}`}>{position.gainLoss !== "---" && "$"}{position.gainLoss}</td>
                                                    <td className={`flex items-center gap-1.5`}><FaCircle size={10} className={`${position.status === "Pending" ? `fill-yellow-500` : 'fill-green-500'}`} />{position.status}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div className={`w-full h-0.5 bg-gray-400 rounded-full my-2`}></div>
                                <div className={`w-full flex items-center justify-between`}>
                                    <p className={`text-base-content 2xl:w-1/3 xl:w-1/2 text-opacity-80 font-medium`}>* Intraday positions represent your aggregate net holdings after any intraday purchases or sales</p>
                                    <div className="join ml-auto">
                                        <button onClick={goToPreviousPage} className={`join-item disabled:cursor-not-allowed btn ${currentEquityPage === 1 && `btn-disabled`}`}>«</button>
                                        <button disabled className="join-item btn disabled:bg-base-200 disabled:text-white">Page {currentEquityPage}</button>
                                        <button onClick={goToNextPage} className={`join-item disabled:cursor-not-allowed btn ${currentEquityPage === totalPages && `btn-disabled`}`}>»</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`2xl:col-span-1 xl:col-span-3 bg-base-200 border border-neutral text-white p-5 rounded-lg`}>
                            <p className={`text-2xl font-semibold mb-5 flex items-center justify-between h-fit`}>Watchlists<span className={`flex items-center gap-2 font-normal text-base cursor-pointer hover:bg-gray-200 hover:bg-opacity-15 transition-all duration-200 ease-in-out px-2 py-1 rounded-lg`}>See All <FaArrowRightLong size={20} color="white" /></span></p>
                            <div className="flex-grow overflow-y-auto min-h-0">
                                <div className={`flex flex-col justify-between`}>
                                    {watchlist.map((watched, index) => {
                                        const minMaxValues = watched.graphData.reduce(
                                            (acc, dataPoint) => {
                                            const price = dataPoint.price;
                                            return {
                                                min: Math.min(acc.min, price),
                                                max: Math.max(acc.max, price)
                                            };
                                            },
                                            { min: Infinity, max: -Infinity }
                                        );
                                        
                                        const minYValue = minMaxValues.min;
                                        const maxYValue = minMaxValues.max;

                                        return (
                                            <>
                                                <div onClick={() => console.log("OVERALL")} key={index} className={`grid grid-cols-10 mt-2 cursor-pointer transition-all duration-200 ease-in-out`}>
                                                    <div className={`col-span-3 flex items-center gap-1.5`}>
                                                        <img src={watched.logo} className={`w-8 h-8 rounded-full`} />
                                                        <div>
                                                            <p className={`text-white`}>{watched.ticker}</p>
                                                            <p className={`text-base-content font-medium`}>{formatText(watched.companyName, 20)}</p>
                                                        </div>
                                                    </div>
                                                    <div className={`col-span-5 flex justify-center items-center`}>
                                                        <ResponsiveContainer className={`2xl:w-3/4 xl:w-full`} height={50}>
                                                            <AreaChart data={watched.graphData} style={{ cursor: 'pointer' }} onClick={() => console.log("CHART")}>
                                                            <defs>
                                                                <linearGradient id="greenC" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                                                    <stop offset="100%" stopColor="#82ca9d" stopOpacity={0}/>
                                                                </linearGradient>
                                                                <linearGradient id="redC" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#FF6347" stopOpacity={0.8}/>
                                                                    <stop offset="100%" stopColor="#FF6347" stopOpacity={0}/>
                                                                </linearGradient>
                                                            </defs>
                                                                <YAxis domain={[minYValue - 1, maxYValue + 1]} hide={true} />
                                                                <Area type="monotone" dataKey={"price"} stroke={watched.percentChange >= 0 ? `#82ca9d` : `#FF6347`} strokeWidth={1} fill={watched.percentChange >= 0 ? `url(#greenC)` : `url(#redC)`} fillOpacity={0.5} />
                                                            </AreaChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                    <div className={`col-span-2`}>
                                                        <p className={`text-white text-right`}>${watched.cost}</p>
                                                        <p className={`text-base-content flex items-center gap-1 justify-end ${watched.percentChange < 0 ? `text-red-500` : `text-green-500`}`}>{watched.percentChange < 0 ? <FaCircleArrowDown size={15} className={`fill-red-500`} /> : <FaCircleArrowUp size={15} className={`fill-green-500`} />}{watched.percentChange}%</p>
                                                    </div>
                                                </div>
                                                <div className={`h-[0.25px] bg-gray-400 mt-2 rounded-full`}></div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`grid grid-cols-2 gap-7`}>
                        <div className={`bg-base-200 border border-neutral text-white p-5 rounded-lg xl:col-span-2 2xl:col-span-1`}>
                            <p className={`text-2xl font-semibold mb-5 flex items-center justify-between h-fit`}>Market News<span className={`flex items-center gap-2 font-normal text-base cursor-pointer hover:bg-gray-200 hover:bg-opacity-15 transition-all duration-200 ease-in-out px-2 py-1 rounded-lg`}>See All <FaArrowRightLong size={20} color="white" /></span></p>
                            <div className={`p-2 px-20 rounded-md border border-neutral text-white bg-base-300 shadow flex items-center justify-between mb-5`}>
                                <p className={`px-2 py-1 rounded-md bg-gray-400 bg-opacity-15 hover:bg-gray-400 hover:bg-opacity-15 transition-all duration-200 ease-in-out cursor-pointer`}>General</p>
                                <p className={`px-2 py-1 rounded-md hover:bg-gray-400 hover:bg-opacity-15 transition-all duration-200 ease-in-out cursor-pointer`}>Technology</p>
                                <p className={`px-2 py-1 rounded-md hover:bg-gray-400 hover:bg-opacity-15 transition-all duration-200 ease-in-out cursor-pointer`}>Health Technology</p>
                                <p className={`px-2 py-1 rounded-md hover:bg-gray-400 hover:bg-opacity-15 transition-all duration-200 ease-in-out cursor-pointer`}>Finance</p>
                                <p className={`px-2 py-1 rounded-md hover:bg-gray-400 hover:bg-opacity-15 transition-all duration-200 ease-in-out cursor-pointer`}>Defense</p>
                            </div>
                            {marketNews && marketNews.results.map((result, index) => {
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
                                                            <li onClick={(e) => {e.preventDefault(); e.stopPropagation(); setNewsInsights(result.insights); setKeywords(result.keywords); document.getElementById("overview-modal").showModal()}}><a>See Overview</a></li>
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
                            })}
                        </div>
                    </div>
                    <dialog id="overview-modal" className="modal">
                        <div className="modal-box w-11/12 max-w-3xl">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg mb-2">Article Overview</h3>
                            <p className={`text-lg font-semibold text-center mb-1.5 text-white`}>Keywords</p>
                            <div className={`flex items-center flex-wrap gap-2 justify-center mb-4`}>
                                {keywords && keywords.map((keyword, index) => {
                                    return (
                                        <p key={index} className={`badge badge-neutral px-2 py-1`}>{keyword}</p>
                                    )
                                })}
                            </div>
                            <p className={`text-lg font-semibold text-center mb-1.5 text-white`}>Ticker Sentiment</p>
                            {newsInsights && newsInsights.map((insight, index) => {
                                return (
                                    <div key={index} className={`mb-3 border border-neutral rounded-lg shadow p-2 bg-base-300`}>
                                        <p className={`flex items-center gap-1 mb-1`}>
                                            <span key={index} onClick={(e) => e.stopPropagation()} className={`px-1 rounded-sm w-fit bg-gray-400 bg-opacity-20 font-semibold flex items-center gap-1 cursor-pointer hover:bg-opacity-30 transition-all duration-200 ease-in-out`}>
                                                <a href={`https://www.tradingview.com/symbols/${insight.ticker}/`} target="_blank" rel="noopener noreferrer">
                                                    {insight.ticker}
                                                    <span className={`text-green-500 text-sm ml-1`}>+{0.35 + index}%</span>
                                                </a>
                                            </span> • {toTitleCase(insight.sentiment)}
                                        </p>
                                        <p>{insight.sentiment_reasoning}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
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
                </>
            )}
        </div>
    )
}