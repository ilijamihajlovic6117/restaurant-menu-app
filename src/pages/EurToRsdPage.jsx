import { useEffect, useState } from "react";

export default function EurToRsdPage() {
  const [rate, setRate] = useState(null);
  const [amount, setAmount] = useState("1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRate = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await fetch(
        "https://api.frankfurter.dev/v1/latest?base=EUR&symbols=RSD"
      );
      const data = await res.json();
      setRate(data?.rates?.RSD ?? null);

      setLoading(false);
    } catch (e) {
      setError("Ne mogu da učitam kurs.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRate();
  }, []);

  const eur = Number(amount || 0);
  const rsd = rate ? (eur * rate).toFixed(2) : "0.00";

  return (
    <div style={{ padding: 20 }}>
      <h1>Kalkulator: EUR → RSD</h1>

      {loading ? (
        <p>Učitavanje kursa...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>
            Kurs (1 EUR): <b>{rate}</b> RSD
          </p>

          <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Unesi iznos u EUR"
            />
            <div>
              {eur} EUR = <b>{rsd}</b> RSD
            </div>

            <button onClick={loadRate}>Osveži kurs</button>
          </div>
        </>
      )}
    </div>
  );
}
