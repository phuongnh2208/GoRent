import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Phone, 
  User, 
  CarFront, 
  FileCheck, 
  AlertTriangle,
  CheckCircle2,
  Printer,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ContractDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contracts, cars, updateContract, updateCarStatus } = useAppContext();

  const contract = contracts.find(c => c.id === id);
  const car = contract ? cars.find(c => c.id === contract.carId) : null;

  if (!contract || !car) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Không tìm thấy hợp đồng.</div>;
  }

  const handleDelivery = () => {
    updateContract(contract.id, { status: 'delivered' });
    updateCarStatus(car.id, 'rented');
  };

  const handleReturn = () => {
    updateContract(contract.id, { status: 'returned' });
    updateCarStatus(car.id, 'available');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-bold text-maroon/40 hover:text-maroon transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
      </button>

      <div className="flex justify-between items-end">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight text-maroon">Chi tiết hợp đồng</h1>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                contract.status === 'delivered' ? 'bg-blue-50 text-blue-600' :
                contract.status === 'confirmed' ? 'bg-green-50 text-green-600' :
                contract.status === 'returned' ? 'glass bg-white/40 text-maroon/40 border border-white/60' : 'bg-maroon/5 text-maroon/40'
              }`}>
                {contract.status === 'delivered' ? 'Đang thuê' :
                 contract.status === 'confirmed' ? 'Chờ nhận' :
                 contract.status === 'returned' ? 'Đã hoàn tất' : 'Chờ xử lý'}
              </span>
           </div>
           <p className="text-maroon/40 text-sm font-medium">Mã hợp đồng: <span className="font-mono font-bold text-maroon/60">#{contract.id}</span> &middot; Ngày tạo: {contract.createdAt}</p>
        </div>
        <div className="flex space-x-3">
           <button className="p-3 glass bg-white/40 border border-white/60 rounded-2xl text-maroon/40 hover:text-maroon transition-all shadow-sm">
              <Printer className="w-5 h-5" />
           </button>
           {contract.status === 'confirmed' && (
             <button 
              onClick={handleDelivery}
              className="bg-maroon text-white px-8 py-3 rounded-2xl font-bold hover:bg-maroon-dark transition-all flex items-center shadow-lg shadow-maroon/20"
             >
                Xác nhận giao xe <ChevronRight className="ml-2 w-4 h-4" />
             </button>
           )}
           {contract.status === 'delivered' && (
             <button 
              onClick={handleReturn}
              className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center shadow-lg shadow-green-600/20"
             >
                Xác nhận trả xe <CheckCircle2 className="ml-2 w-4 h-4" />
             </button>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* Left col: Customer & Car */}
         <div className="md:col-span-2 space-y-8">
            <div className="glass bg-white/40 rounded-[2.5rem] p-10 border border-white/20 shadow-xl shadow-maroon/5">
               <h3 className="text-xs font-bold uppercase tracking-widest text-maroon/40 mb-8 pb-4 border-b border-white/20">Thông tin khách hàng</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="flex items-start space-x-4">
                     <div className="p-3 glass bg-white/60 rounded-2xl text-maroon border border-white shadow-sm"><User className="w-5 h-5" /></div>
                     <div>
                        <p className="text-[10px] font-bold uppercase text-maroon/40 mb-1">Tên khách hàng</p>
                        <p className="text-lg font-bold text-maroon">{contract.customerName}</p>
                     </div>
                  </div>
                  <div className="flex items-start space-x-4">
                     <div className="p-3 glass bg-white/60 rounded-2xl text-maroon border border-white shadow-sm"><Phone className="w-5 h-5" /></div>
                     <div>
                        <p className="text-[10px] font-bold uppercase text-maroon/40 mb-1">Số điện thoại</p>
                        <p className="text-lg font-bold text-maroon">{contract.customerPhone}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="glass bg-white/40 rounded-[2.5rem] p-10 border border-white/20 shadow-xl shadow-maroon/5">
               <h3 className="text-xs font-bold uppercase tracking-widest text-maroon/40 mb-8 pb-4 border-b border-white/20">Chi tiết phương tiện</h3>
               <div className="flex items-center space-x-8">
                  <img src={car.image} className="w-48 h-32 object-cover rounded-3xl border border-white shadow-xl shadow-maroon/10" />
                  <div className="flex-grow">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <h4 className="text-2xl font-bold text-maroon">{car.name}</h4>
                           <p className="text-sm font-bold text-maroon/40 uppercase tracking-widest">{car.brand} &middot; {car.year}</p>
                        </div>
                        <span className="text-lg font-mono glass bg-white/60 px-4 py-1.5 rounded-2xl border border-white font-bold text-maroon/60">{car.licensePlate}</span>
                     </div>
                     <div className="grid grid-cols-3 gap-4">
                        <div className="glass bg-white/60 rounded-2xl p-4 text-center border border-white shadow-sm">
                           <p className="text-[10px] font-bold uppercase text-maroon/20">Nhiên liệu</p>
                           <p className="text-xs font-bold text-maroon/60">{car.fuel}</p>
                        </div>
                        <div className="glass bg-white/60 rounded-2xl p-4 text-center border border-white shadow-sm">
                           <p className="text-[10px] font-bold uppercase text-maroon/20">Chỗ ngồi</p>
                           <p className="text-xs font-bold text-maroon/60">{car.seats}</p>
                        </div>
                        <div className="glass bg-white/60 rounded-2xl p-4 text-center border border-white shadow-sm">
                           <p className="text-[10px] font-bold uppercase text-maroon/20">Phân khúc</p>
                           <p className="text-xs font-bold text-maroon/60">{car.type}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Right col: Timeline & Pricing */}
         <div className="space-y-8">
            <div className="bg-maroon rounded-[2.5rem] p-10 text-white shadow-2xl shadow-maroon/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/10 rounded-full"></div>
               <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-8 pb-4 border-b border-white/10 relative z-10">Thời gian & Chi phí</h3>
               
               <div className="space-y-8 relative z-10">
                  <div className="flex items-center space-x-4">
                     <div className="p-3 bg-white/10 rounded-2xl border border-white/5"><Calendar className="w-5 h-5 opacity-60" /></div>
                     <div>
                        <p className="text-[10px] font-bold uppercase opacity-40 mb-1">Thời gian thuê</p>
                        <p className="text-sm font-bold">{contract.startDate} &mdash; {contract.endDate}</p>
                     </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                     <div className="flex justify-between items-center mb-4">
                        <p className="text-sm opacity-60">Giá thuê / ngày</p>
                        <p className="text-sm font-bold">{car.pricePerDay.toLocaleString()}đ</p>
                     </div>
                     <div className="flex justify-between items-center mb-6">
                        <p className="text-sm opacity-60">Số ngày</p>
                        <p className="text-sm font-bold">4 ngày</p>
                     </div>
                     <div className="flex justify-between items-center pt-6 border-t border-white/20">
                        <p className="text-lg font-bold">Tổng cộng</p>
                        <p className="text-2xl font-bold tracking-tighter">{contract.totalPrice.toLocaleString()}đ</p>
                     </div>
                  </div>

                  <div className={`mt-8 p-4 rounded-2xl flex items-center justify-center text-xs font-bold uppercase tracking-widest ${contract.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/10 text-white/40 border border-white/5'}`}>
                     {contract.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </div>
               </div>
            </div>

            {contract.status === 'delivered' && (
               <div className="glass bg-white/40 rounded-[2.5rem] p-10 border border-maroon/20 shadow-xl shadow-maroon/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-maroon/5 rounded-full blur-2xl"></div>
                  <div className="flex items-center space-x-2 text-maroon mb-4">
                     <AlertTriangle className="w-5 h-5 opacity-60" />
                     <h4 className="font-bold">Lưu ý khi nhận xe</h4>
                  </div>
                  <ul className="text-xs text-maroon/60 space-y-2 list-disc pl-4 leading-relaxed">
                     <li>Kiểm tra kỹ ngoại thất xe (trầy xước, móp méo)</li>
                     <li>Kiểm tra mức nhiên liệu khi bàn giao</li>
                     <li>Ghi chú lại phụ kiện đi kèm (lốp sơ cua, bộ đồ nghề)</li>
                  </ul>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
