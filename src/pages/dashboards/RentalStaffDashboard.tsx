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
          <p className="text-sm text-gray-600 mt-1 font-medium">
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

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
           <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Tìm hợp đồng, tên khách, SĐT..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-maroon/10 focus:outline-none text-sm transition-all text-black placeholder:text-gray-400"
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
                className="group bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-2xl hover:shadow-gray-200 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl ${
                        contract.status === 'delivered' ? 'bg-maroon/10 text-maroon' :
                        contract.status === 'confirmed' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'
                      }`}>
                         <FileText className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        contract.status === 'delivered' ? 'bg-maroon text-white' :
                        contract.status === 'confirmed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {contract.status === 'delivered' ? 'Đã giao xe' :
                         contract.status === 'confirmed' ? 'Chờ nhận' : 'Phê duyệt'}
                      </span>
                   </div>

                   <h3 className="text-lg font-bold mb-1 text-black">{contract.customerName}</h3>
                   <p className="text-xs text-gray-500 font-bold mb-6 uppercase tracking-wider">{car?.name} &middot; {car?.licensePlate}</p>

                   <div className="space-y-3 mb-6">
                      <div className="flex items-center text-xs text-gray-500 font-medium">
                        <Clock className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        <span>Từ: <strong className="text-black">{contract.startDate}</strong></span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 font-medium">
                        <Clock className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        <span>Đến: <strong className="text-black">{contract.endDate}</strong></span>
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                         <p className="text-[10px] font-bold uppercase text-gray-400">Tổng phí</p>
                         <p className="text-sm font-black text-black">{contract.totalPrice.toLocaleString()}đ</p>
                      </div>
                      <div className="flex items-center text-xs font-bold text-gray-400 group-hover:text-maroon transition-colors">
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
             <p className="text-gray-400 text-sm font-bold italic uppercase">Không tìm thấy hợp đồng nào...</p>
          </div>
        )}
      </div>
    </div>
  );
}
