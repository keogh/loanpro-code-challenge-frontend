import * as React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

type UpdateParams = Record<string, string | number>;

function useUpdateQueryString() {
  const [searchParams, ] = useSearchParams();
  const navigate = useNavigate();

  return React.useCallback((params: UpdateParams, returnNewUrl = false) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.keys(params).forEach((key) => {
      if (!params[key] || params[key] === '') {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, params[key]?.toString());
      }
    })

    if (returnNewUrl) {
      return `${window.location.pathname}?${newSearchParams.toString()}`;
    }

    navigate({
      pathname: window.location.pathname,
      search: `?${newSearchParams.toString()}`,
    });
  }, [navigate, searchParams]);
}

export default useUpdateQueryString;
