import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
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
// import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className={`flex-1 flex flex-row bg-base-300 min-h-screen`} data-theme="dark">
      <Sidebar />
      <div className={`flex-1 flex flex-col `}>
        <Navbar />
        <Routes>
          <Route path='/' element={<AccountSummary />} />
          <Route path='/account-summary' element={<AccountSummary />} />
          <Route path='/account-holdings' element={<AccountHoldings />} />
          <Route path='/transaction-history' element={<TransactionHistory />} />
          <Route path='/make-trade' element={<MakeTrade />} />
          <Route path='/pending-orders' element={<PendingOrders />} />
          <Route path='/transaction-notes' element={<TransactionNotes />} />
          <Route path='/ticker-search' element={<TickerSearch />} />
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