import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Search, 
  ChevronRight, 
  User, 
  CarFront, 
  Calendar,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { MOCK_USERS } from '../../mockData';

export default function NewContract() {
  const navigate = useNavigate();
  const { cars, addContract } = useAppContext();
  
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedCar, setSelectedCar] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Calculate price
    const car = cars.find(c => c.id === selectedCar);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
    const price = car ? car.pricePerDay * days : 0;
    const user = MOCK_USERS.find(u => u.id === selectedUser);

    setTimeout(() => {
      addContract({
        carId: selectedCar,
        userId: selectedUser,
        customerName: user?.name || 'Khách hàng ẩn danh',
        customerPhone: '09xxxxxxxx',
        startDate,
        endDate,
        totalPrice: price,
        status: 'confirmed',
        paymentStatus: 'unpaid'
      });
      setIsSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-12">
         <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/20">
            <CheckCircle2 className="w-10 h-10 text-white" />
         </div>
         <h2 className="text-3xl font-bold mb-4 tracking-tight text-maroon">Hợp đồng đã được khởi tạo</h2>
         <p className="text-maroon/50 max-w-sm mb-8">Bạn có thể quản lý hợp đồng này trong danh sách hợp đồng hoặc chuyển sang bước giao xe.</p>
         <div className="flex gap-4">
            <button onClick={() => navigate('/dashboard/contracts')} className="px-8 py-3 glass bg-white/40 border border-white/60 rounded-2xl font-bold hover:bg-white/80 transition-all text-maroon shadow-sm">Danh sách</button>
            <button onClick={() => setSuccess(false)} className="px-8 py-3 bg-maroon text-white rounded-2xl font-bold hover:bg-maroon-dark transition-all shadow-lg shadow-maroon/20">Tạo thêm</button>
         </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-maroon">Tạo hợp đồng mới</h1>
          <p className="text-sm text-gray-500 mt-1">Nhập thông tin thuê xe cho khách hàng trực tiếp tại quầy.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1: User & Car */}
            <div className="glass bg-white/40 rounded-3xl p-8 border border-white/20 shadow-xl shadow-maroon/5 space-y-6">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-maroon/40 mb-2">Bước 1: Chọn khách hàng & Xe</h3>
               
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-maroon/60 ml-1">Khách hàng</label>
                     <select 
                        required
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="w-full px-4 py-3 glass bg-white/60 border-none rounded-2xl text-sm focus:ring-2 focus:ring-maroon/10 text-maroon"
                     >
                        <option value="">-- Chọn khách hàng --</option>
                        {MOCK_USERS.filter(u => u.role === 'customer').map(u => (
                           <option key={u.id} value={u.id}>{u.name} ({u.username})</option>
                        ))}
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-maroon/60 ml-1">Phương tiện</label>
                     <select 
                        required
                        value={selectedCar}
                        onChange={(e) => setSelectedCar(e.target.value)}
                        className="w-full px-4 py-3 glass bg-white/60 border-none rounded-2xl text-sm focus:ring-2 focus:ring-maroon/10 text-maroon"
                     >
                        <option value="">-- Chọn xe trống --</option>
                        {cars.filter(c => c.status === 'available').map(c => (
                           <option key={c.id} value={c.id}>
                              [{c.category === 'car' ? 'Ô tô' : 'Xe máy'}] {c.name} - {c.licensePlate}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
            </div>

            {/* Step 2: Time */}
            <div className="glass bg-white/40 rounded-3xl p-8 border border-white/20 shadow-xl shadow-maroon/5 space-y-6">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-maroon/40 mb-2">Bước 2: Thời gian thuê</h3>
               
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-maroon/60 ml-1">Ngày nhận</label>
                     <input 
                        required
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-3 glass bg-white/60 border-none rounded-2xl text-sm focus:ring-2 focus:ring-maroon/10 text-maroon"
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-maroon/60 ml-1">Ngày trả dự kiến</label>
                     <input 
                        required
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-3 glass bg-white/60 border-none rounded-2xl text-sm focus:ring-2 focus:ring-maroon/10 text-maroon"
                     />
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-maroon text-white rounded-3xl p-8 border border-white/10 flex justify-between items-center shadow-2xl shadow-maroon/20 relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
               <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">Xác nhận tạo hợp đồng</p>
               <p className="text-white/60 text-sm max-w-md">Vui lòng kiểm tra kỹ thông tin trước khi lưu. Hợp đồng sau khi tạo sẽ chuyển sang trạng thái chờ nhận xe.</p>
            </div>
            <button 
               type="submit"
               disabled={isSubmitting}
               className="bg-white text-maroon px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center disabled:opacity-50 relative z-10 shadow-lg"
            >
               {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Khởi tạo <ChevronRight className="ml-2 w-4 h-4" /></>}
            </button>
         </div>
      </form>
    </div>
  );
}
