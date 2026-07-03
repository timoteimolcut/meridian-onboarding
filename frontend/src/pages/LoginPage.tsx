import { useState } from "react";
import { login } from "../api/auth";

interface Props {
  onLogin: (token: string, role: string) => void;
}

function LoginPage({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      const data = await login(username, password);
      onLogin(data.access_token, data.role);
    } catch {
      setError("Invalid username or password");
    }
  }

  return (
    <div>
      <h2>Welcome to Meridian</h2>
      <p>Please log in to access your onboarding portal.</p>
      <input
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default LoginPage;