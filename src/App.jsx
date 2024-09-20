import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
// import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className={`flex-1 flex flex-row bg-base-300 min-h-screen`} data-theme="dark">
      <Sidebar />
      <div className={`flex-1 flex flex-col `}>
        <Navbar />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}