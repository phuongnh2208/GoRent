import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cars } = useAppContext();
  const { carId, startDate, endDate, totalPrice } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [paymentType, setPaymentType] = useState('full'); // 'full' or 'deposit'
  const [isProcessing, setIsProcessing] = useState(false);

  const car = cars.find(c => c.id === carId);

  if (!car) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-maroon font-bold">Dữ liệu không hợp lệ. Vui lòng thử lại.</p>
      </div>
    );
  }

  const depositAmount = totalPrice * 0.3;
  const finalAmount = paymentType === 'full' ? totalPrice : depositAmount;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/contract/success', { 
        state: { 
          car, 
          startDate, 
          endDate, 
          totalPrice, 
          paidAmount: finalAmount,
          paymentMethod,
          paymentType
        } 
      });
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-bold text-maroon/40 hover:text-maroon transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-maroon">Thanh toán</h1>
            <p className="text-black mt-2 font-medium">Vui lòng chọn phương thức thanh toán và loại hình thanh toán.</p>
          </div>

          {/* Payment Type Selection */}
          <div className="glass bg-white/40 rounded-3xl p-8 border border-white/20 shadow-xl shadow-maroon/5">
            <h3 className="text-lg font-bold text-maroon mb-6">Loại hình thanh toán</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setPaymentType('full')}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${paymentType === 'full' ? 'border-maroon bg-maroon/5' : 'border-white bg-white/40 hover:border-maroon/20'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-maroon">Thanh toán 100%</span>
                  {paymentType === 'full' && <CheckCircle2 className="w-5 h-5 text-maroon" />}
                </div>
                <p className="text-2xl font-bold text-maroon">{totalPrice.toLocaleString()}đ</p>
                <p className="text-xs text-black font-medium mt-1">Giảm thiểu thủ tục khi nhận xe</p>
              </button>

              <button 
                onClick={() => setPaymentType('deposit')}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${paymentType === 'deposit' ? 'border-maroon bg-maroon/5' : 'border-white bg-white/40 hover:border-maroon/20'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-maroon">Đặt cọc 30%</span>
                  {paymentType === 'deposit' && <CheckCircle2 className="w-5 h-5 text-maroon" />}
                </div>
                <p className="text-2xl font-bold text-maroon">{depositAmount.toLocaleString()}đ</p>
                <p className="text-xs text-black font-medium mt-1">Thanh toán phần còn lại khi nhận xe</p>
              </button>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="glass bg-white/40 rounded-3xl p-8 border border-white/20 shadow-xl shadow-maroon/5">
            <h3 className="text-lg font-bold text-maroon mb-6">Phương thức thanh toán</h3>
            <div className="space-y-4">
              {[
                { id: 'visa', name: 'Thẻ Quốc tế (Visa/Mastercard)', icon: CreditCard },
                { id: 'momo', name: 'Ví điện tử MoMo', icon: Smartphone },
                { id: 'transfer', name: 'Chuyển khoản Ngân hàng', icon: Building2 },
              ].map((method) => (
                <button 
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${paymentMethod === method.id ? 'border-maroon bg-maroon/5' : 'border-white bg-white/40 hover:border-maroon/20'}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${paymentMethod === method.id ? 'bg-maroon text-white' : 'bg-white text-maroon shadow-sm'}`}>
                      <method.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-maroon">{method.name}</span>
                  </div>
                  {paymentMethod === method.id && <CheckCircle2 className="w-5 h-5 text-maroon" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-2xl border border-green-100 italic text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Thông tin của bạn được bảo mật tuyệt đối bởi mã hóa AES-256.</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="glass bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-maroon/5 border border-maroon/10 sticky top-24">
            <div className="relative h-44 overflow-hidden">
              <img src={car.image} className="w-full h-full object-cover" alt={car.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-maroon/40">Bạn đang đặt</p>
                 <h3 className="text-2xl font-black text-maroon">{car.name}</h3>
              </div>
            </div>

            <div className="p-8 sm:p-10 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-black font-medium">Biển số:</span>
                  <span className="font-bold text-maroon">{car.licensePlate}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-black font-medium">Ngày nhận:</span>
                  <span className="font-bold text-maroon">{startDate}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-black font-medium">Ngày trả:</span>
                  <span className="font-bold text-maroon">{endDate}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-maroon/10 flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-maroon/40">Cần thanh toán ngay</p>
                  <p className="text-3xl font-black text-maroon">{finalAmount.toLocaleString()}đ</p>
                </div>
                {paymentType === 'deposit' && (
                  <div className="text-right">
                    <p className="text-[10px] text-black font-bold uppercase">Tổng cộng</p>
                    <p className="text-sm font-bold text-maroon">{totalPrice.toLocaleString()}đ</p>
                  </div>
                )}
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-maroon text-white py-5 rounded-2xl font-black uppercase text-sm tracking-wider hover:bg-maroon-dark transition-all flex items-center justify-center shadow-2xl shadow-maroon/30 disabled:opacity-50"
              >
                {isProcessing ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                  />
                ) : (
                  <>Xác nhận & Thanh toán <ChevronRight className="ml-3 w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
