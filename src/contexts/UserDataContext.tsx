import React, { createContext, useContext, useState } from 'react';

type UserData = {
  driverData: any;
  vehicleData: any;
  setDriverData: React.Dispatch<any>;
  setVehicleData: React.Dispatch<any>;
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
  const [driverData, setDriverData] = useState<any>(null);
  const [vehicleData, setVehicleData] = useState<any>(null);

  const clearUserData = () => {
    setDriverData(null);
    setVehicleData(null);
  };

  const userDataContextValue: UserDataContextType = {
    driverData,
    setDriverData,
    vehicleData,
    setVehicleData,
    clearUserData,
  };

  return (
    <UserDataContext.Provider value={userDataContextValue}>
      {children}
    </UserDataContext.Provider>
  );
};
