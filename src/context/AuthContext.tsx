import { account, ID } from '@/lib/client/appwrite';
import { createContext, useContext, useEffect, useState } from 'react';


interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthState {
  user: null | {id: string; email: string; name: string};
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loading: boolean;
}

const defaultAuthState: AuthState = {
  user: null,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  loading: true,
};

const AuthContext = createContext<AuthState>(defaultAuthState);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<null | {id: string; email: string; name: string}>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { $id, email, name } = await account.get();
        setUser({ id: $id, email, name });
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const { $id, name } = await account.get();
      setUser({ id: $id, email, name });
    } catch (error) {
      console.error(error);
    }
  }

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    try {
      await account.create(ID.unique(), email, password, name);
      login(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);