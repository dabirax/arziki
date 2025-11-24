import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if user and token are stored in localStorage
    const storedUser = localStorage.getItem("arziki_user");
    const storedToken = localStorage.getItem("arziki_token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (username: string, password: string) => {
    if (!username || !password) {
      return { success: false, error: "Username and password are required" };
    }

    try {
      const response = await api.auth.login({ username, password });
      
      const user: User = {
        id: response.user_id || "user_" + Date.now(),
        email: response.email || "",
        name: response.name || username,
        username,
      };

      const accessToken = response.access_token;

      setUser(user);
      setToken(accessToken);
      localStorage.setItem("arziki_user", JSON.stringify(user));
      localStorage.setItem("arziki_token", accessToken);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const signup = async (name: string, email: string, username: string, password: string) => {
    if (!name || !email || !username || !password) {
      return { success: false, error: "All fields are required" };
    }

    try {
      const response = await api.auth.register({
        email,
        password,
        username,
        role: "user",
      });

      const user: User = {
        id: response.user_id || "user_" + Date.now(),
        email,
        name,
        username,
      };

      const accessToken = response.access_token;

      setUser(user);
      setToken(accessToken);
      localStorage.setItem("arziki_user", JSON.stringify(user));
      localStorage.setItem("arziki_token", accessToken);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Signup failed" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("arziki_user");
    localStorage.removeItem("arziki_token");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
