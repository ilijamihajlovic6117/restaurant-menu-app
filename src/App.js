
import "./App.css";

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

import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import EurToRsdPage from "./pages/EurToRsdPage";

function Nav() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="nav">
      <div className="nav-inner">
        <div className="nav-left">
          <Link to="/home" className="btn">
            Home
          </Link>

          {user && (
            <>
              <Link to="/" className="btn">
                Jelovnik
              </Link>
              <Link to="/favorites" className="btn">
                Omiljena
              </Link>
              <Link to="/kurs" className="btn">
                Kurs EUR→RSD
              </Link>
            </>
          )}
        </div>

        <div className="nav-right">
          {!user ? (
            <>
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          ) : (
            <>
              {isAdmin && (
                <Link to="/admin" className="btn">
                  Admin
                </Link>
              )}

              <span className="badge">
                Ulogovan: <b>{user.name}</b> ({user.role})
              </span>

              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />

        <Routes>
         
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

         
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MenuList />
              </ProtectedRoute>
            }
          />

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

        
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
