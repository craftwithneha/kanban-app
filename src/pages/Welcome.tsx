// src/pages/Welcome.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount, login } from "../auth";

export default function Welcome() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ✅ Remove ID.unique(); pass `form.name` as name
      await createAccount({
        email: form.email,
        password: form.password,
        name: form.name,
      });

      await login({ email: form.email, password: form.password });
      navigate("/kanban");
    } catch {
      alert("Signup/Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h1 className="text-2xl font-bold text-center">🚀 Welcome to Kanban</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="bg-blue-500 text-white py-2 w-full rounded">
            Sign Up & Go to Board
          </button>
        </form>
      </div>
    </div>
  );
}
