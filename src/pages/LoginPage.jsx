import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Popuni email i lozinku.");
      return;
    }

    const res = await api.get(
      `/users?email=${encodeURIComponent(email.trim())}&password=${encodeURIComponent(password)}`
    );

    if (res.data.length === 0) {
      alert("Pogrešan email ili lozinka.");
      return;
    }

    const u = res.data[0];
    login({ id: u.id, name: u.name, email: u.email, role: u.role });

    navigate("/home", { replace: true });
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Lozinka"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Prijavi se</button>
      </form>

      <p style={{ marginTop: 12 }}>
        Nemaš nalog? <Link to="/register">Registruj se</Link>
      </p>
    </div>
  );
}
