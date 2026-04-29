import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  CarFront, 
  Edit3, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { Car } from '../../types';

export default function CarManagement() {
  const { cars, updateCarStatus } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         car.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || car.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || car.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: Car['status']) => {
    switch (status) {
      case 'available': return 'bg-green-50 text-green-600';
      case 'rented': return 'bg-blue-50 text-blue-600';
      case 'maintenance': return 'bg-yellow-50 text-yellow-600';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusLabel = (status: Car['status']) => {
    switch (status) {
      case 'available': return 'Sẵn sàng';
      case 'rented': return 'Đang thuê';
      case 'maintenance': return 'Bảo dưỡng';
      default: return status;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-maroon">Quản lý xe</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý định danh, tình trạng và lịch trình đội xe của GoRent.</p>
        </div>
        <button className="bg-maroon text-white px-5 py-2.5 rounded-2xl flex items-center text-sm font-bold shadow-lg shadow-maroon/10 hover:bg-maroon-dark transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Thêm xe mới
        </button>
      </div>

      <div className="glass bg-white/40 rounded-3xl border border-white/20 shadow-xl shadow-maroon/5 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
           <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon opacity-30" />
              <input 
                type="text" 
                placeholder="Tìm xe theo tên hoặc biển số..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/40 border border-white/30 rounded-2xl focus:bg-white focus:ring-2 focus:ring-maroon/10 focus:outline-none text-sm transition-all text-maroon placeholder:text-maroon/30"
              />
           </div>
           
           <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-maroon opacity-40 uppercase tracking-widest mr-2">Loại:</span>
                {['all', 'car', 'bike'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      filterCategory === cat 
                      ? 'bg-maroon text-white border-maroon shadow-md shadow-maroon/10' 
                      : 'glass bg-white text-gray-500 border-white/60 hover:border-maroon/40'
                    }`}
                  >
                    {cat === 'all' ? 'Tất cả' : cat === 'car' ? 'Ô tô' : 'Xe máy'}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-maroon opacity-40 uppercase tracking-widest mr-2">Trạng thái:</span>
                {['all', 'available', 'rented', 'maintenance'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      filterStatus === status 
                      ? 'bg-maroon text-white border-maroon shadow-md shadow-maroon/10' 
                      : 'glass bg-white text-gray-500 border-white/60 hover:border-maroon/40'
                    }`}
                  >
                    {status === 'all' ? 'Tất cả' : getStatusLabel(status as Car['status'])}
                  </button>
                ))}
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="pb-4 pt-1 text-[10px] font-bold text-maroon opacity-40 uppercase tracking-widest pl-4">Hình ảnh</th>
                <th className="pb-4 pt-1 text-[10px] font-bold text-maroon opacity-40 uppercase tracking-widest">Xe & Thương hiệu</th>
                <th className="pb-4 pt-1 text-[10px] font-bold text-maroon opacity-40 uppercase tracking-widest">Biển số</th>
                <th className="pb-4 pt-1 text-[10px] font-bold text-maroon opacity-40 uppercase tracking-widest">Đơn giá/Ngày</th>
                <th className="pb-4 pt-1 text-[10px] font-bold text-maroon opacity-40 uppercase tracking-widest">Trạng thái</th>
                <th className="pb-4 pt-1 text-[10px] font-bold text-maroon opacity-40 uppercase tracking-widest text-right pr-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredCars.map((car) => (
                <tr key={car.id} className="group hover:bg-white/40 transition-colors">
                  <td className="py-4 pl-4">
                     <img src={car.image} alt={car.name} className="w-12 h-12 object-cover rounded-xl border border-white/40 shadow-sm" />
                  </td>
                  <td className="py-4">
                     <p className="text-sm font-bold text-maroon">{car.name}</p>
                     <p className="text-xs text-maroon/40 uppercase font-medium">{car.brand} &middot; {car.year}</p>
                  </td>
                  <td className="py-4">
                     <span className="text-xs font-mono bg-white/40 px-2 py-1 rounded border border-white/60 font-bold text-maroon/60">
                        {car.licensePlate}
                     </span>
                  </td>
                  <td className="py-4">
                     <p className="text-sm font-bold text-maroon">{car.pricePerDay.toLocaleString()}đ</p>
                  </td>
                  <td className="py-4">
                     <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(car.status)}`}>
                        {getStatusLabel(car.status)}
                     </span>
                  </td>
                  <td className="py-4 text-right pr-4">
                     <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-maroon/40 hover:text-maroon hover:bg-white/60 rounded-lg transition-all">
                           <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-maroon/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                           <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-maroon/40 hover:text-maroon hover:bg-white/60 rounded-lg transition-all">
                           <MoreVertical className="w-4 h-4" />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCars.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                  <CarFront className="w-8 h-8 text-gray-300" />
               </div>
               <p className="text-gray-400 text-sm font-medium italic">Không tìm thấy xe nào phù hợp...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
