import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MenuList from "./pages/MenuList";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import AdminPanel from "./pages/AdminPanel";
import ItemDetails from "./pages/ItemDetails";

// ✅ NOVO
import FavoritesPage from "./pages/FavoritesPage";
import EurToRsdPage from "./pages/EurToRsdPage";

function Nav() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: 10 }}>Jelovnik</Link>

      {!user ? (
        <>
          <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          {/* ✅ NOVO */}
          <Link to="/favorites" style={{ marginRight: 10 }}>Omiljena</Link>
          <Link to="/kurs" style={{ marginRight: 10 }}>EUR→RSD</Link>

          {isAdmin && (
            <Link to="/admin" style={{ marginRight: 10 }}>Admin</Link>
          )}

          <span style={{ marginRight: 10 }}>
            Ulogovan: <b>{user.name}</b> ({user.role})
          </span>

          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MenuList />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/item/:id"
            element={
              <ProtectedRoute>
                <ItemDetails />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="/kurs"
            element={
              <ProtectedRoute>
                <EurToRsdPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dodaj"
            element={
              <AdminRoute>
                <AddItem />
              </AdminRoute>
            }
          />

          <Route
            path="/izmeni/:id"
            element={
              <AdminRoute>
                <EditItem />
              </AdminRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
