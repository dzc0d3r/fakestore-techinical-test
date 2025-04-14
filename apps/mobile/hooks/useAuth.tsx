import { login, LoginCredentials, LoginResponse } from "api";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

type AuthContextType = {
  isAdmin: boolean;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  checkRole: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  token: null,
  isLoading: true,
  login: async () => ({} as LoginResponse),
  logout: async () => {},
  checkRole: async () => {},
});

const TOKEN_KEY = "auth_token";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);

  // Unified token storage management
  const storeToken = useCallback(async (token: string) => {
    if (Platform.OS === "web") {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
  }, []);

  const removeToken = useCallback(async () => {
    if (Platform.OS === "web") {
      localStorage.removeItem(TOKEN_KEY);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
  }, []);

  const checkRole = useCallback(async (token: string) => {
    try {
      setRoleChecked(false);
      const response = await fetch(`${API_URL}/api/role`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("[DEBUG] Role check status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Role check failed:", errorData);
        throw new Error("Role check failed");
      }

      const { role } = await response.json();
      console.log("[DEBUG] Received role:", role);
      setIsAdmin(role === "admin");
    } catch (error) {
      console.error("Role check failed:", error);
      setIsAdmin(false);
    } finally {
      setRoleChecked(true);
    }
  }, [API_URL]); // Added API_URL as dependency

  const loadToken = useCallback(async () => {
    try {
      let storedToken = null;
      if (Platform.OS === "web") {
        storedToken = localStorage.getItem(TOKEN_KEY);
      } else {
        storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      }

      if (storedToken) {
        setToken(storedToken);
        // Wait for role check before redirecting
        await checkRole(storedToken);
        //router.replace("/");
      }
    } catch (error) {
      console.error("Failed to load token", error);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, [checkRole]);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials);
      
      if (!response.token) {
        throw new Error(response.error || "Authentication failed");
      }

      await storeToken(response.token);
      setToken(response.token);
      // Ensure role check completes before proceeding
      await checkRole(response.token);
      return response;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      setToken(null);
      setIsAdmin(false);
      await removeToken();
      //router.replace("/");
    } catch (error) {
      console.error("Failed to logout", error);
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
        checkRole: checkRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);