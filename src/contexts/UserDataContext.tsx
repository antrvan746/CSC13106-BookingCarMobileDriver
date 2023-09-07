import React, { createContext, useContext, useState } from 'react';
import { RideReq } from '../services/DriverWaitXHR';

export type DriverData = {
  id: string,
  name: string,
  phone: string,
  email?: string
}

export type VehicleData = {
  id: string,
  driver_id: string,
  model: string,
  plate_number: string,
  color: string,
  type: string,
}

type UserData = {
  tripData: RideReq | null
  driverData: DriverData | null;
  vehicleData: VehicleData | null;
  setDriverData: React.Dispatch<DriverData>;
  setVehicleData: React.Dispatch<VehicleData>;
  setTripData: React.Dispatch<RideReq>;
};

type UserDataContextType = UserData & {
  clearUserData: () => void;
};

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}

interface UserDataProviderProps {
  children: React.ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [driverData, setDriverData] = useState<DriverData | null>(null);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [tripData, setTripData] = useState<RideReq | null>(null);

  const clearUserData = () => {
    setDriverData(null);
    setVehicleData(null);
  };

  const userDataContextValue: UserDataContextType = {
    driverData,
    vehicleData,
    tripData,
    setDriverData,
    setVehicleData,
    setTripData,
    clearUserData,
  };

  return (
    <UserDataContext.Provider value={userDataContextValue}>
      {children}
    </UserDataContext.Provider>
  );
};
