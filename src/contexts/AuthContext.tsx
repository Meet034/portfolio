
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API functions (in real app, these would call your backend)
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (email === "user1@example.com" && password === "password") {
    return {
      id: "1",
      name: "Portfolio Owner",
      email: "user1@example.com",
      role: "owner"
    };
  } else if (email === "user2@example.com" && password === "password") {
    return {
      id: "2",
      name: "Friend's Portfolio",
      email: "user2@example.com",
      role: "friend"
    };
  }
  
  throw new Error("Invalid email or password");
};

const mockSignup = async (email: string, password: string, name: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would create a new user in your database
  return {
    id: Math.random().toString(36).substring(7),
    name: name,
    email: email,
    role: "user"
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check for stored user in localStorage on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const loggedInUser = await mockLogin(email, password);
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };
  
  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await mockSignup(email, password, name);
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  
  const clearError = () => {
    setError(null);
  };
  
  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    error,
    clearError
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
