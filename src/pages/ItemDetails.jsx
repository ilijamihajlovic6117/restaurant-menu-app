import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ItemDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [item, setItem] = useState(null);
  const [favoriteId, setFavoriteId] = useState(null);

  const loadData = async () => {
    const itemRes = await api.get(`/items/${id}`);
    setItem(itemRes.data);

    if (user) {
      const favRes = await api.get(
        `/favorites?userId=${user.id}&itemId=${Number(id)}`
      );
      setFavoriteId(favRes.data.length ? favRes.data[0].id : null);
    } else {
      setFavoriteId(null);
    }
  };

  useEffect(() => {
    loadData();
  }, [id, user]);

  const toggleFavorite = async () => {
    if (!user) return;

    if (favoriteId) {
      await api.delete(`/favorites/${favoriteId}`);
      setFavoriteId(null);
    } else {
      const res = await api.post("/favorites", {
        userId: user.id,
        itemId: Number(id),
      });
      setFavoriteId(res.data.id);
    }
  };

  if (!item) return <div className="page page-center">Učitavanje...</div>;

  return (
    <div className="page page-center">
      <div className="container">
        <div className="card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Link className="btn" to="/">
              ← Nazad
            </Link>

            <div className="badge">
              Cena: <b>{item.price} RSD</b>
            </div>
          </div>

          <div className="mt-16">
            <h1 style={{ marginBottom: 6 }}>{item.name}</h1>
            <p className="muted" style={{ marginTop: 0 }}>
              {item.description ? item.description : "Nema opisa."}
            </p>
          </div>

          <div className="mt-16" style={{ display: "grid", gap: 10 }}>
            <button
              className={`btn ${favoriteId ? "btn-danger" : "btn-primary"}`}
              onClick={toggleFavorite}
              disabled={!user}
            >
              {favoriteId ? "Ukloni iz omiljenih" : "Dodaj u omiljene"}
            </button>

            {!user && (
              <p className="muted" style={{ margin: 0 }}>
                Uloguj se da koristiš omiljene.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
