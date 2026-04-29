import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  ArrowLeft, 
  CarFront, 
  Fuel, 
  Users, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Star, 
  ChevronRight,
  CheckCircle,
  Loader2,
  Bike
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, addContract, currentUser } = useAppContext();
  
  const car = cars.find(c => c.id === id);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!car) return <div className="p-20 text-center">404 - Không tìm thấy xe.</div>;

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  const days = calculateDays();
  const totalPrice = days * car.pricePerDay;

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      setError('Vui lòng chọn ngày nhận và ngày trả xe.');
      return;
    }
    
    setIsBooking(true);
    setError('');

    // Navigate to payment instead of direct booking
    setTimeout(() => {
      setIsBooking(false);
      navigate('/payment', { 
        state: { 
          carId: car.id, 
          startDate, 
          endDate, 
          totalPrice: totalPrice + 150000 
        } 
      });
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-bold text-black border-b border-black/10 pb-1 hover:text-maroon transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Xem danh sách khác
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Images & Info */}
          <div className="space-y-12">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="relative aspect-[16/10] rounded-[3rem] overflow-hidden bg-slate-50 shadow-2xl shadow-black/5"
             >
                <img src={car.image} className="w-full h-full object-cover" alt={car.name} />
                <div className="absolute top-8 left-8">
                   <span className="glass bg-white/60 backdrop-blur-md px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl text-maroon">
                      {car.year} Model
                   </span>
                </div>
             </motion.div>

             <div className="space-y-8">
                <div>
                   <h1 className="text-black font-semibold tracking-tight mb-2">{car.name}</h1>
                   <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-black uppercase tracking-widest">{car.brand}</span>
                      <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                      <div className="flex items-center text-yellow-500">
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current" />
                         <span className="ml-2 text-xs font-bold text-maroon">(4.9/5)</span>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                   <div className="bg-slate-50 rounded-[2rem] p-6 text-center border border-gray-100">
                      <Fuel className="w-6 h-6 text-gray-400 mx-auto mb-3" />
                      <p className="text-[10px] font-bold uppercase text-black tracking-widest mb-1">Nhiên liệu</p>
                      <p className="text-sm font-bold">{car.fuel}</p>
                   </div>
                   <div className="bg-slate-50 rounded-[2rem] p-6 text-center border border-gray-100">
                      {car.category === 'bike' ? <Bike className="w-6 h-6 text-gray-400 mx-auto mb-3" /> : <Users className="w-6 h-6 text-gray-400 mx-auto mb-3" />}
                      <p className="text-[10px] font-bold uppercase text-black tracking-widest mb-1">{car.category === 'bike' ? 'Sức chứa' : 'Chỗ ngồi'}</p>
                      <p className="text-sm font-bold">{car.seats} người</p>
                   </div>
                   <div className="bg-slate-50 rounded-[2rem] p-6 text-center border border-gray-100">
                      <ShieldCheck className="w-6 h-6 text-gray-400 mx-auto mb-3" />
                      <p className="text-[10px] font-bold uppercase text-black tracking-widest mb-1">Bảo hiểm</p>
                      <p className="text-sm font-bold">Gói VIP</p>
                   </div>
                </div>

                <div className="prose prose-sm text-black font-medium leading-relaxed max-w-none">
                   <p>
                      {car.name} mang lại sự kết hợp hoàn hảo giữa thiết kế thể thao và nội thất sang trọng. 
                      Được trang bị những công nghệ an toàn hàng đầu và động cơ mạnh mẽ, đây là lựa chọn 
                      ưu tiên cho những hành trình xa cần sự ổn định và phong cách riêng biệt.
                   </p>
                </div>
             </div>
          </div>

          {/* Right: Booking Card */}
          <div className="relative">
             <div className="sticky top-24">
                <div className="bg-maroon rounded-[3rem] p-10 text-white shadow-2xl shadow-maroon/20 relative overflow-hidden">
                   <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                   
                   {bookingSuccess ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10 relative z-10"
                      >
                         <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-white" />
                         </div>
                         <h3 className="text-2xl font-bold mb-4">Đặt xe thành công!</h3>
                         <p className="text-white/60 text-sm mb-8 leading-relaxed">
                            Cảm ơn bạn đã lựa chọn GoRent. Chúng tôi sẽ liên hệ trong ít phút để xác nhận yêu cầu của bạn.
                         </p>
                         <button 
                           onClick={() => navigate('/dashboard')}
                           className="w-full bg-white text-maroon py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-lg"
                         >
                            Quản lý hợp đồng
                         </button>
                      </motion.div>
                   ) : (
                      <div className="relative z-10">
                        <div className="flex justify-between items-end mb-10 pb-6 border-b border-white/10">
                           <p className="text-xs font-bold uppercase tracking-widest opacity-50">Giá thuê</p>
                           <div>
                              <span className="text-4xl font-bold tracking-tighter">{car.pricePerDay.toLocaleString()}đ</span>
                              <span className="text-sm opacity-50 ml-2">/ ngày</span>
                           </div>
                        </div>

                        <div className="space-y-6 mb-10">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-bold uppercase opacity-40 ml-2">Ngày nhận xe</label>
                                 <input 
                                   type="date" 
                                   value={startDate}
                                   onChange={(e) => setStartDate(e.target.value)}
                                   className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-white/40 text-sm font-medium"
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-bold uppercase opacity-40 ml-2">Ngày trả xe</label>
                                 <input 
                                   type="date" 
                                   value={endDate}
                                   onChange={(e) => setEndDate(e.target.value)}
                                   className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-white/40 text-sm font-medium"
                                 />
                              </div>
                           </div>
                           
                           {error && <p className="text-xs text-red-400 font-bold ml-2">{error}</p>}
                        </div>

                        <div className="space-y-4 mb-10">
                           <div className="flex justify-between text-sm opacity-60">
                              <span>Phí thuê ({days} ngày)</span>
                              <span>{totalPrice.toLocaleString()}đ</span>
                           </div>
                           <div className="flex justify-between text-sm opacity-60">
                              <span>Phí bảo hiểm và dịch vụ</span>
                              <span>150,000đ</span>
                           </div>
                           <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                              <p className="text-sm font-bold uppercase tracking-widest opacity-40">Tạm tính</p>
                              <p className="text-3xl font-bold tracking-tighter">{(totalPrice + 150000).toLocaleString()}đ</p>
                           </div>
                        </div>

                        <button 
                          onClick={handleBooking}
                          disabled={isBooking || car.status !== 'available'}
                          className="w-full bg-white text-maroon py-5 rounded-2xl font-bold flex items-center justify-center hover:bg-gray-100 transition-all disabled:opacity-50"
                        >
                           {isBooking ? (
                             <Loader2 className="w-6 h-6 animate-spin" />
                           ) : car.status === 'available' ? (
                             <>Đặt thuê ngay <ChevronRight className="ml-2 w-5 h-5" /></>
                           ) : (
                             'Hiện đang bận'
                           )}
                        </button>
                        
                        <p className="text-[10px] text-center mt-6 text-white/40 font-bold uppercase tracking-widest">
                           Xác nhận đặt xe ngay
                        </p>
                      </div>
                   )}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                   <div className="glass bg-white/40 rounded-3xl p-6 border border-white flex items-center space-x-4 shadow-xl shadow-maroon/5">
                      <div className="w-10 h-10 glass bg-white rounded-xl shadow-sm flex items-center justify-center text-maroon border border-white">
                         <ShieldCheck className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-maroon/60">Đặt xe an toàn</span>
                   </div>
                   <div className="glass bg-white/40 rounded-3xl p-6 border border-white flex items-center space-x-4 shadow-xl shadow-maroon/5">
                      <div className="w-10 h-10 glass bg-white rounded-xl shadow-sm flex items-center justify-center text-maroon border border-white">
                         <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-maroon/60">Nhận xe nhanh</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
