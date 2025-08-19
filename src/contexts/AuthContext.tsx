import React, { createContext, useState, useContext, ReactNode } from 'react';
import api from '@services/api';

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
  login: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post('/accounts/login/', {
        username: username,
        password: password,
      });

      const { token: apiToken, user_data: userData } = response.data;

      api.defaults.headers.common['Authorization'] = `Token ${apiToken}`;

      setToken(apiToken);
      setUser(userData);

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };