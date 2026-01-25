import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function MenuList() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const loadItems = async () => {
    const res = await api.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    if (!isAdmin) return;

    if (!window.confirm("Da li si siguran da želiš da obrišeš jelo?")) return;
    await api.delete(`/items/${id}`);
    loadItems();
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1>Jelovnik</h1>
              <p className="muted" style={{ marginTop: 6 }}>
                Klikni na jelo da vidiš detalje.
              </p>
            </div>

            {isAdmin && (
              <Link className="btn btn-primary" to="/dodaj">
                + Dodaj jelo
              </Link>
            )}
          </div>

          {items.length === 0 ? (
            <div className="card mt-16" style={{ padding: 16 }}>
              <p className="muted">Nema stavki u jelovniku.</p>
            </div>
          ) : (
            <ul className="list mt-16">
              {items.map((x) => (
                <li key={x.id} className="list-item">
                  <div style={{ display: "grid", gap: 4 }}>
                    <Link to={`/item/${x.id}`}>
                      <b>{x.name}</b>
                    </Link>
                    <span className="muted">
                      Cena: <b>{x.price} RSD</b>
                    </span>
                  </div>

                  {isAdmin && (
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(x.id)}
                      >
                        Obriši
                      </button>

                      <Link className="btn" to={`/izmeni/${x.id}`}>
                        Izmeni
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
