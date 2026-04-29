import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  Calendar,
  Filter,
  Download,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function AccountingDashboard() {
  const { transactions, contracts } = useAppContext();

  const totalRevenue = transactions.reduce((acc, t) => acc + (t.status === 'completed' ? t.amount : 0), 0);
  const pendingRevenue = transactions.reduce((acc, t) => acc + (t.status === 'pending' ? t.amount : 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-maroon">Quản lý Tài chính</h1>
          <p className="text-sm text-gray-500 mt-1">Theo dõi doanh thu, giao dịch và báo cáo phí thuê xe.</p>
        </div>
        <button className="bg-maroon text-white px-5 py-2.5 rounded-2xl flex items-center text-sm font-bold shadow-lg shadow-maroon/10 hover:bg-maroon-dark transition-all">
          <Download className="w-4 h-4 mr-2" />
          Xuất báo cáo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Tổng doanh thu', value: totalRevenue, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { title: 'Chờ thanh toán', value: pendingRevenue, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { title: 'Số giao dịch', value: transactions.length, icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50', isMoney: false },
          { title: 'Hợp đồng mới', value: contracts.length, icon: Calendar, color: 'text-maroon', bg: 'bg-maroon/5', isMoney: false },
        ].map((stat, i) => (
          <div key={i} className="glass bg-white/40 rounded-3xl p-6 border border-white/20 shadow-xl shadow-maroon/5">
             <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                   <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">+12%</span>
             </div>
             <p className="text-xs font-bold text-maroon/40 uppercase tracking-widest">{stat.title}</p>
             <h3 className="text-2xl font-black text-maroon mt-1">
                {stat.isMoney === false ? stat.value : stat.value.toLocaleString() + 'đ'}
             </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction Table */}
        <div className="lg:col-span-2 glass bg-white/40 rounded-[2.5rem] p-8 border border-white/20 shadow-xl shadow-maroon/5">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-maroon">Giao dịch gần đây</h3>
              <div className="flex items-center space-x-2">
                 <button className="p-2 bg-white rounded-xl border border-gray-100"><Filter className="w-4 h-4 text-maroon/40" /></button>
                 <button className="p-2 bg-white rounded-xl border border-gray-100"><Search className="w-4 h-4 text-maroon/40" /></button>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full">
                 <thead>
                    <tr className="text-left border-b border-gray-100">
                       <th className="pb-4 text-[10px] font-bold uppercase text-maroon opacity-40">Mã GD</th>
                       <th className="pb-4 text-[10px] font-bold uppercase text-maroon opacity-40">Hợp đồng</th>
                       <th className="pb-4 text-[10px] font-bold uppercase text-maroon opacity-40">Số tiền</th>
                       <th className="pb-4 text-[10px] font-bold uppercase text-maroon opacity-40">Hình thức</th>
                       <th className="pb-4 text-[10px] font-bold uppercase text-maroon opacity-40">Trạng thái</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {transactions.map(t => (
                      <tr key={t.id} className="group hover:bg-white/40 transition-all cursor-pointer">
                         <td className="py-4 text-xs font-bold text-maroon">{t.id}</td>
                         <td className="py-4 text-xs font-bold text-maroon">{t.contractId}</td>
                         <td className="py-4 text-sm font-black text-maroon">{t.amount.toLocaleString()}đ</td>
                         <td className="py-4 font-bold">
                            <span className="text-[10px] uppercase text-maroon/40 px-2 py-1 bg-white border border-gray-100 rounded-lg">{t.method}</span>
                         </td>
                         <td className="py-4">
                            <span className={`flex items-center text-[10px] font-bold border rounded-lg px-2 py-1 w-fit ${
                               t.status === 'completed' ? 'text-green-600 bg-green-50 border-green-100' : 'text-orange-600 bg-orange-50 border-orange-100'
                            }`}>
                               {t.status === 'completed' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                               {t.status === 'completed' ? 'Thành công' : 'Chờ xử lý'}
                            </span>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="glass bg-white/40 rounded-[2.5rem] p-8 border border-white/20 shadow-xl shadow-maroon/5 flex flex-col justify-between">
           <div>
              <h3 className="text-lg font-bold text-maroon mb-2">Hình thức thanh toán</h3>
              <p className="text-xs text-maroon/40 mb-8 font-medium">Phân bổ nguồn tiền vào hệ thống.</p>
              
              <div className="space-y-6">
                 {[
                   { label: 'Chuyển khoản', value: '65%', color: 'bg-green-600' },
                   { label: 'Thanh toán thẻ', value: '25%', color: 'bg-maroon' },
                   { label: 'Tiền mặt', value: '10%', color: 'bg-gray-300' },
                 ].map((item, idx) => (
                   <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-xs font-bold text-maroon">{item.label}</span>
                         <span className="text-xs font-bold text-maroon/40">{item.value}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                         <div className={`h-full ${item.color}`} style={{ width: item.value }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="mt-12 bg-maroon/5 rounded-3xl p-6 border border-maroon/10">
              <p className="text-[10px] font-bold uppercase text-maroon opacity-40 mb-2">Đối soát tháng này</p>
              <div className="flex items-end justify-between">
                 <h4 className="text-xl font-black text-maroon">Đã đối soát xong</h4>
                 <CheckCircle2 className="text-green-600 w-6 h-6" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
