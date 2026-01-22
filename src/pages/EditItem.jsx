import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    api.get(`/items/${id}`).then((res) => {
      setName(res.data.name || "");
      setPrice(res.data.price ?? "");
      setCategoryId(res.data.categoryId ?? "");
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !categoryId) {
      alert("Popuni sva polja.");
      return;
    }

    await api.put(`/items/${id}`, {
      id: Number(id),
      name: name.trim(),
      price: Number(price),
      categoryId: Number(categoryId),
    });

    navigate("/");
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Izmeni jelo</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
        <input
          placeholder="Naziv jela"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Cena (RSD)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Kategorija ID"
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />

        <button type="submit">Sačuvaj izmene</button>
      </form>
    </div>
  );
}
