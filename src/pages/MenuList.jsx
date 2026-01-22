import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function MenuList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/items").then((res) => setItems(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Jelovnik</h1>

      {items.length === 0 ? (
        <p>Nema stavki u jelovniku.</p>
      ) : (
        <ul>
          {items.map((x) => (
            <li key={x.id}>
              <b>{x.name}</b> — {x.price} RSD
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
