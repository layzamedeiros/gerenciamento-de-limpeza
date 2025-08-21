import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Sala, fetchSalas } from '@services/roomsService'; 
import { useAuth } from '@contexts/AuthContext';

interface SalasContextData {
  salas: Sala[];
  isLoading: boolean;
  refreshSalas: () => Promise<void>; 
}

const SalasContext = createContext<SalasContextData>({} as SalasContextData);

function SalasProvider({ children }: { children: ReactNode }) {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isAppLoading } = useAuth();

  const refreshSalas = useCallback(async () => {
    try {
      if (!token) return; 
      setIsLoading(true);
      const data = await fetchSalas();
      setSalas(data);
    } catch (error) {
      console.error("Failed to refresh salas from context:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isAppLoading && token) {
      refreshSalas();
    }
  }, [isAppLoading, token, refreshSalas]);

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
