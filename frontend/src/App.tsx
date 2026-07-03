import { useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import ChecklistPage from './pages/ChecklistPage'
import TeamPage from './pages/TeamPage'
import ResourcesPage from './pages/ResourcesPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import './App.css'

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  function handleLogin(newToken: string, newRole: string) {
    setToken(newToken);
    setRole(newRole);
  }

  function handleLogout() {
    setToken(null);
    setRole(null);
  }

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div>
      <h1>Meridian Onboarding</h1>
      <nav>
        <Link to="/checklist">Checklist</Link>
        <Link to="/team">Team</Link>
        <Link to="/resources">Resources</Link>
        {role === "admin" && <Link to="/admin">Admin</Link>}
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <Routes>
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/admin" element={role === "admin" ? <AdminPage /> : <Navigate to="/checklist" />} />
        <Route path="/" element={<ChecklistPage />} />
      </Routes>
    </div>
  )
}

export default App