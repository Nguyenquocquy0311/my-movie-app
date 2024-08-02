import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DonateModalContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DonateModalContext = createContext<DonateModalContextProps | undefined>(undefined);

export const useDonateModal = () => {
  const context = useContext(DonateModalContext);
  if (!context) {
    throw new Error('useDonateModal must be used within a DonateModalProvider');
  }
  return context;
};

export const DonateModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <DonateModalContext.Provider value={{ open, setOpen }}>
      {children}
    </DonateModalContext.Provider>
  );
};
