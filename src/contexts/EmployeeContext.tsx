import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { User, fetchUsers } from '@services/employee.service';
import { useAuth } from './AuthContext';

interface EmployeeContextData {
  users: User[];
  isLoading: boolean;
  refreshUsers: () => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextData>({} as EmployeeContextData);

function EmployeeProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin, isAppLoading } = useAuth(); 

  const refreshUsers = useCallback(async () => {
    if (!isAdmin) {
      setUsers([]); 
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users in context:", error);
      setUsers([]); 
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]); 

  useEffect(() => {
    if (!isAppLoading) {
      refreshUsers();
    }
  }, [isAdmin, isAppLoading]);

  return (
    <EmployeeContext.Provider value={{ users, isLoading, refreshUsers }}>
      {children}
    </EmployeeContext.Provider>
  );
}

function useEmployees() {
  const context = useContext(EmployeeContext);
  return context;
}

export { EmployeeProvider, useEmployees };