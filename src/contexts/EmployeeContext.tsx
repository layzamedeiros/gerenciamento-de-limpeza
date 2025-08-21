import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Funcionario, fetchFuncionarios } from '@services/employeeService';
import { useAuth } from './AuthContext';

interface EmployeeContextData {
  funcionarios: Funcionario[];
  isLoading: boolean;
  refreshFuncionarios: () => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextData>({} as EmployeeContextData);

function EmployeeProvider({ children }: { children: ReactNode }) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const refreshFuncionarios = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchFuncionarios();
      setFuncionarios(data);
    } catch (error) {
      console.error("Falha ao carregar funcionários do contexto:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      refreshFuncionarios();
    }
  }, [token]);

  return (
    <EmployeeContext.Provider value={{ funcionarios, isLoading, refreshFuncionarios }}>
      {children}
    </EmployeeContext.Provider>
  );
}

function useEmployees() {
  const context = useContext(EmployeeContext);
  return context;
}

export { EmployeeProvider, useEmployees };