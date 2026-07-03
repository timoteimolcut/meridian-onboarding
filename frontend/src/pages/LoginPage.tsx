import { useState } from "react";
import { login } from "../api/auth";

interface Props {
  onLogin: (token: string, role: string) => void;
}

function LoginPage({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    try {
      const data = await login(username, password);
      onLogin(data.access_token, data.role);
    } catch {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-400 mb-2">Meridian</h1>
        <p className="text-gray-400 mb-8">Welcome! Please log in to access your onboarding portal.</p>
        <input
          className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-indigo-500"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          onKeyDown={(ev) => { if (ev.key === "Enter") handleLogin(); }}
        />
        <div className="relative mb-4">
          <input
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            onKeyDown={(ev) => { if (ev.key === "Enter") handleLogin(); }}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-white text-sm transition"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default LoginPage;