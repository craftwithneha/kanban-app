// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { account } from "./auth";

import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import KanbanBoard from "./components/KanbanBoard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkUser();
  }, []);

  if (isAuthenticated === null)
    return <div className="text-center p-8">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/kanban"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <div className="min-h-screen bg-white">
                <Header />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1">
                    <KanbanBoard />
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
