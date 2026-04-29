import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  Wrench, 
  CarFront, 
  AlertCircle, 
  CheckCircle2, 
  Calendar,
  Settings,
  MoreVertical,
  History
} from 'lucide-react';
import { Car } from '../../types';

export default function MaintenanceDashboard() {
  const { cars, updateCarStatus, maintenanceRecords } = useAppContext();

  const maintenanceCars = cars.filter(c => c.status === 'maintenance');
  const otherCars = cars.filter(c => c.status !== 'maintenance');

  const handleStatusUpdate = (carId: string, status: Car['status']) => {
    updateCarStatus(carId, status);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-maroon">Quản lý Bảo dưỡng</h1>
        <p className="text-sm text-gray-500 mt-1">Theo dõi tình trạng kỹ thuật và lịch trình bảo trì định kỳ cho đội xe.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Urgent Maintenance */}
        <div className="glass bg-white/40 rounded-3xl border border-white/20 shadow-xl shadow-maroon/5 p-8">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-50 text-yellow-600 rounded-xl">
                   <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-maroon">Cần bảo dưỡng ({maintenanceCars.length})</h3>
             </div>
          </div>

          <div className="space-y-4">
             {maintenanceCars.map(car => (
               <div key={car.id} className="flex items-center justify-between p-4 glass bg-white/40 rounded-2xl border border-white/60">
                  <div className="flex items-center space-x-4">
                     <img src={car.image} className="w-12 h-12 object-cover rounded-xl shadow-sm" />
                     <div>
                        <p className="text-sm font-bold text-maroon">{car.name}</p>
                        <p className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest">{car.licensePlate}</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => handleStatusUpdate(car.id, 'available')}
                    className="glass bg-white text-green-600 px-4 py-2 rounded-xl text-xs font-bold border border-green-100 hover:bg-green-50 transition-all shadow-sm"
                  >
                    Hoàn tất
                  </button>
               </div>
             ))}
             {maintenanceCars.length === 0 && (
               <div className="py-8 text-center text-maroon/40 italic text-sm">Hiện không có xe nào đang bảo trì.</div>
             )}
          </div>
        </div>

        {/* Fleet Status Summary */}
        <div className="glass bg-white/40 rounded-3xl border border-white/20 shadow-xl shadow-maroon/5 p-8">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center space-x-3">
                <div className="p-2 bg-maroon/10 text-maroon rounded-xl">
                   <History className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-maroon">Lịch sử bảo dưỡng</h3>
             </div>
          </div>

          <div className="space-y-6">
             {maintenanceRecords.map((log, idx) => {
               const car = cars.find(c => c.id === log.carId);
               return (
                <div key={idx} className="flex justify-between items-start">
                   <div>
                     <p className="text-sm font-bold text-maroon">{car?.name || 'Xe không xác định'}</p>
                     <p className="text-xs text-maroon/50 mt-1">{log.description}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs font-bold text-maroon/30 uppercase tracking-widest">{log.date}</p>
                     <p className="text-sm font-bold text-maroon mt-1">{log.cost.toLocaleString()}đ</p>
                   </div>
                </div>
               );
             })}
          </div>

          <button className="w-full mt-8 glass bg-maroon text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-maroon-dark transition-all shadow-lg shadow-maroon/20">
             Tạo phiếu bảo dưỡng
          </button>
        </div>
      </div>

      {/* Full Fleet table for quick status changes */}
      <div className="glass bg-white/40 rounded-3xl border border-white/20 shadow-xl shadow-maroon/5 p-8">
         <h3 className="text-lg font-bold mb-8 text-maroon">Cập nhật nhanh trạng thái xe</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCars.map(car => (
              <div key={car.id} className="p-6 glass bg-white/40 border border-white/20 rounded-3xl hover:border-maroon/20 transition-all shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <img src={car.image} className="w-16 h-16 object-cover rounded-2xl shadow-sm" />
                    <button className="p-2 hover:bg-white/60 rounded-xl"><MoreVertical className="w-4 h-4 text-maroon opacity-30" /></button>
                 </div>
                 <h4 className="font-bold text-sm mb-1 text-maroon">{car.name}</h4>
                 <p className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest mb-6">{car.licensePlate}</p>
                 
                 <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusUpdate(car.id, 'maintenance')}
                      className="flex-grow glass bg-white text-maroon/60 py-2 rounded-xl text-[10px] font-bold uppercase border border-white hover:bg-white/80 transition-all"
                    >
                      Bảo trì
                    </button>
                    {car.status === 'rented' && (
                       <div className="flex-grow text-center py-2 text-[10px] font-bold text-blue-500 uppercase">Đang thuê</div>
                    )}
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
