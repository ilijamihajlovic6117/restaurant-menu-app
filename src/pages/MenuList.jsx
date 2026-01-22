import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export default function MenuList() {
  const [items, setItems] = useState([]);

  const loadItems = () => {
    api.get("/items").then((res) => setItems(res.data));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Da li si siguran da želiš da obrišeš jelo?")) return;

    await api.delete(`/items/${id}`);
    loadItems();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Jelovnik</h1>

      <Link to="/dodaj">+ Dodaj jelo</Link>

      {items.length === 0 ? (
        <p>Nema stavki u jelovniku.</p>
      ) : (
        <ul>
          {items.map((x) => (
            <li key={x.id}>
              <b>{x.name}</b> — {x.price} RSD  
              <button
                onClick={() => handleDelete(x.id)}
                style={{ marginLeft: 10 }}
              >
                Obriši
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
