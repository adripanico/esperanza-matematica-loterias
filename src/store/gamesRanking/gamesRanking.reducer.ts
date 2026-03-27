import { createReducer } from '@reduxjs/toolkit';
import type { IGameRanking } from '../../models/gameRanking';
import { loadGamesRanking } from './gamesRanking.actions';

export type ILoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export interface IGamesRankingState {
  lastLoadTime?: string;
  loadError?: string;
  loadingStatus: ILoadingStatus;
  ranking: IGameRanking[];
}

const gamesRankingInitialState: IGamesRankingState = {
  loadingStatus: 'idle',
  ranking: [],
};

export const gamesRankingReducer = createReducer(
  gamesRankingInitialState,
  (builder) => {
    builder.addCase(loadGamesRanking.pending, (state) => {
      state.loadingStatus = 'loading';
    });

    builder.addCase(loadGamesRanking.rejected, (state, action) => {
      state.loadingStatus = 'error';
      state.ranking = [];
      state.loadError = action.error.message;
      state.lastLoadTime = new Date().toLocaleString('es-ES');
    });

    builder.addCase(loadGamesRanking.fulfilled, (state, action) => {
      state.loadingStatus = 'success';
      state.ranking = action.payload;
      state.loadError = undefined;
      state.lastLoadTime = new Date().toLocaleString('es-ES');
    });
  },
);
