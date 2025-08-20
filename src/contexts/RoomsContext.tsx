import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Sala, fetchSalas } from '@services/roomsService'; 

interface SalasContextData {
  salas: Sala[];
  isLoading: boolean;
  refreshSalas: () => Promise<void>; 
}

const SalasContext = createContext<SalasContextData>({} as SalasContextData);

function SalasProvider({ children }: { children: ReactNode }) {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSalas = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchSalas();
      setSalas(data);
    } catch (error) {
      console.error("Failed to refresh salas from context:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useState(() => {
    refreshSalas();
  });

  return (
    <SalasContext.Provider value={{ salas, isLoading, refreshSalas }}>
      {children}
    </SalasContext.Provider>
  );
}

function useSalas() {
  const context = useContext(SalasContext);
  return context;
}

export { SalasProvider, useSalas };