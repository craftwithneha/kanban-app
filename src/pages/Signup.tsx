// src/pages/Signup.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../auth";

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createAccount(user);
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
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
        </p>
      </form>
    </div>
  );
}
