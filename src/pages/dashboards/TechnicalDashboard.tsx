import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  ClipboardCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  Camera,
  History,
  Info
} from 'lucide-react';
import { RentalContract } from '../../types';

export default function TechnicalDashboard() {
  const { contracts, cars, updateContract } = useAppContext();

  // Tasks for technical staff: Inspection for DELIVERY or RETURN
  const inspectionTasks = contracts.filter(c => c.status === 'confirmed' || c.status === 'delivered');

  const handleCompleteInspection = (contractId: string, type: 'delivery' | 'return') => {
    if (type === 'delivery') {
      updateContract(contractId, { status: 'delivered' });
    } else {
      updateContract(contractId, { status: 'returned' });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-maroon">Kiểm tra Kỹ thuật</h1>
        <p className="text-sm text-gray-500 mt-1">Quản lý quy trình kiểm định, bàn giao và nghiệm thu xe.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Tasks */}
        <div className="lg:col-span-2 space-y-6">
           <div className="glass bg-white/40 rounded-3xl border border-white/20 shadow-xl shadow-maroon/5 p-8">
              <h3 className="text-lg font-bold text-maroon mb-6 flex items-center">
                 <ClipboardCheck className="w-5 h-5 mr-3 text-maroon/40" />
                 Danh sách chờ kiểm định ({inspectionTasks.length})
              </h3>

              <div className="space-y-4">
                 {inspectionTasks.map(contract => {
                   const car = cars.find(c => c.id === contract.carId);
                   const isDelivery = contract.status === 'confirmed';
                   
                   return (
                     <div key={contract.id} className="glass bg-white/40 border border-white/20 rounded-3xl p-6 hover:border-maroon/20 transition-all shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                           <div className="flex items-center space-x-4">
                              <img src={car?.image} className="w-16 h-12 object-cover rounded-xl shadow-sm" />
                              <div>
                                 <div className="flex items-center space-x-2 mb-1">
                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase ${isDelivery ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                       {isDelivery ? 'Bàn giao' : 'Nghiệm thu'}
                                    </span>
                                    <p className="text-sm font-bold text-maroon">{car?.name}</p>
                                 </div>
                                 <p className="text-xs text-maroon/40 font-medium">Khách: {contract.customerName} &middot; {contract.customerPhone}</p>
                              </div>
                           </div>

                           <div className="flex items-center space-x-3">
                              <button className="p-3 bg-white/60 hover:bg-white text-maroon/40 hover:text-maroon rounded-2xl border border-white/40 transition-all">
                                 <Camera className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleCompleteInspection(contract.id, isDelivery ? 'delivery' : 'return')}
                                className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg ${
                                  isDelivery 
                                  ? 'bg-maroon text-white shadow-maroon/20 hover:bg-maroon-dark' 
                                  : 'bg-green-600 text-white shadow-green-600/20 hover:bg-green-700'
                                }`}
                              >
                                {isDelivery ? 'Xác nhận Bàn giao' : 'Xác nhận Nghiệm thu'}
                              </button>
                           </div>
                        </div>
                     </div>
                   );
                 })}

                 {inspectionTasks.length === 0 && (
                    <div className="py-12 text-center flex flex-col items-center">
                       <CheckCircle2 className="w-12 h-12 text-green-500/20 mb-4" />
                       <p className="text-maroon/40 italic text-sm">Tất cả xe đã được kiểm định xong.</p>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-8">
           <div className="glass bg-maroon text-white rounded-[2.5rem] p-8 shadow-2xl shadow-maroon/20">
              <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-6">Quy chuẩn kiểm định</h3>
              <div className="space-y-4">
                 {[
                   'Kiểm tra ngoại thất & vết trầy xước',
                   'Kiểm tra mức nhiên liệu & km hiện tại',
                   'Kiểm tra hệ thống đèn & phanh',
                   'Chụp ảnh 4 góc xe khi bàn giao',
                   'Ký biên bản điện tử'
                 ].map((item, i) => (
                   <div key={i} className="flex items-center space-x-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">{i+1}</div>
                      <span className="opacity-80">{item}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass bg-white/40 rounded-[2.5rem] p-8 border border-white/20 shadow-xl shadow-maroon/5">
              <h3 className="text-sm font-bold text-maroon uppercase tracking-widest mb-6">Ghi chú gần đây</h3>
              <div className="space-y-4">
                 {[
                   { user: 'Bùi Văn A', car: 'Lux A2.0', note: 'Lốp sau hơi mòn' },
                   { user: 'Trần Thị B', car: 'Camry', note: 'Vết xước nhỏ cửa lái' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-start space-x-3 p-4 bg-white/40 rounded-2xl border border-white/60">
                      <div className="p-2 bg-maroon/5 text-maroon rounded-xl shrink-0"><Info className="w-4 h-4" /></div>
                      <div>
                         <p className="text-xs font-bold text-maroon">{item.car}</p>
                         <p className="text-[10px] text-maroon/60 mt-1">{item.note}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
