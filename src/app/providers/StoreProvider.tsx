import React, { createContext, useContext } from 'react';
import { UserStore } from '~/entities/user';
import { ShiftStore } from '~/entities/shift';

class RootStore {
  user: UserStore;
  shifts: ShiftStore;

  constructor() {
    this.user = new UserStore();
    this.shifts = new ShiftStore();
  }
}

const rootStore = new RootStore();
const StoreContext = createContext(rootStore);

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
