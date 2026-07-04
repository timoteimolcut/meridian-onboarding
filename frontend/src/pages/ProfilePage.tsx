import { useEffect, useState } from "react";
import { getMe } from "../api/auth";
import type { Employee } from "../api/types";

interface Props {
  token: string;
}

function ProfilePage({ token }: Props) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe(token)
      .then((data) => setEmployee(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="text-gray-400">Loading profile...</p>;
  if (!employee) return <p className="text-gray-400">No profile found. You may have been added manually by HR.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
            {employee.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{employee.name}</h3>
            <p className="text-indigo-400">{employee.role}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between border-b border-gray-800 pb-3">
            <span className="text-gray-400">Department</span>
            <span className="text-white">{employee.department}</span>
          </div>
          {employee.slack_handle && (
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-gray-400">Slack</span>
              <span className="text-indigo-400">{employee.slack_handle}</span>
            </div>
          )}
          {employee.email && (
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-gray-400">Email</span>
              <span className="text-white">{employee.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;