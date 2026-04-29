import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { 
  CarFront, 
  LayoutDashboard, 
  FileText, 
  Wrench, 
  CreditCard, 
  Users, 
  LogOut, 
  User as UserIcon,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const { currentUser, logout } = useAppContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass border-b border-white/20 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-maroon rounded-xl flex items-center justify-center">
                <CarFront className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-maroon">GoRent</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-maroon transition-colors">Trang chủ</Link>
            <Link to="/cars" className="text-sm font-medium text-gray-600 hover:text-maroon transition-colors">Danh sách xe</Link>
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center space-x-2 glass bg-white/40 px-3 py-1.5 rounded-full border border-white/60 hover:bg-white/60 transition-all font-sans"
                >
                  <UserIcon className="w-4 h-4 text-maroon" />
                  <span className="text-sm font-medium text-maroon">{currentUser.name}</span>
                </button>
                <button onClick={handleLogout} className="text-gray-400 hover:text-maroon transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-maroon text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-maroon-dark transition-all shadow-lg shadow-maroon/20">
                Đăng nhập
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-2"
          >
            <Link to="/" className="block py-2 text-base font-medium text-gray-900">Trang chủ</Link>
            <Link to="/cars" className="block py-2 text-base font-medium text-gray-900">Danh sách xe</Link>
            {currentUser ? (
               <>
                 <Link to="/dashboard" className="block py-2 text-base font-medium text-gray-900">Dashboard</Link>
                 <button onClick={handleLogout} className="block w-full text-left py-2 text-base font-medium text-red-600">Đăng xuất</button>
               </>
            ) : (
              <Link to="/login" className="block py-2 text-base font-medium text-maroon">Đăng nhập</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="glass bg-white/20 border-t border-white/10 py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center space-x-2 mb-4">
             <div className="w-8 h-8 bg-maroon rounded-lg flex items-center justify-center">
                <CarFront className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-maroon">GoRent</span>
          </Link>
          <p className="text-gray-500 text-sm max-w-xs">
            Dịch vụ cho thuê xe hàng đầu với hệ thống quản lý chuyên nghiệp, minh bạch và tận tâm.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-maroon">Hệ thống</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/cars" className="hover:text-maroon transition-colors text-maroon">Thuê xe ngay</Link></li>
            <li><Link to="/login" className="hover:text-maroon transition-colors text-maroon">Đối tác</Link></li>
            <li><Link to="/" className="hover:text-maroon transition-colors text-maroon">Quy trình</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-maroon">Liên hệ</h4>
          <p className="text-sm text-gray-600">
            Email: contact@gorent.vn<br />
            Phone: 1900 1234
          </p>
        </div>
      </div>
      <div className="border-t border-gray-100 mt-12 pt-8 text-center text-xs text-black font-semibold opacity-60">
        &copy; 2024 GoRent Management System. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- Layouts ---

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-[#fcf8f8] font-sans selection:bg-maroon selection:text-white relative overflow-hidden">
    {/* Decorative Background for Main Layout */}
    <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-maroon/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-maroon/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    
    <Navbar />
    <main className="flex-grow pt-16">
      {children}
    </main>
    <Footer />
  </div>
);

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode, roles?: string[] }) => {
  const { currentUser } = useAppContext();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// --- Pages (Placeholders for now) ---

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-[#fcf8f8]">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      className="w-12 h-12 border-4 border-maroon/10 border-t-maroon rounded-full"
    />
  </div>
);

// We will implement these in separate files or as imports if possible.
// For now, I'll put everything in App.tsx to ensure immediate visibility and then split.

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/cars" element={<MainLayout><CarListing /></MainLayout>} />
          <Route path="/car/:id" element={<MainLayout><CarDetail /></MainLayout>} />
          <Route path="/payment" element={<MainLayout><Payment /></MainLayout>} />
          <Route path="/contract/success" element={<MainLayout><SuccessContract /></MainLayout>} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

// --- Page Implementations (Will move to separate files later) ---

import Home from './pages/Home';
import Login from './pages/Login';
import DashboardLayout from './pages/DashboardLayout';
import CarListing from './pages/CarListing';
import CarDetail from './pages/CarDetail';
import Payment from './pages/Payment';
import SuccessContract from './pages/SuccessContract';
