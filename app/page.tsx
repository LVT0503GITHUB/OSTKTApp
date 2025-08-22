"use client";
import { useState, useEffect } from "react";
import axios from "axios";

type User = {
  username: string;
  role: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const login = async () => {
    try {
      // const res = await axios.post("http://127.0.0.1:8083/login", {
      //   username,
      //   password,
      // });

      const res = {
      data: {
        access_token: "mocked_token_123",
        role: "admin",
      },
    };
      const accessToken = res.data.access_token;
      const role = res.data.role;

      setToken(accessToken);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username); // Lưu cả username nếu muốn dùng sau

      setUser({ username, role });
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedUsername = localStorage.getItem("username") || "User";

    if (savedToken && savedRole) {
      setToken(savedToken);
      setUser({ username: savedUsername, role: savedRole });
    }
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl mb-4">Login</h1>
        <input
          className="border p-2 m-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 m-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={login}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <ul>
          <li>Dashboard</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">Welcome, {user.username} ({user.role})</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
        <p>This is the dashboard for role: {user.role}</p>
      </main>
    </div>
  );
}
