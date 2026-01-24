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

  if (loading) return <div style={{ padding: 20 }}>Učitavanje...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Omiljena jela</h1>
      <Link to="/">← Nazad na jelovnik</Link>

      {favItems.length === 0 ? (
        <p style={{ marginTop: 12 }}>Nema omiljenih jela.</p>
      ) : (
        <ul style={{ marginTop: 12 }}>
          {favItems.map((x) => (
            <li key={x.id} style={{ marginBottom: 8 }}>
              <Link to={`/item/${x.id}`}>
                <b>{x.name}</b>
              </Link>{" "}
              — {x.price} RSD
              <button
                onClick={() => removeFavorite(x.favoriteId)}
                style={{ marginLeft: 10 }}
              >
                Ukloni
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
