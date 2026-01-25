import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminPanel() {
  const { user, logout } = useAuth();

  return (
    <div className="page page-center">
      <div className="container">
        <div className="card">
          <div className="center">
            <h1>Admin panel</h1>
            <p className="muted" style={{ marginTop: 6 }}>
              Ulogovan: <b>{user?.name}</b> ({user?.role})
            </p>
          </div>

          <div
            className="mt-16"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Link className="btn btn-primary" to="/dodaj">
              + Dodaj jelo
            </Link>

            <Link className="btn" to="/">
              Nazad na jelovnik
            </Link>

            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>

          <div className="mt-16">
            <div className="card" style={{ padding: 16 }}>
              <p className="muted" style={{ margin: 0 }}>
                Admin može da dodaje, menja i briše jela, kao i da upravlja sadržajem jelovnika.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
