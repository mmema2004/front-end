import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { axiosInstance } from "../util/axios";

type User = {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone_number?: number;
  image?: string;
  password: string;
};

function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const { token, setToken, loadedToken } = useContext(AuthContext)!;
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (!loadedToken) return;

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.get("/user", {
        headers: { token: token },
      });
      setUser(res.data);
    } catch (error: any) {
      if (
        (error.response?.status === 401 ||
          error.response?.data === "Invalid Token") &&
        token
      ) {
        setToken(null);   // logout once
        return;           // stop execution to avoid loops
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (!loadedToken) return;  
    if (!token) {               
      setUser(null);
      setLoading(false);
      return;
    }

    fetchUser();

  }, [token, loadedToken]);

  return { user, loading, setUser, fetchUser, logout };
}

export default useUser;
