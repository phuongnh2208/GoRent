import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Download, 
  Printer, 
  FileText, 
  MapPin, 
  Calendar,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function SuccessContract() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    car, 
    startDate, 
    endDate, 
    totalPrice, 
    paidAmount, 
    paymentMethod, 
    paymentType 
  } = location.state || {};

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-maroon font-bold">Dữ liệu không hợp lệ.</p>
        <button onClick={() => navigate('/')} className="text-maroon underline">Quay về trang chủ</button>
      </div>
    );
  }

  const contractId = Math.random().toString(36).substring(2, 9).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in zoom-in duration-500 pb-20">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-black text-maroon tracking-tight mb-4">Giao dịch thành công!</h1>
        <p className="text-black font-medium">Mã hợp đồng của bạn là: <span className="font-mono font-bold text-maroon">#{contractId}</span></p>
      </div>

      <div className="glass bg-white/60 rounded-[3rem] border border-white/20 shadow-2xl shadow-maroon/5 overflow-hidden">
        <div className="p-10 md:p-16 space-y-12">
          {/* Contract Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-12 border-b border-maroon/10">
            <div>
              <div className="flex items-center space-x-2 text-maroon mb-2">
                <FileText className="w-5 h-5 opacity-60" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-maroon/40">Hợp đồng điện tử</span>
              </div>
              <h2 className="text-3xl font-black text-maroon italic">GoRent Concierge</h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-maroon opacity-40 mb-1">Ngày khởi tạo</p>
              <p className="font-bold text-maroon">{new Date().toLocaleDateString('vi-VN')}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-maroon/5 rounded-3xl overflow-hidden border border-maroon/10">
            <div className="bg-white/40 p-8 glass">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-maroon/40 mb-4">Khách hàng</h3>
              <p className="text-lg font-bold text-maroon">Nguyễn Văn Khách</p>
              <p className="text-sm text-black font-medium">customer@gorent.vn</p>
              <p className="text-sm text-black font-medium">0987 654 321</p>
            </div>
            <div className="bg-white/40 p-8 glass">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-maroon/40 mb-4">Phương tiện</h3>
              <p className="text-lg font-bold text-maroon">{car.name}</p>
              <p className="text-sm text-black font-medium">Biển số: {car.licensePlate}</p>
              <p className="text-sm text-black font-medium">Màu sắc: Xanh Frozen Metallic</p>
            </div>
            <div className="bg-white/40 p-8 glass">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-maroon/40 mb-4">Điểm nhận xe</h3>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-maroon shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-maroon">Trụ sở chính GoRent</p>
                  <p className="text-sm text-black font-medium">123 Đường Láng, Đống Đa, Hà Nội</p>
                </div>
              </div>
            </div>
            <div className="bg-white/40 p-8 glass">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-maroon/40 mb-4">Thời gian thuê</h3>
              <div className="flex items-center space-x-6">
                <div>
                  <p className="text-[10px] font-bold uppercase text-maroon/40">Bắt đầu</p>
                  <p className="font-bold text-maroon">{startDate}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-maroon opacity-20" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-maroon/40">Kết thúc</p>
                  <p className="font-bold text-maroon">{endDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Status Summary */}
          <div className="bg-maroon/5 rounded-3xl p-8 border border-maroon/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-maroon/5 rounded-full blur-2xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-maroon/40 mb-1">Tình trạng thanh toán</p>
                <h4 className="text-2xl font-black text-maroon">
                  {paymentType === 'full' ? 'Đã thanh toán 100%' : 'Đã cọc 30%'}
                </h4>
                <p className="text-sm text-black font-semibold mt-1">Phương thức: {paymentMethod.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-maroon/40 mb-1">Số tiền đã trả</p>
                <div className="text-4xl font-black text-maroon">{paidAmount.toLocaleString()}đ</div>
                <p className="text-sm text-green-600 font-bold flex items-center justify-end mt-1">
                  <ShieldCheck className="w-4 h-4 mr-1" /> Transaction Verified
                </p>
              </div>
            </div>
          </div>

          {/* Digital Signature */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 pt-12 border-t border-maroon/10">
            <div className="w-full md:w-auto">
              <p className="text-[10px] font-bold uppercase tracking-widest text-maroon opacity-40 mb-4">Chữ ký điện tử của khách hàng</p>
              <div className="h-24 w-full md:w-64 glass bg-white/40 border-b-2 border-maroon/20 rounded-xl flex items-center justify-center font-signature text-3xl text-maroon/80 transform -rotate-2 select-none">
                Nguyễn Văn Khách
              </div>
              <p className="text-[8px] font-bold text-maroon/30 uppercase mt-2">Authenticated on {new Date().toISOString()}</p>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-grow md:flex-none flex items-center justify-center px-8 py-4 glass bg-white text-maroon border border-maroon/20 rounded-2xl font-bold hover:bg-white/80 transition-all shadow-lg shadow-maroon/5">
                <Download className="w-4 h-4 mr-2" /> Tải về
              </button>
              <button className="flex-grow md:flex-none flex items-center justify-center px-8 py-4 bg-maroon text-white rounded-2xl font-bold hover:bg-maroon-dark transition-all shadow-xl shadow-maroon/20">
                <Printer className="w-4 h-4 mr-2" /> In hợp đồng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={() => navigate('/')}
          className="text-maroon font-bold hover:underline underline-offset-8"
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
}
