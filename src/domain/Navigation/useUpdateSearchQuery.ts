import * as React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function useUpdateSearchQuery() {
  const [searchParams, ] = useSearchParams();
  const navigate = useNavigate();

  const updateSearchQuery = React.useCallback((inputValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('search', inputValue);

    navigate({
      pathname: window.location.pathname,
      search: `?${newSearchParams.toString()}`,
    });
  }, [navigate, searchParams]);

  return updateSearchQuery;
}

export default useUpdateSearchQuery;
