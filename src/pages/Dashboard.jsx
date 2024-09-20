import { FaMoneyBillTrendUp, FaMoneyBills, FaCreditCard, FaWallet, FaAngleDown, FaArrowRightLong } from "react-icons/fa6";
import * as React from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
// import { PieChart } from '@mui/x-charts/PieChart';

export default function Dashboard() {

    const [graphData, setGraphData] = React.useState(0);
    const [minValue, setMinValue] = React.useState(0);
    const [maxValue, setMaxValue] = React.useState(0);
    const choices = ["Total Equity", "Total Longs", "Total Shorts", "Cash"]
    const dataColorChoices = ["#82ca9d", "#FFA500", "#FF6347", "#007BFF"]

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
        },
    ]

    React.useEffect(() => {
        setMinValue(Math.min(...data.map(d => graphData === 0 ? d.te : graphData === 1 ? d.tl : graphData === 2 ? d.ts : d.c)) - (Math.min(...data.map(d => graphData === 0 ? d.te : graphData === 1 ? d.tl : graphData === 2 ? d.ts : d.c)) === 0 ? 0 : 1));
        setMaxValue(Math.max(...data.map(d => graphData === 0 ? d.te : graphData === 1 ? d.tl : graphData === 2 ? d.ts : d.c)) + 1);
    }, [graphData]);

    return (
        <div data-theme="dark" className={`flex-1 bg-base-200 p-10`}>
            <div className={`grid grid-cols-4 gap-7 mb-7`}>
                <div className={`bg-base-100 border-2 border-neutral text-white p-3 rounded-lg flex flex-col justify-between`}>
                    <p className={`font-semibold text-gray-400 flex mb-2 justify-between`}><span>Total Equity</span><span className={`bg-green-500 bg-opacity-50 border-2 rounded-md border-green-500 border-opacity-75`}><FaMoneyBills color="white" className={`m-1.5`} size={25} /></span></p>
                    <p className={`text-2xl flex items-center justify-between font-semibold`}><span>$100,038.60</span><span className={`text-green-400 text-sm font-medium`}> +0.039% <span className={`text-gray-400`}> +$38.60</span></span></p>
                </div>
                <div className={`bg-base-100 border-2 border-neutral text-white p-3 rounded-lg flex flex-col justify-between`}>
                    <p className={`font-semibold text-gray-400 flex mb-2 justify-between`}><span>Net Equity Gain</span><span className={`bg-blue-400 bg-opacity-50 border-2 rounded-md border-blue-400 border-opacity-75`}><FaMoneyBillTrendUp color="white" className={`m-1.5`} size={25} /></span></p>
                    <p className={`text-2xl font-semibold`}><span>$38.60</span></p>
                </div>
                <div className={`bg-base-100 border-2 border-neutral text-white p-3 rounded-lg  flex flex-col justify-between`}>
                    <p className={`font-semibold text-gray-400 flex mb-2 justify-between`}><span>Buying Power</span><span className={`bg-purple-500 bg-opacity-50 border-2 rounded-md border-purple-500 border-opacity-75`}><FaCreditCard color="white" className={`m-1.5`} size={25} /></span></p>
                    <p className={`text-2xl font-semibold`}><span>$133,569.01</span></p>
                </div>
                <div className={`bg-base-100 border-2 border-neutral text-white p-3 rounded-lg  flex flex-col justify-between`}>
                    <p className={`font-semibold text-gray-400 flex mb-2 justify-between`}><span>Cash Balance</span><span className={`bg-yellow-500 bg-opacity-50 border-2 rounded-md border-yellow-500 border-opacity-75`}><FaWallet color="white" className={`m-1.5`} size={25} /></span></p>
                    <p className={`text-2xl font-semibold`}><span>$94,879.50</span></p>
                </div>
            </div>
            <div className={`grid grid-cols-4 gap-7 mb-7`}>
                <div className={`col-span-2 bg-base-100 border-2 border-neutral text-white p-5 rounded-lg`}>
                    <p className={`text-2xl font-semibold mb-5 flex justify-between`}>
                        <span>Portfolio Summary</span>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1 flex items-center gap-1">{choices[graphData]} <FaAngleDown size={20} color="white" /></div>
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
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" tick={{ fill: '#FFFFFF' }} tickMargin={10} />
                            <YAxis width={100} domain={[minValue, maxValue]} tick={{ fill: '#FFFFFF' }} tickMargin={10} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                            <Area type="monotone" dataKey={choices[graphData]} stroke={dataColorChoices[graphData]} strokeWidth={2} fill={dataColorChoices[graphData]} fillOpacity={0.5} />
                            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className={`bg-base-100 border-2 border-neutral text-white p-5 rounded-lg col-span-2`}>
                    <p className={`text-2xl font-semibold mb-5`}>Account Details</p>
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
            <div className={`grid grid-cols-7 gap-7`}>
                <div className={`col-span-3 bg-base-100 border-2 border-neutral text-white p-5 rounded-lg`}>
                    <p className={`text-2xl font-semibold mb-5 flex items-center justify-between`}>Equity Positions<span className={`flex items-center gap-2 font-normal text-base cursor-pointer hover:bg-gray-200 hover:bg-opacity-25 transition-all duration-200 ease-in-out px-2 py-1 rounded-lg`}>See All <FaArrowRightLong size={20} color="white" /></span></p>
                </div>
                <div className={`col-span-2 bg-base-100 border-2 border-neutral text-white p-5 rounded-lg`}>
                    <p className={`text-2xl font-semibold mb-5 flex items-center justify-between`}>Watchlists<span className={`flex items-center gap-2 font-normal text-base cursor-pointer hover:bg-gray-200 hover:bg-opacity-25 transition-all duration-200 ease-in-out px-2 py-1 rounded-lg`}>See All <FaArrowRightLong size={20} color="white" /></span></p>
                </div>
                <div className={`col-span-2 bg-base-100 border-2 border-neutral text-white p-5 rounded-lg`}>
                    <p className={`text-2xl font-semibold mb-5 flex items-center justify-between`}>News<span className={`flex items-center gap-2 font-normal text-base cursor-pointer hover:bg-gray-200 hover:bg-opacity-25 transition-all duration-200 ease-in-out px-2 py-1 rounded-lg`}>See All <FaArrowRightLong size={20} color="white" /></span></p>
                </div>
            </div>
        </div>
    )
}

{/* <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: stocksMoney / (stocksMoney + mutualFundsMoney + bondsMoney + cash), label: 'Stocks' },
                                        { id: 1, value: mutualFundsMoney / (stocksMoney + mutualFundsMoney + bondsMoney + cash), label: 'Mutual Funds' },
                                        { id: 2, value: bondsMoney / (stocksMoney + mutualFundsMoney + bondsMoney + cash), label: 'Bonds' },
                                        { id: 3, value: cash / (stocksMoney + mutualFundsMoney + bondsMoney + cash), label: 'Cash' },
                                    ],
                                    innerRadius: 50,
                                    outerRadius: 100,
                                    paddingAngle: 0,
                                    cornerRadius: 0,
                                    startAngle: -285,
                                    endAngle: 80,
                                },
                            ]}
                            slotProps={{ legend: { hidden: true, } }}
                            width={400}
                            height={200}
                        /> */}