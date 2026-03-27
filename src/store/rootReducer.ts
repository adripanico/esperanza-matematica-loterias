import { combineReducers } from '@reduxjs/toolkit';
import { gamesRankingReducer } from './gamesRanking/gamesRanking.reducer';

const rootReducer = combineReducers({
  gamesRanking: gamesRankingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
