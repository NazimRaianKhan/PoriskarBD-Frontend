export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="card flex min-h-48 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-secondary/30 border-t-primary" />
        <p className="text-sm text-textmain/70">{label}</p>
      </div>
    </div>
  );
}
