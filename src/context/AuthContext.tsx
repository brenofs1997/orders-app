import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import type { User, AuthResponse } from '../types/index';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (nome: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('@app:user');
    const token = localStorage.getItem('@app:token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    const response = await api.post<AuthResponse>('/auth/login', { email, senha: pass });
    const { token, user: userData } = response.data;

    localStorage.setItem('@app:token', token);
    localStorage.setItem('@app:user', JSON.stringify(userData));
    setUser(userData);
  };

  const register = async (nome: string, email: string, pass: string) => {
    await api.post('/auth/register', { nome, email, senha: pass });
    
    await login(email, pass);
  };

  const logout = () => {
    localStorage.removeItem('@app:token');
    localStorage.removeItem('@app:user');
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