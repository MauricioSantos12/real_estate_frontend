import { useState, useCallback } from 'react';

const UseFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async ({ url, method = 'GET', body = null, headers = {} }) => {
      setLoading(true);
      setError(null);

      try {
        const options = {
          method,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `bearer ${localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ''}`,
            ...headers,
          },
          body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + url,
          options
        );
        if (!response.ok) {
          const errorResponse = await response.json();
          setError(`${errorResponse.message} (${response.status})`);
          return null;
        } else {
          const result = await response.json();
          setData(result);
          return result;
        }
      } catch (err) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, fetchData };
};

export default UseFetch;
