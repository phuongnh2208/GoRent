import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  Users, 
  CarFront, 
  FileText, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminOverview() {
  const { cars, contracts, transactions } = useAppContext();

  const totalRevenue = transactions.reduce((acc, t) => acc + (t.status === 'completed' ? t.amount : 0), 0);
  const activeContracts = contracts.filter(c => c.status === 'delivered').length;
  const availableCars = cars.filter(c => c.status === 'available').length;

  const stats = [
    { name: 'Doanh thu', value: totalRevenue.toLocaleString() + 'đ', icon: DollarSign, trend: '+12%', up: true },
    { name: 'Hợp đồng mới', value: contracts.length.toString(), icon: FileText, trend: '+5%', up: true },
    { name: 'Khách hàng', value: '128', icon: Users, trend: '+24%', up: true },
    { name: 'Xe sẵn sàng', value: availableCars.toString(), icon: CarFront, trend: '-2%', up: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-maroon">Bảng điều khiển</h1>
        <p className="text-sm text-gray-600 mt-1 font-medium">Chào mừng quay lại, quản trị viên GoRent.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50"
          >
            <div className="flex justify-between items-start mb-4">
               <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                  <stat.icon className="w-6 h-6 text-maroon" />
               </div>
               <div className={`flex items-center text-[10px] font-bold px-2 py-1 rounded-full ${stat.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                  {stat.trend}
               </div>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.name}</p>
            <p className="text-2xl font-black tracking-tighter mt-1 text-black">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Contracts */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-maroon">Hợp đồng gần đây</h3>
              <button className="text-xs font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">Xem tất cả</button>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Khách hàng</th>
                    <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Xe</th>
                    <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ngày thuê</th>
                    <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contracts.slice(0, 5).map((contract) => (
                    <tr key={contract.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-4 font-medium">
                         <p className="text-sm font-bold text-black">{contract.customerName}</p>
                         <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">{contract.customerPhone}</p>
                      </td>
                      <td className="py-4">
                         <p className="text-sm font-bold text-black">{cars.find(c => c.id === contract.carId)?.name}</p>
                      </td>
                      <td className="py-4">
                         <p className="text-xs text-black font-bold uppercase tracking-tight">{contract.startDate} - {contract.endDate}</p>
                      </td>
                      <td className="py-4 text-right">
                         <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                           contract.status === 'delivered' ? 'bg-blue-50 text-blue-600' :
                           contract.status === 'confirmed' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                         }`}>
                           {contract.status === 'delivered' ? 'Đang thuê' :
                            contract.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xử lý'}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>

        {/* Car quick status */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8">
           <h3 className="text-lg font-bold mb-6 text-maroon">Trạng thái đội xe</h3>
           <div className="space-y-6">
               {[
                 { label: 'Sẵn sàng', count: availableCars, color: 'bg-green-500' },
                 { label: 'Đang thuê', count: contracts.filter(c => c.status === 'delivered').length, color: 'bg-maroon' },
                 { label: 'Bảo dưỡng', count: cars.filter(c => c.status === 'maintenance').length, color: 'bg-yellow-500' },
               ].map(item => (
                 <div key={item.label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                      <span className="text-sm font-black text-black">{item.count} xe</span>
                    </div>
                    <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                       <div 
                         className={`h-full ${item.color}`} 
                         style={{ width: `${(item.count / cars.length) * 100}%` }}
                       />
                    </div>
                 </div>
               ))}
           </div>
           
           <div className="mt-10 pt-8 border-t border-white/20">
              <button className="w-full bg-maroon text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-maroon-dark transition-all shadow-lg shadow-maroon/20">
                 Thêm xe mới
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
