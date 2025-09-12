import React from "react";

function useDebounceValue(value, delay = 300) {
  const [v, setV] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

function highlight(text, q) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export default function SearchUsers() {
  const [users, setUsers] = React.useState([]);
  const [q, setQ] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const r = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!r.ok) throw new Error("Network error");
        const data = await r.json();
        if (alive) setUsers(data);
      } catch (e) {
        if (alive) setError(e.message || "Fetch failed");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const dq = useDebounceValue(q, 300);

  const list = React.useMemo(() => {
    if (!dq) return users;
    return users.filter((u) => u.name.toLowerCase().includes(dq.toLowerCase()));
  }, [users, dq]);

  if (loading) return <p>Loading...</p>;
  // eslint-disable-next-line no-restricted-globals
  if (error) return <button onClick={() => location.reload()}>Retry</button>;

  return (
    <section>
      <label htmlFor="q">Search Users</label>
      <input
        id="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="type a name..."
      />
      <ul>
        {list.map((u) => (
          <li key={u.id}>{highlight(u.name, dq)}</li>
        ))}
      </ul>
      {list.length === 0 && <p>No result</p>}
    </section>
  );
}
