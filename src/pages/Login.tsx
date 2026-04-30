import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CarFront, Lock, Mail, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError('Tài khoản hoặc mật khẩu không chính xác.');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 selection:bg-maroon selection:text-white overflow-hidden font-sans">
      {/* Cinematic Background Image */}
      <div 
        className="absolute inset-0 z-0 scale-105"
        style={{
          backgroundImage: 'url("https://kovar.vn/wp-content/uploads/2020/08/bmw-i8.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) contrast(1.1)'
        }}
      />
      
      {/* Decorative Gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-maroon/40 via-transparent to-black/60 z-1" />

      <div className="absolute top-8 left-8 z-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-white/50 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-white/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Trở về trang chủ</span>
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] p-8 md:p-12 shadow-3xl shadow-black/50 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-maroon rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-maroon/40 ring-4 ring-white/10">
            <CarFront className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white">GoRent Concierge</h1>
          <p className="text-sm text-white/60 font-medium mt-2">Hệ thống quản lý dịch vụ vận hành</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl flex items-center text-sm mb-6"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Tên đăng nhập</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Ví dụ: admin, nvtx, nvkt, nvky, nvbd"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maroon focus:bg-white/10 transition-all text-sm font-medium text-white placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Nhập 123 để đăng nhập"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maroon focus:bg-white/10 transition-all text-sm font-medium text-white placeholder:text-white/20"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-maroon text-white py-4 rounded-2xl font-bold hover:bg-maroon-dark transition-all flex items-center justify-center disabled:opacity-50 shadow-lg shadow-maroon/20"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-center text-[10px] font-bold uppercase text-white/30 tracking-widest">
            Tài khoản mẫu: 123
          </p>
          <div className="grid grid-cols-3 gap-2 mt-4">
             {['admin', 'nvtx', 'nvkt', 'nvky', 'nvbd'].map(role => (
               <div key={role} className="text-center text-[10px] py-1.5 bg-white/5 rounded-xl text-white/60 font-bold border border-white/5 uppercase tracking-tighter">
                 {role}
               </div>
             ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
