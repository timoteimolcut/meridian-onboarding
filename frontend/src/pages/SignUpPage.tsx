import { useState } from "react";
import { signup } from "../api/auth";

interface Props {
  onSignUp: () => void;
  onBackToLogin: () => void;
}

const departmentRoles: Record<string, string[]> = {
  Engineering: ["Software Engineer", "Frontend Engineer", "Backend Engineer", "DevOps Engineer", "ML Engineer"],
  HR: ["HR Manager", "HR Specialist", "Recruiter"],
  Sales: ["Sales Representative", "Sales Lead", "Account Manager"],
  Marketing: ["Marketing Manager", "Content Creator", "Growth Analyst"],
  Finance: ["Finance Analyst", "Accountant", "Financial Controller"],
};

function SignUpPage({ onSignUp, onBackToLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [slackHandle, setSlackHandle] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSignUp() {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await signup({ username, password, name, department, role, slack_handle: slackHandle, email });
      onSignUp();
    } catch {
      setError("Signup failed. Username might already exist.");
    }
  }

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500";

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-400 mb-2">Meridian</h1>
        <p className="text-gray-400 mb-6">Create your onboarding account.</p>
        <div className="flex flex-col gap-3">
          <input className={inputClass} placeholder="Full Name" value={name} onChange={(ev) => setName(ev.target.value)} />
          <select
            className={inputClass}
            value={department}
            onChange={(ev) => { setDepartment(ev.target.value); setRole(""); }}
          >
            <option value="" disabled>Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
          <select
            className={inputClass}
            value={role}
            onChange={(ev) => setRole(ev.target.value)}
            disabled={!department}
          >
            <option value="" disabled>
              {department ? "Select Role" : "Select a department first"}
            </option>
            {department && departmentRoles[department]?.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <input className={inputClass} placeholder="Slack Handle (optional)" value={slackHandle} onChange={(ev) => setSlackHandle(ev.target.value)} />
          <input className={inputClass} placeholder="Email (optional)" value={email} onChange={(ev) => setEmail(ev.target.value)} />
          <hr className="border-gray-700" />
          <input className={inputClass} placeholder="Username" value={username} onChange={(ev) => setUsername(ev.target.value)} />
          <div className="relative">
            <input
              className={inputClass}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-white text-sm transition"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative">
            <input
              className={inputClass}
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
          </div>
        </div>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        <button onClick={handleSignUp} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition mt-4">
          Create Account
        </button>
        <button onClick={onBackToLogin} className="w-full text-gray-400 hover:text-white text-sm mt-3 transition">
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;