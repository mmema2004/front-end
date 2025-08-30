import { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  loadedToken: boolean | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loadedToken, setLoadedToken] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await localStorage.getItem("token");

      setToken(storedToken);
      setLoadedToken(true);
    };
    loadToken();
  }, []);

  const updateToken = async (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      await localStorage.setItem("token", newToken);
    } else {
      await localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken, loadedToken }}>
      {children}
    </AuthContext.Provider>
  );
};
