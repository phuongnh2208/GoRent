/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'admin' | 'rental_staff' | 'technical_staff' | 'maintenance_staff' | 'accounting_staff' | 'customer';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export type VehicleStatus = 'available' | 'rented' | 'maintenance';
export type VehicleCategory = 'car' | 'bike';

export interface Car {
  id: string;
  name: string;
  type: string;
  category: VehicleCategory;
  brand: string;
  licensePlate: string;
  pricePerDay: number;
  image: string;
  status: VehicleStatus;
  year: number;
  fuel: string;
  seats: number;
}

export type RentalStatus = 'pending' | 'confirmed' | 'delivered' | 'returned' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid';

export interface RentalContract {
  id: string;
  carId: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: RentalStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  deliveryNotes?: string;
  returnNotes?: string;
  additionalFees?: number;
  createdAt: string;
}

export interface MaintenanceRecord {
  id: string;
  carId: string;
  date: string;
  description: string;
  cost: number;
  performedBy: string;
}

export interface Transaction {
  id: string;
  contractId: string;
  amount: number;
  date: string;
  method: 'cash' | 'transfer' | 'card';
  status: 'pending' | 'completed';
}
