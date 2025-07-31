import { useEffect, useState } from "react";
import { Lock, Bell, Search, Settings, LogOut, LogIn } from "lucide-react";
import { getCurrentUser, logoutUser } from "../auth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getCurrentUser();
      setUser(loggedInUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/"); // redirect to login/signup
  };

  return (
    <header className="flex items-center justify-between px-12 py-6 ring-1 ring-gray-200">
      <div className="text-4xl font-bold">Kanban</div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-4 relative">
        <input
          type="text"
          placeholder="Try searching tasks"
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 outline-none"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm cursor-pointer">
          <Lock className="w-4 h-4" />
          Share
        </button>

        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />

        {user ? (
          <>
            <span className="text-sm text-gray-700">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-red-600 hover:underline"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
