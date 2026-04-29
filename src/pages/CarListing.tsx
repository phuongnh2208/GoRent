import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { VehicleCategory } from '../types';
import { Filter, Search, ChevronDown, CarFront, Fuel, Users, Bike } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CarListing() {
  const { cars } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [activeCategory, setActiveCategory] = useState<VehicleCategory | 'All'>('All');

  const types = activeCategory === 'bike' 
    ? ['All', 'Scooter', 'Manual', 'Sport']
    : ['All', 'Sedan', 'SUV', 'Luxury', 'Family'];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeType === 'All' || car.type === activeType;
    const matchesCategory = activeCategory === 'All' || car.category === activeCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header / Filter segment */}
      <div className="bg-slate-50 py-16 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-maroon/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-maroon">Tìm phương tiện <br/><span className="text-maroon-light">Hoàn hảo cho bạn</span></h1>
              <p className="text-black text-sm font-medium">Hơn 50+ mẫu ô tô & xe máy đời mới sẵn sàng phục vụ mọi nhu cầu di chuyển của bạn với chi phí tối ưu nhất.</p>
              
              <div className="flex items-center space-x-4 mt-8">
                <button 
                  onClick={() => { setActiveCategory('car'); setActiveType('All'); }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all ${activeCategory === 'car' ? 'bg-maroon text-white shadow-lg shadow-maroon/20' : 'bg-white text-gray-400 hover:text-maroon border border-gray-100'}`}
                >
                  <CarFront className="w-5 h-5" />
                  <span>Ô tô</span>
                </button>
                <button 
                  onClick={() => { setActiveCategory('bike'); setActiveType('All'); }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all ${activeCategory === 'bike' ? 'bg-maroon text-white shadow-lg shadow-maroon/20' : 'bg-white text-gray-400 hover:text-maroon border border-gray-100'}`}
                >
                  <Bike className="w-5 h-5" />
                  <span>Xe máy</span>
                </button>
                <button 
                  onClick={() => { setActiveCategory('All'); setActiveType('All'); }}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all ${activeCategory === 'All' ? 'bg-maroon text-white shadow-lg shadow-maroon/20' : 'bg-white text-gray-400 hover:text-maroon border border-gray-100'}`}
                >
                  Tất cả
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
               {types.map(type => (
                 <button
                   key={type}
                   onClick={() => setActiveType(type)}
                   className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                     activeType === type 
                     ? 'bg-maroon text-white border-maroon shadow-lg shadow-maroon/20' 
                     : 'glass bg-white text-gray-500 border-gray-100 hover:border-maroon'
                   }`}
                 >
                   {type}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="glass bg-white/60 rounded-3xl p-2 shadow-2xl shadow-maroon/5 flex items-center border border-white/40">
           <div className="flex-grow flex items-center px-6">
              <Search className="w-5 h-5 text-maroon/30 mr-4" />
              <input 
                type="text" 
                placeholder="Nhập tên xe bạn muốn tìm..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-4 text-sm font-medium focus:outline-none bg-transparent text-maroon placeholder:text-maroon/30"
              />
           </div>
           <button className="hidden md:flex items-center px-8 py-4 glass bg-white/40 text-maroon rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/60 transition-all">
              <Filter className="w-4 h-4 mr-2" /> Bộ lọc
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCars.map((car, idx) => (
              <motion.div 
                key={car.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => navigate(`/car/${car.id}`)}
                className="group cursor-pointer glass bg-white/40 rounded-[2.5rem] p-4 border border-white/20 hover:border-maroon/20 hover:shadow-2xl hover:shadow-maroon/10 transition-all"
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-slate-50 mb-6">
                   <img src={car.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={car.name} />
                   <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase shadow-sm">
                        {car.brand}
                      </span>
                   </div>
                   <div className="absolute top-4 right-4">
                      <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${car.status === 'available' ? 'bg-green-500' : 'bg-red-500'}`} />
                   </div>
                </div>

                <div className="px-4 pb-4">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-bold">{car.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                               car.status === 'available' ? 'bg-green-100 text-green-700' :
                               car.status === 'rented' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                               {car.status === 'available' ? 'Sẵn sàng' : car.status === 'rented' ? 'Đang thuê' : 'Bảo trì'}
                            </span>
                         </div>
                         <div className="flex items-center space-x-3 text-black font-semibold">
                            <span className="text-[10px] font-bold uppercase">{car.type}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="text-[10px] font-bold uppercase">{car.year}</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xl font-bold">{car.pricePerDay.toLocaleString()}đ</p>
                         <p className="text-[10px] font-bold uppercase text-black">/ ngày</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-50">
                      <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-2xl">
                         <Fuel className="w-4 h-4 text-gray-400 mb-1.5" />
                         <span className="text-[10px] font-bold uppercase text-black">{car.fuel}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-2xl">
                         {car.category === 'car' ? <Users className="w-4 h-4 text-gray-400 mb-1.5" /> : <Bike className="w-4 h-4 text-gray-400 mb-1.5" />}
                         <span className="text-[10px] font-bold uppercase text-black">{car.seats} {car.category === 'car' ? 'chỗ' : 'người'}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-2xl">
                         <div className="w-4 h-4 text-gray-400 mb-1.5 flex items-center justify-center font-bold text-[8px] border border-gray-400 rounded-sm">
                            {car.type.charAt(0)}
                         </div>
                         <span className="text-[10px] font-bold uppercase text-black">{car.type}</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
         </div>

          {filteredCars.length === 0 && (
           <div className="py-40 text-center flex flex-col items-center">
              {activeCategory === 'bike' ? <Bike className="w-16 h-16 text-gray-100 mb-6" /> : <CarFront className="w-16 h-16 text-gray-100 mb-6" />}
              <p className="text-xl font-bold text-gray-300 italic">Oops! Không tìm thấy mẫu {activeCategory === 'bike' ? 'xe máy' : 'xe'} này...</p>
           </div>
          )}
      </div>
    </div>
  );
}
