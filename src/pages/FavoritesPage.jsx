import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favItems, setFavItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);

    const favRes = await api.get(`/favorites?userId=${user.id}`);
    const favs = favRes.data;

    if (favs.length === 0) {
      setFavItems([]);
      setLoading(false);
      return;
    }

    const items = await Promise.all(
      favs.map((f) => api.get(`/items/${f.itemId}`).then((r) => r.data))
    );

    const merged = items.map((it) => {
      const f = favs.find((x) => x.itemId === it.id);
      return { ...it, favoriteId: f.id };
    });

    setFavItems(merged);
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
    
  }, []);

  const removeFavorite = async (favoriteId) => {
    await api.delete(`/favorites/${favoriteId}`);
    loadFavorites();
  };

  if (loading) {
    return (
      <div className="page page-center">
        <div className="container">
          <div className="card center">
            <h1>Omiljena jela</h1>
            <p className="muted">Učitavanje...</p>
          </div>
        </div>
      </div>
    );
  }

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
              <h1>Omiljena jela</h1>
              <p className="muted" style={{ marginTop: 6 }}>
                {favItems.length
                  ? `Ukupno: ${favItems.length}`
                  : "Nemaš sačuvana omiljena jela."}
              </p>
            </div>

            <Link className="btn" to="/">
              ← Nazad na jelovnik
            </Link>
          </div>

          {favItems.length === 0 ? (
            <div className="card mt-16 center" style={{ padding: 16 }}>
              <p className="muted" style={{ margin: 0 }}>
                Nema omiljenih jela.
              </p>
            </div>
          ) : (
            <ul className="list mt-16">
              {favItems.map((x) => (
                <li key={x.id} className="list-item">
                  <div style={{ display: "grid", gap: 4 }}>
                    <Link to={`/item/${x.id}`}>
                      <b>{x.name}</b>
                    </Link>
                    <span className="muted">
                      Cena: <b>{x.price} RSD</b>
                    </span>
                  </div>

                  <button
                    className="btn btn-danger"
                    onClick={() => removeFavorite(x.favoriteId)}
                  >
                    Ukloni
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
