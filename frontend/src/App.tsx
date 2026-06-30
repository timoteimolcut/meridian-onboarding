import './App.css'
import EmployeeDirectory from './components/EmployeeDirectory'
import Checklist from './components/Checklist'

function App() {
  return (
    <div>
      <h1>Meridian Onboarding</h1>
      <Checklist />
      <EmployeeDirectory />
    </div>
  )
}

export default App