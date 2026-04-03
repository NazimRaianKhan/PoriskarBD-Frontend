import { useEffect, useState } from 'react';

export function useApi(apiFunction, args = [], immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const run = async (...runtimeArgs) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...(runtimeArgs.length ? runtimeArgs : args));
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) run(...args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, run, setData };
}
