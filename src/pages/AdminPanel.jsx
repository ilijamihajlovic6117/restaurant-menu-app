import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminPanel() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin panel</h1>
      <p>Ulogovan: <b>{user?.name}</b> ({user?.role})</p>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <Link to="/dodaj">Dodaj jelo</Link>
        <Link to="/">Nazad na jelovnik</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
