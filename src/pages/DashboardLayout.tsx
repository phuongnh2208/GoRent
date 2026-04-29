import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CarFront, 
  FileText, 
  Users, 
  CreditCard, 
  Wrench, 
  ChevronRight, 
  Bell, 
  Search, 
  LogOut,
  Settings,
  Plus,
  ClipboardCheck,
  History,
  Menu as MenuIcon,
  User as UserIcon
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

// Import sub-pages
import AdminOverview from './dashboards/AdminOverview';
import UserManagement from './dashboards/UserManagement';
import CarManagement from './dashboards/CarManagement';
import RentalStaffDashboard from './dashboards/RentalStaffDashboard';
import AccountingDashboard from './dashboards/AccountingDashboard';
import MaintenanceDashboard from './dashboards/MaintenanceDashboard';
import TechnicalDashboard from './dashboards/TechnicalDashboard';
import RevenueReport from './dashboards/RevenueReport';
import ContractDetail from './dashboards/ContractDetail';
import NewContract from './dashboards/NewContract';

export default function DashboardLayout() {
  const { currentUser, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!currentUser) return null;

  const adminLinks = [
    { name: 'Tổng quan', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Quản lý xe', icon: CarFront, path: '/dashboard/cars' },
    { name: 'Quản lý người dùng', icon: Users, path: '/dashboard/users' },
    { name: 'Báo cáo doanh thu', icon: FileText, path: '/dashboard/revenue' },
  ];

  const rentalLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Tạo hợp đồng', icon: Plus, path: '/dashboard/new-contract' },
    { name: 'Quản lý hợp đồng', icon: FileText, path: '/dashboard/contracts' },
    { name: 'Giao nhận xe', icon: CarFront, path: '/dashboard/delivery' },
  ];

  const technicalLinks = [
    { name: 'Kiểm định xe', icon: ClipboardCheck, path: '/dashboard' },
    { name: 'Lịch sử kiểm định', icon: History, path: '/dashboard/history' },
  ];

  const accountingLinks = [
    { name: 'Tổng quan', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Giao dịch', icon: CreditCard, path: '/dashboard/transactions' },
    { name: 'Doanh thu', icon: FileText, path: '/dashboard/revenue' },
  ];

  const maintenanceLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Danh sách xe', icon: CarFront, path: '/dashboard/maintenance-cars' },
    { name: 'Lịch bảo dưỡng', icon: Wrench, path: '/dashboard/schedule' },
  ];

  let links = [];
  switch(currentUser.role) {
    case 'admin': links = adminLinks; break;
    case 'rental_staff': links = rentalLinks; break;
    case 'technical_staff': links = technicalLinks; break;
    case 'accounting_staff': links = accountingLinks; break;
    case 'maintenance_staff': links = maintenanceLinks; break;
    default: links = [];
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#fcf8f8] overflow-hidden font-sans relative">
      {/* Background Decorative Blur */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-maroon/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-maroon/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Sidebar */}
      <aside className={`glass border-r border-white/20 transition-all duration-300 flex flex-col z-30 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-maroon rounded-lg flex items-center justify-center shrink-0">
              <CarFront className="text-white w-5 h-5" />
            </div>
            {isSidebarOpen && <span className="font-bold text-xl tracking-tighter text-maroon">GoRent</span>}
          </Link>
        </div>

        <nav className="flex-grow px-3 space-y-1 mt-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-4 py-3 rounded-xl transition-all group ${
                location.pathname === link.path 
                ? 'bg-maroon text-white shadow-lg shadow-maroon/20' 
                : 'text-gray-500 hover:bg-white/50 hover:text-maroon'
              }`}
            >
              <link.icon className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              {isSidebarOpen && <span className="text-sm font-medium">{link.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/20">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center px-4 py-3 rounded-xl text-maroon opacity-60 hover:opacity-100 hover:bg-maroon/5 transition-all"
           >
             <LogOut className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
             {isSidebarOpen && <span className="text-sm font-medium">Đăng xuất</span>}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="bg-white/40 backdrop-blur-md border-b border-white/20 h-16 flex items-center justify-between px-8 shrink-0 z-20">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/60 rounded-lg text-gray-500 hover:text-maroon transition-colors"
            >
              <MenuIcon />
            </button>
            <h2 className="font-bold text-maroon">
              {currentUser.role === 'admin' ? 'Hệ thống Quản trị' : 
               currentUser.role === 'rental_staff' ? 'Quản lý Dịch vụ' :
               currentUser.role === 'technical_staff' ? 'Quản lý Kỹ thuật' :
               currentUser.role === 'accounting_staff' ? 'Quản lý Tài chính' : 'Quản lý Bảo dưỡng'}
            </h2>
          </div>

          <div className="flex items-center space-x-6">
             <div className="hidden md:flex items-center bg-white/40 border border-white/20 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-maroon/10 transition-all">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input type="text" placeholder="Tìm kiếm nhanh..." className="bg-transparent border-none focus:outline-none text-xs w-48" />
             </div>
             
             <button className="relative p-2 text-gray-400 hover:text-maroon transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-maroon-light rounded-full border-2 border-white"></span>
             </button>

             <div className="flex items-center space-x-3 pl-4 border-l border-gray-100">
                <div className="text-right">
                   <p className="text-xs font-bold">{currentUser.name}</p>
                   <p className="text-[10px] font-bold uppercase text-black tracking-widest">{currentUser.role}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                   <UserIcon className="w-4 h-4 text-gray-400" />
                </div>
             </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
           <Routes>
              <Route index element={
                 currentUser.role === 'admin' ? <AdminOverview /> :
                 currentUser.role === 'rental_staff' ? <RentalStaffDashboard /> :
                 currentUser.role === 'technical_staff' ? <TechnicalDashboard /> :
                 currentUser.role === 'accounting_staff' ? <AccountingDashboard /> :
                 <MaintenanceDashboard />
              } />
              
              {/* Admin specific */}
              <Route path="users" element={<UserManagement />} />
              <Route path="cars" element={<CarManagement />} />
              
              {/* Rental specific */}
              <Route path="new-contract" element={<NewContract />} />
              <Route path="contracts" element={<RentalStaffDashboard />} />
              <Route path="delivery" element={<RentalStaffDashboard mode="delivery" />} />
              <Route path="contract/:id" element={<ContractDetail />} />

              {/* Maintenance specific */}
              <Route path="maintenance-cars" element={<MaintenanceDashboard />} />
              <Route path="schedule" element={<MaintenanceDashboard />} />

              {/* Accounting / Admin Reports */}
              <Route path="transactions" element={<AccountingDashboard />} />
              <Route path="revenue" element={<RevenueReport />} />
              <Route path="reports" element={<RevenueReport />} />
              
              {/* Technical specific */}
              <Route path="history" element={<TechnicalDashboard />} />
              
              {/* Catch-all */}
              <Route path="*" element={<div className="flex items-center justify-center h-full text-maroon/40 text-sm italic">Không tìm thấy trang yêu cầu hoặc bạn không có quyền truy cập.</div>} />
           </Routes>
        </div>
      </main>
    </div>
  );
}

