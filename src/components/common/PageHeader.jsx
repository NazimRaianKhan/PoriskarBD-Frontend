export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-textmain/70">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
