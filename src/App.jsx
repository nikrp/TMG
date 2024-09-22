import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AccountSummary from './pages/AccountSummary';
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
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  )
}