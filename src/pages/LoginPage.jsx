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
      `/users?email=${encodeURIComponent(email.trim())}&password=${encodeURIComponent(
        password
      )}`
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
    <div className="page page-center">
      <div className="container">
        <div className="card center">
          <h1>Login</h1>
          <p className="muted">Prijavi se da bi koristio jelovnik i omiljena jela.</p>

          <form onSubmit={handleSubmit} className="form mt-16" style={{ marginInline: "auto" }}>
            <input
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="input"
              placeholder="Lozinka"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary" type="submit">
              Prijavi se
            </button>
          </form>

          <p className="muted mt-16" style={{ marginBottom: 0 }}>
            Nemaš nalog? <Link to="/register">Registruj se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
