import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  FileText, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Search,
  Filter,
  Plus,
  CarFront
} from 'lucide-react';
import { RentalContract } from '../../types';
import { useNavigate } from 'react-router-dom';

interface RentalStaffDashboardProps {
  mode?: 'contracts' | 'delivery';
}

export default function RentalStaffDashboard({ mode = 'contracts' }: RentalStaffDashboardProps) {
  const { contracts, cars } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContracts = contracts.filter(c => 
    c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.customerPhone.includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-maroon">
            {mode === 'delivery' ? 'Giao nhận xe' : 'Quản lý hợp đồng'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {mode === 'delivery' ? 'Quản lý quy trình bàn giao và thu hồi xe từ khách hàng.' : 'Theo dõi, phê duyệt và quản lý các yêu cầu thuê xe.'}
          </p>
        </div>
        {mode === 'contracts' && (
          <button className="bg-maroon text-white px-5 py-2.5 rounded-2xl flex items-center text-sm font-bold shadow-lg shadow-maroon/10 hover:bg-maroon-dark transition-all">
            <Plus className="w-4 h-4 mr-2" />
            Tạo hợp đồng mới
          </button>
        )}
      </div>

      <div className="glass bg-white/40 rounded-3xl border border-white/20 shadow-xl shadow-maroon/5 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
           <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon opacity-30" />
              <input 
                type="text" 
                placeholder="Tìm hợp đồng, tên khách, SĐT..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/40 border border-white/30 rounded-2xl focus:bg-white focus:ring-2 focus:ring-maroon/10 focus:outline-none text-sm transition-all text-maroon placeholder:text-maroon/30"
              />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContracts.map((contract) => {
            const car = cars.find(c => c.id === contract.carId);
            return (
              <div 
                key={contract.id}
                onClick={() => navigate(`/dashboard/contract/${contract.id}`)}
                className="group glass bg-white/40 rounded-3xl border border-white/20 p-6 hover:shadow-xl hover:shadow-maroon/5 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 group-hover:bg-white/40 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
                
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl ${
                        contract.status === 'delivered' ? 'bg-maroon-light/10 text-maroon-light' :
                        contract.status === 'confirmed' ? 'bg-green-50 text-green-600' : 'bg-white/40 text-gray-400'
                      }`}>
                         <FileText className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        contract.status === 'delivered' ? 'bg-maroon-light/10 text-maroon-light' :
                        contract.status === 'confirmed' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {contract.status === 'delivered' ? 'Đã giao xe' :
                         contract.status === 'confirmed' ? 'Chờ nhận' : 'Phê duyệt'}
                      </span>
                   </div>

                   <h3 className="text-lg font-bold mb-1 text-maroon">{contract.customerName}</h3>
                   <p className="text-xs text-maroon/40 font-medium mb-6 uppercase tracking-wider">{car?.name} &middot; {car?.licensePlate}</p>

                   <div className="space-y-3 mb-6">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 mr-2 text-maroon opacity-30" />
                        <span>Từ: <strong className="text-maroon/60">{contract.startDate}</strong></span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 mr-2 text-maroon opacity-30" />
                        <span>Đến: <strong className="text-maroon/60">{contract.endDate}</strong></span>
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div>
                         <p className="text-[10px] font-bold uppercase text-maroon opacity-40">Tổng phí</p>
                         <p className="text-sm font-bold text-maroon">{contract.totalPrice.toLocaleString()}đ</p>
                      </div>
                      <div className="flex items-center text-xs font-bold text-maroon opacity-40 group-hover:text-maroon group-hover:opacity-100 transition-colors">
                        Chi tiết <ChevronRight className="ml-1 w-4 h-4" />
                      </div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredContracts.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                <AlertCircle className="w-8 h-8 text-gray-300" />
             </div>
             <p className="text-gray-400 text-sm font-medium italic">Không tìm thấy hợp đồng nào...</p>
          </div>
        )}
      </div>
    </div>
  );
}
