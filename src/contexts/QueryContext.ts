import { createContext } from 'react';
import type { IGameRanking } from '../models/gameRanking';

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export interface QueryContextValue {
  loadData: () => void;
  lastLoadTime: string | undefined;
  loadError: string | undefined;
  loadingStatus: LoadingStatus;
  ranking: IGameRanking[];
}

export const QueryContext = createContext<QueryContextValue | undefined>(
  undefined,
);
