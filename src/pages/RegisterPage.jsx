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
    <div style={{ padding: 24 }}>
      <h1>Registracija</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
        <input
          placeholder="Ime"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Lozinka"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Napravi nalog</button>
      </form>

      <p style={{ marginTop: 12 }}>
        Imaš nalog? <Link to="/login">Prijavi se</Link>
      </p>
    </div>
  );
}
