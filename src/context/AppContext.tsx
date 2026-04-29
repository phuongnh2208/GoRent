import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Car, RentalContract, Transaction, UserRole, MaintenanceRecord } from '../types';
import { MOCK_USERS, MOCK_CARS, MOCK_CONTRACTS, MOCK_TRANSACTIONS, MOCK_MAINTENANCE } from '../mockData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  contracts: RentalContract[];
  setContracts: React.Dispatch<React.SetStateAction<RentalContract[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  maintenanceRecords: MaintenanceRecord[];
  setMaintenanceRecords: React.Dispatch<React.SetStateAction<MaintenanceRecord[]>>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateCarStatus: (carId: string, status: Car['status']) => void;
  addContract: (contract: Omit<RentalContract, 'id' | 'createdAt'>) => string;
  updateContract: (contractId: string, updates: Partial<RentalContract>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gorent_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cars, setCars] = useState<Car[]>(MOCK_CARS);
  const [contracts, setContracts] = useState<RentalContract[]>(MOCK_CONTRACTS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>(MOCK_MAINTENANCE);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gorent_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gorent_user');
    }
  }, [currentUser]);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock login logic as requested
    const validPasswords: Record<string, string> = {
      'admin': '123',
      'nvtx': '123',
      'nvkt': '123',
      'nvbd': '123'
    };

    const user = MOCK_USERS.find(u => u.username === username);
    if (user && validPasswords[username] === password) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateCarStatus = (carId: string, status: Car['status']) => {
    setCars(prev => prev.map(c => c.id === carId ? { ...c, status } : c));
  };

  const addContract = (contractData: Omit<RentalContract, 'id' | 'createdAt'>) => {
    const newId = `ct${Date.now()}`;
    const newContract: RentalContract = {
      ...contractData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setContracts(prev => [newContract, ...prev]);
    return newId;
  };

  const updateContract = (contractId: string, updates: Partial<RentalContract>) => {
    setContracts(prev => prev.map(c => c.id === contractId ? { ...c, ...updates } : c));
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      cars, setCars,
      contracts, setContracts,
      transactions, setTransactions,
      maintenanceRecords, setMaintenanceRecords,
      login, logout,
      updateCarStatus, addContract, updateContract
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
