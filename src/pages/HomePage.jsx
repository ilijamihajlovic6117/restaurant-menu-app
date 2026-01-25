import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="page page-center">
      <div className="container">
        <div className="card center">
          <h1>Restaurant Menu App</h1>

          <p className="muted">
            Aplikacija za pregled jelovnika, detalje jela, omiljena jela i administraciju (CRUD).
          </p>

          <div className="actions-center">
            <Link to="/" className="btn">Pogledaj jelovnik</Link>
            <Link to="/favorites" className="btn">Omiljena jela</Link>
            <Link to="/kurs" className="btn">Kurs EUR → RSD</Link>
          </div>

          <div className="card mt-16" style={{ padding: 16 }}>
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
      </div>
    </div>
  );
}
