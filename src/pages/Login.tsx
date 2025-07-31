// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../auth";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(credentials);
      navigate("/kanban");
    } catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("An unknown error occurred");
  }
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
