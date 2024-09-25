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

export default function App() {
  const [todos, setTodos] = useState([])
  const location = useLocation();

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
    </div>
  )
}