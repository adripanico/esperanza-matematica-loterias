import { useContext } from 'react';
import { QueryContext } from '../contexts/QueryContext';
import type { QueryContextValue } from './../contexts/QueryContext';

export function useQuery(): QueryContextValue {
  const context = useContext(QueryContext);

  if (!context) {
    throw Error('useQuery must be used within a QueryContextProvider');
  }

  return context;
}
