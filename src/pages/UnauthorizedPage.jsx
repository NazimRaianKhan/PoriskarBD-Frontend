import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-10 md:px-6">
      <div className="card mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p className="mt-3 text-textmain/70">You do not have permission to view this page.</p>
        <Link to="/" className="btn-primary mt-6 inline-block">Go Home</Link>
      </div>
    </div>
  );
}