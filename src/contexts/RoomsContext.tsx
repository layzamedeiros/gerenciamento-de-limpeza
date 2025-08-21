import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Sala, fetchSalas } from '@services/roomsService';
import { useAuth } from './AuthContext'; 

interface SalasContextData {
  salas: Sala[];
  isLoading: boolean;
  refreshSalas: () => Promise<void>;
}

const SalasContext = createContext<SalasContextData>({} as SalasContextData);

function SalasProvider({ children }: { children: ReactNode }) {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [isLoading, setIsLoading] = useState(false); 
  
  const { token } = useAuth(); 

  const refreshSalas = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchSalas();
      setSalas(data);
    } catch (error) {
      console.error("Failed to refresh salas from context:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      refreshSalas();
    }
  }, [token]); 

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