import { Routes, Route, Link} from 'react-router-dom'
import ResourcePage from './pages/ResourcesPage'
import ChecklistPage from './pages/ChecklistPage'
import TeamPage from './pages/TeamPage'
import './App.css'

function App() {
  return (
    <div>
      <h1> Meridian Onboarding </h1>
      <nav>
        <Link to="/team"> Team </Link>
        <Link to="/checklist"> Checklisk </Link>
        <Link to="/resources"> Resources </Link>
      </nav>
      <Routes>
        <Route path="/team" element={<TeamPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/resources" element={<ResourcePage />} />
      </Routes>
    </div>
  )
}

export default App