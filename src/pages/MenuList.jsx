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
    <div style={{ padding: 20 }}>
      <h1>Jelovnik</h1>

      {isAdmin && (
        <div style={{ marginBottom: 12 }}>
          <Link to="/dodaj">+ Dodaj jelo</Link>
        </div>
      )}

      {items.length === 0 ? (
        <p>Nema stavki u jelovniku.</p>
      ) : (
        <ul>
          {items.map((x) => (
            <li key={x.id} style={{ marginBottom: 6 }}>
              <b>{x.name}</b> — {x.price} RSD

              {isAdmin && (
                <>
                  <button
                    onClick={() => handleDelete(x.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Obriši
                  </button>

                  <Link to={`/izmeni/${x.id}`} style={{ marginLeft: 10 }}>
                    Izmeni
                  </Link>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
