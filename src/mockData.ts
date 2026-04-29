import { Car, User, RentalContract, Transaction, MaintenanceRecord } from './types';

export const MOCK_MAINTENANCE: MaintenanceRecord[] = [
  { id: 'm1', carId: 'c1', date: '2024-05-15', description: 'Thay nhớt & lọc dầu định kỳ', cost: 1200000, performedBy: 'Lê Văn Dưỡng' },
  { id: 'm2', carId: 'c2', date: '2024-05-20', description: 'Kiểm tra hệ thống phanh', cost: 850000, performedBy: 'Lê Văn Dưỡng' },
  { id: 'm3', carId: 'c4', date: '2024-05-25', description: 'Vệ sinh nội thất & đánh bóng', cost: 1500000, performedBy: 'Lê Văn Dưỡng' },
];

export const MOCK_USERS: User[] = [
  { id: '1', username: 'admin', name: 'Quản trị viên', role: 'admin' },
  { id: '2', username: 'nvtx', name: 'Nguyễn Văn Thuê', role: 'rental_staff' },
  { id: '3', username: 'nvkt', name: 'Trần Thị Kế Toán', role: 'accounting_staff' },
  { id: '4', username: 'nvbd', name: 'Lê Văn Dưỡng', role: 'maintenance_staff' },
  { id: '5', username: 'customer1', name: 'Khách hàng A', role: 'customer' },
  { id: '6', username: 'nvky', name: 'Phạm Văn Kỹ', role: 'technical_staff' },
];

export const MOCK_CARS: Car[] = [
  {
    id: 'c1',
    name: 'VinFast Lux A2.0',
    brand: 'VinFast',
    category: 'car',
    type: 'Sedan',
    licensePlate: '30G-123.45',
    pricePerDay: 1200000,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=80',
    status: 'available',
    year: 2022,
    fuel: 'Gasoline',
    seats: 5
  },
  {
    id: 'c2',
    name: 'Toyota Camry',
    brand: 'Toyota',
    category: 'car',
    type: 'Sedan',
    licensePlate: '30H-567.89',
    pricePerDay: 1500000,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1000&q=80',
    status: 'available',
    year: 2021,
    fuel: 'Hybrid',
    seats: 5
  },
  {
    id: 'c3',
    name: 'Hyundai Santa Fe',
    brand: 'Hyundai',
    category: 'car',
    type: 'SUV',
    licensePlate: '29A-999.99',
    pricePerDay: 1800000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80',
    status: 'rented',
    year: 2023,
    fuel: 'Diesel',
    seats: 7
  },
  {
    id: 'c4',
    name: 'Kia Seltos',
    brand: 'Kia',
    category: 'car',
    type: 'SUV',
    licensePlate: '30K-222.22',
    pricePerDay: 1400000,
    image: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=1000&q=80',
    status: 'available',
    year: 2022,
    fuel: 'Gasoline',
    seats: 5
  },
  {
    id: 'c5',
    name: 'Honda CR-V',
    brand: 'Honda',
    category: 'car',
    type: 'SUV',
    licensePlate: '30F-111.11',
    pricePerDay: 1600000,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
    status: 'maintenance',
    year: 2022,
    fuel: 'Gasoline',
    seats: 7
  },

  // ===== BIKE =====
  {
    id: 'b1',
    name: 'Honda SH 125i',
    brand: 'Honda',
    category: 'bike',
    type: 'Scooter',
    licensePlate: '29B1-123.45',
    pricePerDay: 350000,
    image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=1000&q=80',
    status: 'available',
    year: 2023,
    fuel: 'Gasoline',
    seats: 2
  },
  {
    id: 'b2',
    name: 'Honda Vision',
    brand: 'Honda',
    category: 'bike',
    type: 'Scooter',
    licensePlate: '29K1-567.89',
    pricePerDay: 150000,
    image: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&w=1000&q=80',
    status: 'rented',
    year: 2022,
    fuel: 'Gasoline',
    seats: 2
  },
  {
    id: 'b3',
    name: 'Yamaha Exciter',
    brand: 'Yamaha',
    category: 'bike',
    type: 'Manual',
    licensePlate: '29M1-999.99',
    pricePerDay: 200000,
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1000&q=80',
    status: 'available',
    year: 2023,
    fuel: 'Gasoline',
    seats: 2
  },
  {
    id: 'b4',
    name: 'Suzuki Raider',
    brand: 'Suzuki',
    category: 'bike',
    type: 'Manual',
    licensePlate: '30X1-888.88',
    pricePerDay: 180000,
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1000&q=80',
    status: 'maintenance',
    year: 2021,
    fuel: 'Gasoline',
    seats: 2
  }
];
export const MOCK_CONTRACTS: RentalContract[] = [
  {
    id: 'ct1',
    carId: 'c3',
    userId: '5',
    customerName: 'Khách hàng A',
    customerPhone: '0901234567',
    startDate: '2024-05-01',
    endDate: '2024-05-05',
    totalPrice: 7200000,
    status: 'delivered',
    paymentStatus: 'paid',
    createdAt: '2024-04-25'
  },
  {
    id: 'ct2',
    carId: 'c2',
    userId: '6',
    customerName: 'Khách hàng B',
    customerPhone: '0912345678',
    startDate: '2024-06-10',
    endDate: '2024-06-12',
    totalPrice: 3000000,
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: '2024-06-01'
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    contractId: 'ct1',
    amount: 7200000,
    date: '2024-04-25',
    method: 'transfer',
    status: 'completed'
  },
  {
    id: 't2',
    contractId: 'ct2',
    amount: 1000000,
    date: '2024-06-01',
    method: 'cash',
    status: 'pending'
  }, 
];
