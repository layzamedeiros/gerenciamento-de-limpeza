import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '@services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@services/employee.service';

interface AuthUser extends User {}

const ZELADORIA_GROUP_ID = 1;
const SOLICITANTE_GROUP_ID = 2;

interface AuthContextData {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAppLoading: boolean;
  isZeladoria: boolean; 
  isSolicitante: boolean; 
  isMemberOfSolicitante: boolean;
  isAdmin: boolean; 
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const isAdmin = !!user?.is_superuser;
  
  const isZeladoria = !isAdmin && !!user?.groups.includes(ZELADORIA_GROUP_ID);
  
  const isSolicitante = !isAdmin && !isZeladoria && !!user?.groups.includes(SOLICITANTE_GROUP_ID);

  const isMemberOfSolicitante = !!user?.groups.includes(SOLICITANTE_GROUP_ID);

  useEffect(() => {
    async function loadStorageData() {
      const storedToken = await AsyncStorage.getItem('@ZeladoriaApp:token');
      const storedUser = await AsyncStorage.getItem('@ZeladoriaApp:user');

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        api.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
      }
      setIsAppLoading(false);
    }
    loadStorageData();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post('/accounts/login/', {
        username: username,
        password: password,
      });

      const { token: apiToken, user_data: userData } = response.data;

      await AsyncStorage.setItem('@ZeladoriaApp:token', apiToken);
      await AsyncStorage.setItem('@ZeladoriaApp:user', JSON.stringify(userData));

      api.defaults.headers.common['Authorization'] = `Token ${apiToken}`;
      setToken(apiToken);
      setUser(userData);

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    await AsyncStorage.removeItem('@ZeladoriaApp:token');
    await AsyncStorage.removeItem('@ZeladoriaApp:user');
  };
  
  const refreshUser = async () => {
    try {
      const response = await api.get('/accounts/current_user/');
      const updatedUserData = response.data;
      
      setUser(updatedUserData);
      await AsyncStorage.setItem('@ZeladoriaApp:user', JSON.stringify(updatedUserData));
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      logout(); 
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isMemberOfSolicitante, isSolicitante, isZeladoria, isAppLoading, isAdmin, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };