import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type User = { name: string; role: string; rm: string } | null;
type LoginInput = { email: string; password: string };

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);
const STORAGE_KEY = 'cardioia_auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1] || 'e30='));
        setUser({ name: payload.name, role: payload.role, rm: payload.rm });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  async function login({ email, password }: LoginInput) {
    if (!email || !password) throw new Error('Informe email e senha.');
    const payload = btoa(JSON.stringify({ name: 'Dra. Cardia', role: 'cardio', rm: 'RM0001' }));
    const token = `fake.${payload}.token`;
    localStorage.setItem(STORAGE_KEY, token);
    setUser({ name: 'Dra. Cardia', role: 'cardio', rm: 'RM0001' });
    return true;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  const value = useMemo<AuthContextType>(
    () => ({ user, isAuthenticated: !!user, login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}