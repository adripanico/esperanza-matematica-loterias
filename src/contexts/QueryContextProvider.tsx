import { useState, type FC, type PropsWithChildren } from 'react';
import type { IGameRanking } from '../models/gameRanking';
import { FETCH_URL, games, LIVE_FETCH_URL } from '../utils/constants';
import { fetchSource } from '../utils/http';
import {
  calculateExpectation,
  compareGamesByExpectation,
  normalizeText,
  parseGame,
  parseLiveEntries,
} from '../utils/parse';
import { QueryContext, type LoadingStatus } from './QueryContext';

export const QueryContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('idle');
  const [lastLoadTime, setLastLoadTime] = useState<string>();
  const [loadError, setLoadError] = useState<string>();
  const [ranking, setRanking] = useState<IGameRanking[]>([]);

  /**
   * Carga las dos fuentes oficiales, calcula el ranking y refresca la tabla y el detalle.
   */
  const loadData = async () => {
    setLoadingStatus('loading');
    setLastLoadTime(undefined);
    setLoadError(undefined);

    try {
      const [resultsText, liveGamesText] = await Promise.all([
        fetchSource(FETCH_URL, 'resultados'),
        fetchSource(LIVE_FETCH_URL, 'ahora en juego'),
      ]);

      const normalized = normalizeText(resultsText);
      const liveEntries = parseLiveEntries(normalizeText(liveGamesText));

      console.log(normalized, liveEntries);
      const digestedRanking = games
        .map((game) => parseGame(normalized, liveEntries, game))
        .filter(Boolean)
        .map((parsedGame) => calculateExpectation(parsedGame!)) // filter(Boolean) ensures parsedGame exists at this point. We can use ! operator safely.
        .sort(compareGamesByExpectation);

      setRanking(digestedRanking);

      if (!digestedRanking.length) {
        throw Error('No he podido extraer sorteos válidos.');
      }

      setLoadingStatus('success');
      setLastLoadTime(new Date().toLocaleString('es-ES'));
    } catch (error) {
      setLoadingStatus('error');
      setLoadError((error as { message: string })?.message);
    }
  };

  return (
    <QueryContext.Provider
      value={{ lastLoadTime, loadingStatus, loadData, loadError, ranking }}
    >
      {children}
    </QueryContext.Provider>
  );
};
