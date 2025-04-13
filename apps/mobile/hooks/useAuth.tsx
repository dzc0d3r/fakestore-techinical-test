import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { login, LoginCredentials, LoginResponse } from 'api';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import {jwtDecode} from "jwt-decode"
type AuthContextType = {
  isAdmin: boolean;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => Promise<void>;
};

const adminsID = [1, 10]
const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  token: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

const TOKEN_KEY = 'auth_token';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const loadToken = useCallback(async () => {
    try {
      let storedToken = null;
      
      if (Platform.OS === 'web') {
        storedToken = localStorage.getItem(TOKEN_KEY);
      } else {
        storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      }

      if (storedToken) {
        setToken(storedToken);
        router.replace('/');
      }
    } catch (error) {
      console.error('Failed to load token', error);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

// In your handleLogin function within AuthProvider
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials);
      const decodedToken: any = jwtDecode(response?.token);
      const isAdmin = adminsID.includes(decodedToken?.sub)
      setIsAdmin(isAdmin);
      console.log("isAdmin", isAdmin)
      
      if (!response.token) {
        // Throw error if no token received
        throw new Error(response.error || 'Authentication failed');
      }

      // Store token
      if (Platform.OS === 'web') {
        localStorage.setItem(TOKEN_KEY, response.token);
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, response.token);
      }

      setToken(response.token);
      return response;
    } catch (error) {
      console.error('Login failed', error);
      throw error; // Make sure to re-throw the error
    }
  };

  const handleLogout = async () => {
    try {
      setToken(null);
      
      if (Platform.OS === 'web') {
        localStorage.removeItem(TOKEN_KEY);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
      
      router.replace('/');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        token,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);