import { useEffect, useState } from "react";
import { getEmployees } from "../api/employees";
import type { Employee } from "../api/types";


function EmployeeDirectory() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployees()
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      <h2>Meet the Team</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <strong>{employee.name}</strong> — {employee.role} ({employee.department})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeDirectory;