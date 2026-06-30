import './App.css'
import EmployeeDirectory from './components/EmployeeDirectory'
import Checklist from './components/Checklist'
import ResourceHub from './components/ResourceHub'

function App() {
  return (
    <div>
      <h1>Meridian Onboarding</h1>
      <Checklist />
      <ResourceHub />
      <EmployeeDirectory />
    </div>
  )
}

export default App