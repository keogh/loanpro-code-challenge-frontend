import * as React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

type UpdateParams = Record<string, string>;

function useUpdateQueryString() {
  const [searchParams, ] = useSearchParams();
  const navigate = useNavigate();

  return React.useCallback((params: UpdateParams) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.keys(params).forEach((key) => {
      if (!params[key] || params[key].length === 0) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, params[key]);
      }
    })

    navigate({
      pathname: window.location.pathname,
      search: `?${newSearchParams.toString()}`,
    });
  }, [navigate, searchParams]);
}

export default useUpdateQueryString;
