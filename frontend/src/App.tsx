import { useState } from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import ChecklistPage from './pages/ChecklistPage'
import TeamPage from './pages/TeamPage'
import ResourcesPage from './pages/ResourcesPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  
  function handleLogin(newToken: string, newRole: string) {
    setToken(newToken);
    setRole(newRole);
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
  }

  function handleLogout() {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-400">Meridian Onboarding</h1>
        <nav className="flex items-center gap-6">
          <NavLink 
            to="/checklist" 
            className={({ isActive }) => isActive ? "text-white font-semibold border-b-2 border-indigo-400 pb-0.5" : "text-gray-300 hover:text-white transition"}
          >
            Checklist
          </NavLink>
          <NavLink 
            to="/team" 
            className={({ isActive }) => isActive ? "text-white font-semibold border-b-2 border-indigo-400 pb-0.5" : "text-gray-300 hover:text-white transition"}
          >
            Team
          </NavLink>
          <NavLink 
            to="/resources" 
            className={({ isActive }) => isActive ? "text-white font-semibold border-b-2 border-indigo-400 pb-0.5" : "text-gray-300 hover:text-white transition"}
          >
            Resources
          </NavLink>
          {role === "admin" && (
            <NavLink 
              to="/admin" 
              className={({ isActive }) => isActive ? "text-white font-semibold border-b-2 border-indigo-400 pb-0.5" : "text-gray-300 hover:text-white transition"}
            >
              Admin
            </NavLink>
          )}
          <button onClick={handleLogout} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg text-sm transition">
            Logout
          </button>
        </nav>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/admin" element={role === "admin" ? <AdminPage /> : <Navigate to="/checklist" />} />
          <Route path="/" element={<ChecklistPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App