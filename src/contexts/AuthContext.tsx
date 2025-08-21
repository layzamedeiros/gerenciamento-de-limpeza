import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '@services/api';
import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

interface AuthContextData {
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  isAppLoading: boolean; 
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [isAppLoading, setIsAppLoading] = useState(true); 

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

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isAppLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };