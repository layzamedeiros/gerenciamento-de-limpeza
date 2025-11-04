import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { User, fetchUsers } from '@services/employee.service';
import { useAuth } from './AuthContext';
import { ApiKey, ApiValue, UserFilterStatus } from '@components/FilterUserButton';
import { _includes } from 'zod/v4/core';

interface EmployeeContextData {
  filteredUsers: User[];
  isLoading: boolean;
  refreshUsers: () => Promise<void>;

  activeFilter: UserFilterStatus;
  searchTerm: string | undefined;

  setActiveFilter: (status: UserFilterStatus) => void;
  setFilterParams: (keyName: ApiKey, keyValue: ApiValue) => void;
  setSearchTerm: (term: string | undefined) => void;
}

const EmployeeContext = createContext<EmployeeContextData>({} as EmployeeContextData);

function EmployeeProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin, isAppLoading } = useAuth();

  const [activeFilter, setActiveFilter] = useState<UserFilterStatus>("todas");
  const [filterKey, setFilterKey] = useState<ApiKey>();
  const [filterValue, setFilterValue] = useState<ApiValue>();
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const setFilterParams = useCallback((keyName: ApiKey, keyValue: ApiValue) => {
    setFilterKey(keyName);
    setFilterValue(keyValue);
  }, []);

  const refreshUsers = useCallback(async () => {
    if (!isAdmin) {
      setUsers([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchUsers(filterKey, filterValue);
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users in context:", error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin, filterKey, filterValue]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return users;
    }

    const term = searchTerm.toLowerCase();

    return users.filter(user => {
      const name = user.name || user.username || '';
      const email = user.email || '';
      const username = user.username?.toLowerCase() || "";

      return (
        name.includes(term) ||
        email.includes(term) ||
        username.includes(term)
      );
    });
  }, [users, searchTerm]);

  useEffect(() => {
    if (!isAppLoading) {
      refreshUsers();
    }
  }, [isAdmin, isAppLoading, refreshUsers]);

  return (
    <EmployeeContext.Provider value={{ filteredUsers, isLoading, refreshUsers, activeFilter, searchTerm, setActiveFilter, setFilterParams, setSearchTerm }}>
      {children}
    </EmployeeContext.Provider>
  );
}

function useEmployees() {
  const context = useContext(EmployeeContext);
  return context;
}

export { EmployeeProvider, useEmployees };