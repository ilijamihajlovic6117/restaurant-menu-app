import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h1>Restaurant Menu App</h1>
      <p>
        Aplikacija za pregled jelovnika, detalje jela, omiljena jela i administraciju (CRUD).
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
        <Link to="/" style={{ padding: "8px 12px", border: "1px solid #ddd" }}>
          Pogledaj jelovnik
        </Link>

        <Link to="/favorites" style={{ padding: "8px 12px", border: "1px solid #ddd" }}>
          Omiljena jela
        </Link>

        <Link to="/kurs" style={{ padding: "8px 12px", border: "1px solid #ddd" }}>
          Kurs EUR → RSD
        </Link>
      </div>

      <div style={{ marginTop: 20, padding: 12, border: "1px solid #eee" }}>
        {user ? (
          <p>
            Ulogovan si kao <b>{user.name}</b> ({user.role}).
          </p>
        ) : (
          <p>
            Nisi ulogovan. <Link to="/login">Prijavi se</Link> ili{" "}
            <Link to="/register">registruj</Link>.
          </p>
        )}
      </div>
    </div>
  );
}
