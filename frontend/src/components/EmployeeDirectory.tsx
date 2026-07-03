import { useEffect, useState } from "react";
import { getEmployees } from "../api/employees";
import type { Employee } from "../api/types";

const departmentColors: Record<string, string> = {
  Engineering: "bg-indigo-900 text-indigo-300",
  HR: "bg-green-900 text-green-300",
  Sales: "bg-amber-900 text-amber-300",
  Marketing: "bg-pink-900 text-pink-300",
  Finance: "bg-blue-900 text-blue-300",
};

function EmployeeDirectory() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getEmployees()
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const departments = ["All", "Engineering", "HR", "Sales", "Marketing", "Finance"];
  const filtered = filter === "All" ? employees : employees.filter((e) => e.department === filter);

  if (loading) return <p className="text-gray-400">Loading team...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Meet the Team</h2>
      <div className="flex gap-2 mb-6 flex-wrap">
        {departments.map((dep) => (
          <button
            key={dep}
            onClick={() => setFilter(dep)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === dep
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {dep}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((e) => (
          <div key={e.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">{e.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${departmentColors[e.department] || "bg-gray-800 text-gray-300"}`}>
                {e.department}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{e.role}</p>
            <div className="flex flex-col gap-1">
              {e.slack_handle && <p className="text-indigo-400 text-sm">💬 {e.slack_handle}</p>}
              {e.email && <p className="text-gray-400 text-sm">✉️ {e.email}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeDirectory;