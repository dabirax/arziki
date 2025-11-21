import {  useState, useEffect, ReactNode } from "react";
import {AuthContext} from "./useAuth";
import type { User } from "./useAuth";




export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage (mock persistence)
    const storedUser = localStorage.getItem("arziki_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - accept any credentials for demo
    if (!email || !password) {
      return { success: false, error: "Email and password are required" };
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser: User = {
      id: "user_" + Date.now(),
      email,
      name: email.split("@")[0],
    };

    setUser(mockUser);
    localStorage.setItem("arziki_user", JSON.stringify(mockUser));
    return { success: true };
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - accept any credentials for demo
    if (!name || !email || !password) {
      return { success: false, error: "All fields are required" };
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser: User = {
      id: "user_" + Date.now(),
      email,
      name,
    };

    setUser(mockUser);
    localStorage.setItem("arziki_user", JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("arziki_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
