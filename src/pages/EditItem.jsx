import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../services/api";

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    api.get(`/items/${id}`).then((res) => {
      setName(res.data.name || "");
      setPrice(res.data.price ?? "");
      setCategoryId(res.data.categoryId ?? "");
      setDescription(res.data.description || "");
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !categoryId || !description.trim()) {
      alert("Popuni sva polja.");
      return;
    }

    await api.put(`/items/${id}`, {
      id: Number(id),
      name: name.trim(),
      price: Number(price),
      categoryId: Number(categoryId),
      description: description.trim(),
    });

    navigate("/");
  };

  return (
    <div className="page page-center">
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
              <h1>Izmeni jelo</h1>
              <p className="muted" style={{ marginTop: 6 }}>
                Promeni podatke i sačuvaj izmene.
              </p>
            </div>

            <Link className="btn" to="/">
              ← Nazad
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="form mt-16">
            <input
              className="input"
              placeholder="Naziv jela"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="input"
              placeholder="Cena (RSD)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              className="input"
              placeholder="Kategorija ID"
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />

            <textarea
              className="textarea"
              placeholder="Kratak opis jela"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />

            <button className="btn btn-primary" type="submit">
              Sačuvaj izmene
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
