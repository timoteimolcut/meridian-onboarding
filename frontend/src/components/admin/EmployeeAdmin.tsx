import { useEffect, useState } from "react";
import { createEmployee, getEmployees, deleteEmployee } from "../../api/employees";
import type { Employee } from "../../api/types";

const departmentColors: Record<string, string> = {
  Engineering: "bg-indigo-900 text-indigo-300",
  HR: "bg-green-900 text-green-300",
  Sales: "bg-amber-900 text-amber-300",
  Marketing: "bg-pink-900 text-pink-300",
  Finance: "bg-blue-900 text-blue-300",
};

const departmentRoles: Record<string, string[]> = {
  Engineering: ["Software Engineer", "Frontend Engineer", "Backend Engineer", "DevOps Engineer", "ML Engineer"],
  HR: ["HR Manager", "HR Specialist", "Recruiter"],
  Sales: ["Sales Representative", "Sales Lead", "Account Manager"],
  Marketing: ["Marketing Manager", "Content Creator", "Growth Analyst"],
  Finance: ["Finance Analyst", "Accountant", "Financial Controller"],
};

function EmployeeAdmin() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [slackHandle, setSlackHandle] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getEmployees().then((data) => setEmployees(data));
  }, []);

  async function handleCreate() {
    const newEmployee = await createEmployee({ name, department, role, slack_handle: slackHandle, email });
    setEmployees((prev) => [...prev, newEmployee]);
    setName(""); setDepartment(""); setRole(""); setSlackHandle(""); setEmail("");
  }

  async function handleDelete(id: number) {
    await deleteEmployee(id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  }

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500";

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Employees</h3>
      <div className="flex flex-col gap-2 mb-6">
        {employees.map((e) => (
          <div key={e.id} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">{e.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${departmentColors[e.department] || "bg-gray-700 text-gray-300"}`}>
                {e.department}
              </span>
              <span className="text-gray-400 text-sm">{e.role}</span>
            </div>
            <button onClick={() => handleDelete(e.id)} className="text-red-400 hover:text-red-300 text-sm transition">
              Delete
            </button>
          </div>
        ))}
      </div>
      <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">Add New Employee</h4>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input className={inputClass} placeholder="Name" value={name} 
        onChange={(ev) => {
            const fullName = ev.target.value;
            setName(fullName);
            const parts = fullName.trim().toLowerCase().split(" ");
            const first = parts[0] || "";
            const last = parts[1] || "";
            setSlackHandle(first ? `@${first}.${last}` : "");
            setEmail(first && last ? `${first}.${last}@meridian.com` : "");
          }}
        />
        <select className={inputClass} value={department} onChange={(ev) => { setDepartment(ev.target.value); setRole(""); }}>
          <option value="" disabled>Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
        </select>
        <select className={inputClass} value={role} onChange={(ev) => setRole(ev.target.value)} disabled={!department}>
          <option value="" disabled>{department ? "Select Role" : "Select a department first"}</option>
          {department && departmentRoles[department]?.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <input className={inputClass} placeholder="Slack Handle" value={slackHandle} onChange={(ev) => setSlackHandle(ev.target.value)} />
        <input className={inputClass} placeholder="Email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
      </div>
      <button onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
        Add Employee
      </button>
    </div>
  );
}

export default EmployeeAdmin;