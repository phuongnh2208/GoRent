import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Download, Calendar, ArrowUpRight, TrendingUp } from 'lucide-react';

const data = [
  { month: 'T1', revenue: 450, growth: 10 },
  { month: 'T2', revenue: 520, growth: 15 },
  { month: 'T3', revenue: 480, growth: -5 },
  { month: 'T4', revenue: 610, growth: 25 },
  { month: 'T5', revenue: 750, growth: 22 },
  { month: 'T6', revenue: 890, growth: 18 },
];

export default function RevenueReport() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-maroon">Báo cáo Doanh thu</h1>
          <p className="text-sm text-gray-600 mt-1 font-medium">Phân tích chuyên sâu về chỉ số tăng trưởng và hiệu quả kinh doanh.</p>
        </div>
        <div className="flex space-x-3">
           <button className="bg-white text-maroon px-4 py-2 rounded-xl text-xs font-bold border border-gray-100 hover:bg-gray-50 transition-all shadow-sm flex items-center">
              <Calendar className="w-4 h-4 mr-2" /> 6 tháng qua
           </button>
           <button className="bg-maroon text-white px-5 py-2.5 rounded-2xl flex items-center text-sm font-bold shadow-lg shadow-maroon/10 hover:bg-maroon-dark transition-all">
              <Download className="w-4 h-4 mr-2" /> PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
           <h3 className="text-sm font-bold text-maroon uppercase tracking-widest mb-8">Biểu đồ Doanh thu (Triệu VNĐ)</h3>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data}>
                    <defs>
                       <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#800000" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#800000" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000008" />
                    <XAxis 
                       dataKey="month" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fontSize: 10, fontWeight: 700, fill: '#9ca3af'}} 
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fontSize: 10, fontWeight: 700, fill: '#9ca3af'}} 
                    />
                    <Tooltip 
                       contentStyle={{backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'}}
                       itemStyle={{fontWeight: 700, color: '#000'}}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#800000" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 text-black">
           <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-maroon/5 rounded-2xl text-maroon"><TrendingUp className="w-6 h-6" /></div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-maroon">Hiệu suất tháng 6</h3>
           </div>
           
           <div className="space-y-8">
              <div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Doanh thu ròng</p>
                 <div className="flex items-end space-x-4">
                    <h4 className="text-5xl font-black text-black">890.5M</h4>
                    <span className="text-green-500 font-bold text-sm bg-green-50 px-2 py-1 rounded-lg flex items-center mb-1">
                       <ArrowUpRight className="w-4 h-4 mr-1" /> 18%
                    </span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-50">
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Trung bình đơn</p>
                    <p className="text-xl font-black text-black">1.25M</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Tỷ lệ tăng trưởng</p>
                    <p className="text-xl font-black text-green-600">+4.2%</p>
                 </div>
              </div>

              <div className="bg-maroon text-white p-6 rounded-[2rem] shadow-xl shadow-maroon/20">
                 <p className="text-[10px] font-bold opacity-60 uppercase mb-2">Mục tiêu quý 2</p>
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold">92% Hoàn thành</span>
                    <span className="text-[10px] opacity-60">2.5B / 2.7B</span>
                 </div>
                 <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-[92%]"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
