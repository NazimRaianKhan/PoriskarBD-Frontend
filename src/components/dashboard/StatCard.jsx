export default function StatCard({ title, value, hint }) {
  return (
    <div className="card">
      <p className="text-sm text-textmain/60">{title}</p>
      <h3 className="mt-2 text-3xl font-bold">{value ?? 0}</h3>
      {hint && <p className="mt-2 text-sm text-textmain/55">{hint}</p>}
    </div>
  );
}
