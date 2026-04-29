import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Star, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { cars } = useAppContext();
  const featuredCars = [
    ...cars.filter(c => c.category === 'car').slice(0, 2),
    ...cars.filter(c => c.category === 'bike').slice(0, 1)
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Car" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-32 md:pb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 md:gap-12"
          >
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-maroon/20 backdrop-blur-md rounded-full text-[10px] font-black text-white hover:text-maroon hover:bg-white transition-colors cursor-default uppercase tracking-widest mb-8 border border-white/20">
                Exclusive Rental Experience
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tighter leading-[0.9] mb-8 text-white drop-shadow-2xl">
                Cùng GoRent <br />
                <span className="text-maroon brightness-125 font-serif italic font-bold text-[0.85em] tracking-normal">KIẾN TẠO <br className="sm:hidden" /> HÀNH TRÌNH</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-black mb-10 max-w-lg leading-relaxed font-bold bg-white/80 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white shadow-2xl">
                Trải nghiệm dịch vụ thuê ô tô & xe máy hạng sang, linh hoạt và tiện nghi nhất. 
                Sẵn sàng cho mọi chuyến đi của bạn.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 mb-10 lg:mb-12">
              <button 
                onClick={() => navigate('/cars')}
                className="bg-maroon text-white px-10 py-5 rounded-full font-black uppercase text-sm hover:bg-maroon-dark transition-all flex items-center justify-center group shadow-[0_20px_50px_-15px_rgba(128,0,0,0.4)] shrink-0"
              >
                Thuê xe ngay
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="glass bg-white/10 text-white px-10 py-5 rounded-full font-black uppercase text-sm hover:bg-white/20 transition-all border border-white/40 backdrop-blur-md shrink-0">
                Tìm hiểu thêm
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Search */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 sm:-mt-16 relative z-20">
        <div className="glass bg-white/40 backdrop-blur-3xl border border-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] p-6 md:p-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-maroon flex items-center tracking-tighter opacity-80">
              <MapPin className="w-3 h-3 mr-2" /> Địa điểm
            </label>
            <input 
              type="text" 
              placeholder="Hà Nội, Việt Nam" 
              className="w-full text-sm font-black focus:outline-none placeholder:text-gray-500 bg-transparent text-black"
            />
          </div>
          <div className="space-y-1 md:border-l md:pl-8 border-black/10">
            <label className="text-[10px] font-black uppercase text-maroon flex items-center tracking-tighter opacity-80">
              <Calendar className="w-3 h-3 mr-2" /> Ngày nhận
            </label>
            <input 
              type="date" 
              className="w-full text-sm font-black focus:outline-none bg-transparent text-black"
            />
          </div>
          <div className="space-y-1 md:border-l md:pl-8 border-black/10">
            <label className="text-[10px] font-black uppercase text-maroon flex items-center tracking-tighter opacity-80">
              <Calendar className="w-3 h-3 mr-2" /> Ngày trả
            </label>
            <input 
              type="date" 
              className="w-full text-sm font-black focus:outline-none bg-transparent text-black"
            />
          </div>
          <button 
            onClick={() => navigate('/cars')}
            className="bg-maroon text-white rounded-2xl flex items-center justify-center px-6 py-4 hover:bg-maroon-dark transition-all shadow-xl shadow-maroon/20 group"
          >
            <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-black text-sm uppercase">Tìm xe</span>
          </button>
        </div>
      </div>

      {/* Featured Cars */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-maroon mb-2">Our Collection</h2>
            <p className="text-4xl font-bold tracking-tight text-maroon">Xe nổi bật</p>
          </div>
          <button 
            onClick={() => navigate('/cars')}
            className="text-sm font-bold text-black hover:text-maroon flex items-center transition-all underline underline-offset-8"
          >
            Xem tất cả <ChevronRight className="ml-1 w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCars.map((car, idx) => (
            <motion.div 
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/car/${car.id}`)}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-4">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                   <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm">
                     {car.type}
                   </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold group-hover:text-gray-600 transition-colors">{car.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-wider ${
                      car.status === 'available' ? 'bg-green-100 text-green-700' :
                      car.status === 'rented' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {car.status === 'available' ? 'Sẵn sàng' : car.status === 'rented' ? 'Đang thuê' : 'Bảo trì'}
                    </span>
                  </div>
                  <p className="text-xs text-black font-semibold uppercase tracking-wider">{car.brand} &middot; {car.year}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{car.pricePerDay.toLocaleString()}đ</p>
                  <p className="text-[10px] font-bold uppercase text-black">/ ngày</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-maroon/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-xs font-bold uppercase tracking-widest text-maroon mb-2">Why GoRent</h2>
             <p className="text-4xl font-bold tracking-tight text-maroon">Tại sao chọn chúng tôi?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: 'An toàn tuyệt đối', desc: 'Mọi chuyến đi đều được bảo hiểm và đội ngũ hỗ trợ 24/7.' },
              { icon: Star, title: 'Chất lượng 5 sao', desc: 'Dàn xe đời mới, sạch sẽ và được bảo dưỡng định kỳ.' },
              { icon: Clock, title: 'Thủ tục nhanh gọn', desc: 'Đặt xe chỉ trong 3 phút, nhận xe ngay tại chỗ.' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 glass bg-white/40 rounded-2xl flex items-center justify-center shadow-lg shadow-maroon/5 mb-6">
                  <item.icon className="w-8 h-8 text-maroon" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-maroon">{item.title}</h3>
                <p className="text-black font-semibold leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
