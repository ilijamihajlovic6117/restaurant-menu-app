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

  if (!item) return <p style={{ padding: 20 }}>Učitavanje...</p>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">← Nazad</Link>

      <h1>{item.name}</h1>
      <p><b>Cena:</b> {item.price} RSD</p>

      <p>
        <b>Opis:</b> {item.description ? item.description : "Nema opisa."}
      </p>

      <button onClick={toggleFavorite} disabled={!user}>
        {favoriteId ? "Ukloni iz omiljenih" : "Dodaj u omiljene"}
      </button>

      {!user && <p>Uloguj se da koristiš omiljene.</p>}
    </div>
  );
}
