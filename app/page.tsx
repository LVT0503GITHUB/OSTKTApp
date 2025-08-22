"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const login = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8083/login", {
        username,
        password,
      });
      setToken(res.data.access_token);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      setUser({ username, role: res.data.role });
    } catch {
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
    if (savedToken) {
      setToken(savedToken);
      setUser({ username: "saved", role: savedRole });
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
          <h1 className="text-2xl">Welcome, {user.role}</h1>
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
