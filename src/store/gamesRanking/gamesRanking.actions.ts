import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IGameRanking } from '../../models/gameRanking';
import { FETCH_URL, games, LIVE_FETCH_URL } from '../../utils/constants';
import { fetchSource } from '../../utils/http';
import {
  calculateExpectation,
  compareGamesByExpectation,
  normalizeText,
  parseGame,
  parseLiveEntries,
} from './gamesRanking.utils';

export const loadGamesRanking = createAsyncThunk<IGameRanking[], void>(
  'LOAD_GAMES_RANKING',
  async () => {
    try {
      const [resultsText, liveGamesText] = await Promise.all([
        fetchSource(FETCH_URL, 'resultados'),
        fetchSource(LIVE_FETCH_URL, 'ahora en juego'),
      ]);

      const normalized = normalizeText(resultsText);
      const liveEntries = parseLiveEntries(normalizeText(liveGamesText));

      const digestedRanking = games
        .map((game) => parseGame(normalized, liveEntries, game))
        .filter(Boolean)
        .map((parsedGame) => calculateExpectation(parsedGame!)) // filter(Boolean) ensures parsedGame exists at this point. We can use ! operator safely.
        .sort(compareGamesByExpectation);

      if (!digestedRanking.length) {
        throw Error('No he podido extraer sorteos válidos.');
      }

      return digestedRanking;
    } catch (error) {
      throw Error(
        (error as { message: string })?.message || 'Error desconocido',
      );
    }
  },
);
