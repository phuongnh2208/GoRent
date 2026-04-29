import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  Shield, 
  Mail, 
  Phone,
  Edit2,
  Trash2
} from 'lucide-react';
import { MOCK_USERS } from '../../mockData';

export default function UserManagement() {
  const users = MOCK_USERS; // Usually we would get this from context or API

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-maroon">Quản lý Người dùng</h1>
          <p className="text-sm text-gray-500 mt-1">Phân quyền, quản lý tài khoản nhân viên và khách hàng.</p>
        </div>
        <button className="bg-maroon text-white px-5 py-2.5 rounded-2xl flex items-center text-sm font-bold shadow-lg shadow-maroon/10 hover:bg-maroon-dark transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Thêm tài khoản
        </button>
      </div>

      <div className="glass bg-white/40 rounded-3xl border border-white/20 shadow-xl shadow-maroon/5 overflow-hidden">
        <div className="p-8 border-b border-white/20 flex justify-between items-center">
           <div className="relative max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon opacity-30" />
              <input type="text" placeholder="Tìm kiếm tài khoản..." className="w-full pl-12 pr-4 py-3 glass bg-white/40 rounded-2xl border-none focus:ring-2 focus:ring-maroon/10 text-sm text-maroon placeholder:text-maroon/30" />
           </div>
           
           <div className="flex space-x-2">
              {['admin', 'staff', 'customer'].map(role => (
                <button key={role} className="px-4 py-2 glass bg-white/40 border border-white/60 rounded-xl text-xs font-bold uppercase tracking-widest text-maroon opacity-40 hover:text-maroon hover:opacity-100 transition-all">
                  {role}
                </button>
              ))}
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                <tr className="bg-white/10">
                  <th className="px-8 py-4 text-[10px] font-bold text-maroon opacity-40 uppercase tracking-widest">Người dùng</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-maroon opacity-40 uppercase tracking-widest">Tên đăng nhập</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-maroon opacity-40 uppercase tracking-widest">Vai trò</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-maroon opacity-40 uppercase tracking-widest text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-white/40 transition-colors">
                    <td className="px-8 py-5">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 glass bg-white/60 rounded-full flex items-center justify-center font-bold text-maroon border border-white">
                             {user.name.charAt(0)}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-maroon">{user.name}</p>
                             <p className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest">ID: {user.id}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <span className="text-sm font-medium text-maroon/60">{user.username}</span>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center">
                          <div className={`p-1.5 rounded-lg mr-2 ${
                            user.role === 'admin' ? 'bg-maroon text-white' :
                            user.role.includes('staff') ? 'bg-maroon-light/20 text-maroon' : 'glass bg-white/40 text-maroon/40 border border-white'
                          }`}>
                             <Shield className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold capitalize text-maroon/80">{user.role.replace('_', ' ')}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-maroon/40 hover:text-maroon hover:bg-white/60 rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                          <button className="p-2 text-maroon/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                          <button className="p-2 text-maroon/40 hover:text-maroon hover:bg-white/60 rounded-lg transition-all"><MoreVertical className="w-4 h-4" /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
