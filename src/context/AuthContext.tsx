import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import type { User, AuthResponse } from '../types/index';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('@app:userDto');
    const token = localStorage.getItem('@app:accessToken');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password }); //{data:{accessToken: 'mocked-token', userDto: { email:'email@example.com', name: 'Mocked User'}}};//
    const { accessToken, userDto, refreshToken } = response.data;

    localStorage.setItem('@app:accessToken', accessToken);
    localStorage.setItem('@app:userDto', JSON.stringify(userDto));
    localStorage.setItem('@app:refreshToken', refreshToken);
    setUser(userDto);
  };

  const register = async (name: string, email: string, password: string) => {
    await api.post('/auth/register', { name, email, password });
    
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('@app:accessToken');
    localStorage.removeItem('@app:userDto');
    localStorage.removeItem('@app:refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Erro interno');
  return context;
};