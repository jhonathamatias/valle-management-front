import axios from "axios";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useStorage from "../hooks/storage";
import api, { apiAuth } from "../services/api";

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  authenticated: boolean;
  login: (user: User, callback: VoidFunction, failback: (error: any) => void) => void;
  logout: (callback?: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken, clearToken] = useStorage('token');
  const [authenticated, setAuthenticated] = useState(Boolean(token));
  const location = useLocation();

  useEffect(() => {
    checkAuthorization();
  }, [location]);

  const checkAuthorization = useCallback(async () => {
    try {
      const response = await api.get('/me');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setAuthenticated(false);
        }
      }
    }
  }, []);

  const login = async (user: User, callback: VoidFunction, failback: (error: any) => void) => {
    try {
      const response = await apiAuth(user.email, user.password);
      const { token } = response.data;

      setToken(token);
      setAuthenticated(Boolean(token));
      callback();
    } catch (err) {
      failback(err);
    }
  };

  const logout = (callback?: VoidFunction) => {
    clearToken();
    setAuthenticated(false);

    if (callback) {
      callback();
    }
  };

  return <AuthContext.Provider
    value={{
      authenticated,
      login,
      logout
    }}
  >
    {children}
  </AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}