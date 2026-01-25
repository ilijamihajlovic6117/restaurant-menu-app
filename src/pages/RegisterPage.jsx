import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const n = name.trim();
    const em = email.trim();

    if (!n || !em || password.length < 4) {
      alert("Popuni sva polja (lozinka min 4).");
      return;
    }

    const exists = await api.get(`/users?email=${encodeURIComponent(em)}`);
    if (exists.data.length > 0) {
      alert("Email već postoji.");
      return;
    }

    await api.post("/users", {
      name: n,
      email: em,
      password,
      role: "user",
    });

    alert("Registracija uspešna! Uloguj se.");
    navigate("/login");
  };

  return (
    <div className="page page-center">
      <div className="container">
        <div className="card center">
          <h1>Registracija</h1>
          <p className="muted">Napravi nalog za omiljena jela i pregled detalja.</p>

          <form onSubmit={handleSubmit} className="form mt-16" style={{ marginInline: "auto" }}>
            <input
              className="input"
              placeholder="Ime"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="input"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="input"
              placeholder="Lozinka (min 4)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary" type="submit">
              Napravi nalog
            </button>
          </form>

          <p className="muted mt-16" style={{ marginBottom: 0 }}>
            Imaš nalog? <Link to="/login">Prijavi se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
