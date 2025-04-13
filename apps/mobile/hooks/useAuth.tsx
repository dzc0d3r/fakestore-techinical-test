import { login, LoginCredentials, LoginResponse } from "api";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";

type AuthContextType = {
  isAdmin: boolean;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  token: null,
  isLoading: true,
  login: async () => {},
  logout: async () => void {},
});

const TOKEN_KEY = "auth_token";
const API_URL = process.env.EXPO_PUBLIC_API_URL; // Add to your .env

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // check role at server level (api endpoint in web app)
  const checkRole = useCallback(async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/role`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Role check failed");

      const { role } = await response.json();
      role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
    } catch (error) {
      console.error("Role check failed:", error);
      setIsAdmin(false);
    }
  }, []);

  // Existing loadToken without changes
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
        router.replace("/");
      }
    } catch (error) {
      console.error("Failed to load token", error);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadToken();
    console.log(isAdmin);
  }, [loadToken]);

  // Add this useEffect to handle role checks
  useEffect(() => {
    if (token) {
      checkRole(token);
    } else {
      setIsAdmin(false);
    }
  }, [token, checkRole]);

  // Modified handleLogin to remove client-side role check
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials);

      if (!response.token) {
        throw new Error(response.error || "Authentication failed");
      }

      // Store token (existing logic)
      if (Platform.OS === "web") {
        localStorage.setItem(TOKEN_KEY, response.token);
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, response.token);
      }

      setToken(response.token);
      return response;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  // Existing logout without changes
  const handleLogout = async () => {
    try {
      setToken(null);

      if (Platform.OS === "web") {
        localStorage.removeItem(TOKEN_KEY);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }

      router.replace("/");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
