import { useEffect, useState } from "react";

export default function EurToRsdPage() {
  const [rate, setRate] = useState(null);
  const [amount, setAmount] = useState("1");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRate = async () => {
      try {
        setError("");

        const res = await fetch(
          "https://api.exchangerate.host/latest?base=EUR&symbols=RSD"
        );
        const data = await res.json();

        console.log("API odgovor:", data);

        if (!data?.rates?.RSD) {
          throw new Error("Nema RSD kursa");
        }

        setRate(data.rates.RSD);
      } catch (e) {
        setError("Greška pri učitavanju kursa");
      }
    };

    loadRate();
  }, []);

  const eur = Number(amount || 0);
  const rsd = rate ? (eur * rate).toFixed(2) : "0.00";

  return (
    <div style={{ padding: 20 }}>
      <h1>Kalkulator: EUR → RSD</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Kurs (1 EUR): <b>{rate ?? "—"}</b> RSD
      </p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <div>
        {eur} EUR = <b>{rsd}</b> RSD
      </div>
    </div>
  );
}
