import { Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './utils/supabase';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import AccountSummary from './pages/AccountSummary';
import AccountHoldings from './pages/AccountHoldings';
import TransactionHistory from './pages/TransactionHistory';
import MakeTrade from './pages/MakeTrade';
import PendingOrders from './pages/PendingOrders';
import TransactionNotes from './pages/TransactionNotes';
import TickerSearch from './pages/TickerSearch';
import News from './pages/News';
import Blog from './pages/Blog';
import Watchlists from './pages/Watchlists';
import Alerts from './pages/Alerts';
import Navbar from './components/Navbar';
import PageNotFound from './pages/PageNotFound';
import { IoChatbox } from "react-icons/io5";
import { RiAttachmentLine } from "react-icons/ri";
import { VscClose } from "react-icons/vsc";
import { BiSolidSend } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { motion } from 'framer-motion';

export default function App() {
  const [todos, setTodos] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [supportInput, setSupportInput] = useState("");
  const location = useLocation();
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "Josh",
      message: "Hey how can I help you today?",
      time: "12:45"
    },
    {
      sender: "You",
      message: "I have a question about my account.",
      time: "12:46"
    },
    {
      sender: "Josh",
      message: "Sure, what do you need help with?",
      time: "12:47"
    },
    {
      sender: "You",
      message: "I'm unable to log in, it says my password is incorrect.",
      time: "12:48"
    },
    {
      sender: "Josh",
      message: "Let me reset your password. You should get an email shortly.",
      time: "12:49"
    },
    {
      sender: "You",
      message: "Got it, thanks!",
      time: "12:50"
    },
    {
      sender: "Josh",
      message: "No problem! Is there anything else I can help with?",
      time: "12:51"
    },
    {
      sender: "You",
      message: "Actually, yes. I also can't access my billing information.",
      time: "12:52"
    },
    {
      sender: "Josh",
      message: "Let me take a look at that for you. One moment please.",
      time: "12:53"
    },
    {
      sender: "Josh",
      message: "Okay, I've updated your billing info. You should have access now.",
      time: "12:55"
    },
    {
      sender: "You",
      message: "Awesome, it works! Thanks again for your help.",
      time: "12:56"
    },
    {
      sender: "Josh",
      message: "You're welcome! Have a great day!",
      time: "12:57"
    },
    {
      sender: "You",
      message: "You too!",
      time: "12:58"
    }
  ]);

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('todos').select()
      console.log(todos)

      if (todos.length > 1) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [])

  useEffect(() => {
    if (isFocused) {
      document.getElementById('support-input').addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
          const currentTime = new Date();
          const options = { hour: '2-digit', minute: '2-digit', hour12: false };
          const localeTime = currentTime.toLocaleTimeString([], options);
          console.log(supportInput)
          setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { sender: "You", message: supportInput, time: localeTime }
          ]);
    
          setSupportInput("");
        }
      });
    } else {
      document.getElementById('support-input').removeEventListener('keypress', function(event) {

      });
    }
  }, [isFocused]);

  

  return (
    <div className={`flex-1 flex flex-row bg-base-300 min-h-screen`} data-theme="dark">
      {location.pathname !== '/' && <Sidebar />}
      <div className={`flex-1 flex flex-col `}>
        {location.pathname !== '/' && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account-summary' element={<AccountSummary />} />
          <Route path='/account-holdings' element={<AccountHoldings />} />
          <Route path='/transaction-history' element={<TransactionHistory />} />
          <Route path='/make-trade' element={<MakeTrade />} />
          <Route path='/pending-orders' element={<PendingOrders />} />
          <Route path='/transaction-notes' element={<TransactionNotes />} />
          <Route path='/ticker-search' element={<TickerSearch />} />
          <Route path='/ticker-search/:symbol/overview' element={<TickerSearch />} />
          <Route path='/news' element={<News />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/watchlists' element={<Watchlists />} />
          <Route path='/alerts' element={<Alerts />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
      {/* <motion.div key={isOpen} initial="hidden" animate="visible" className={`h-96 w-60 p-2 rounded-lg bg-white fixed bottom-20 right-5 z-[100]`}></motion.div> */}
      <motion.div layout data-isOpen={isOpen} onClick={() => setIsOpen(true)} initial={{ borderRadius: 50 }} transition={{ duration: 0.5, ease: "circInOut" }} className={`fixed something bottom-5 right-5 rounded-lg bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition-colors ease-in-out duration-200 z-[100]`}>
        <IoChatbox className={`m-4 something2`} size={24} fill='white' />
        <div className={`something3 flex flex-col min-h-full`}>
          <div className={`flex items-center justify-between w-full px-4 py-2 border-b border-neutral`}>
            <p className={`font-medium text-base-content text-lg flex items-center gap-1`}>Support <GoDotFill className={`fill-green-500`} size={20} /></p>
            <span onClick={(e) => {e.preventDefault(); e.stopPropagation(); setIsOpen(false); console.log("HELLO, CLOSE PRESSED")}} className={`rounded-full hover:bg-neutral hover:bg-opacity-45 cursor-pointer transition-all duration-200 ease-in-out`}><VscClose size={20} className={`m-3`} /></span>
          </div>
          <div className={`flex-grow py-2 overflow-y-scroll px-4 h-80 scrollbar`}>
            {chatHistory.map((message, index) => {
              return (
                <div className={`chat ${index !== chatHistory.length && `mb-1`} ${message.sender === "You" ? `chat-end`: `chat-start`}`}>
                  <div className={`chat-header`}>
                    {message.sender}
                    <time className={`text-xs ml-1 opacity-50`}>{message.time}</time>
                  </div>
                  <div className={`chat-bubble ${message.sender === "You" && `bg-green-500 text-black`}`}>{message.message}</div>
                </div>
              )
            })}
          </div>
          <div className={`flex items-center gap-1 justify-between w-full px-4 py-2 border-t border-neutral`}>
            <input value={supportInput} onChange={(e) => setSupportInput(e.target.value)} onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)} id='support-input' type="text" placeholder="Enter your message here" className="input input-bordered rounded-full py-2 flex-1" />
            <span className={`rounded-full hover:bg-neutral hover:bg-opacity-45 cursor-pointer transition-all duration-200 ease-in-out`}><RiAttachmentLine size={20} className={`m-3`} /></span>
            <span className={`rounded-full hover:bg-neutral hover:bg-opacity-45 cursor-pointer transition-all duration-200 ease-in-out`}><BiSolidSend size={20} className={`m-3`} /></span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}