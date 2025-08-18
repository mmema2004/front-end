import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../util/axios";
type users = {
  id: number;
  name: string;
  email: string;
  password: string;
};

const Overview = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    googleLogout();
    navigate("/login");
  };

  const [users, setUsers] = useState<users[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      // const users = res.data.resultDat?.data ?? [];
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <p>Users not found</p>
        )}
      </div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Overview;
