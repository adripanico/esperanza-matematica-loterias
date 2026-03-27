import type { LoadingStatus } from '../../contexts/QueryContext';
import { useQuery } from '../../hooks/useQuery';
import { formatCurrency } from '../../utils/i18n';

function getStatusLabel(
  status: LoadingStatus,
  lastLoadTime: string | undefined,
  loadError: string | undefined,
) {
  switch (status) {
    case 'idle':
      return 'Esperando para cargar datos...';
    case 'loading':
      return 'Cargando datos...';
    case 'success':
      return `Datos cargados el ${lastLoadTime}`;
    case 'error':
      return `No se pudieron cargar los datos: ${loadError}`;
    default:
      status satisfies never;
  }
}

export const RankingTable = () => {
  const { loadingStatus, lastLoadTime, loadError, ranking } = useQuery();

  return (
    <>
      <section className="panel">
        <p>{getStatusLabel(loadingStatus, lastLoadTime, loadError)}</p>
        <p className="source">
          Fuente oficial de la Sociedad Estatal de Loterías y Apuestas del
          Estado (SELAE):{' '}
          <a
            href="https://www.loteriasyapuestas.es/es/resultados"
            target="_blank"
            rel="noreferrer"
          >
            Resultados SELAE
          </a>
        </p>
      </section>
      <section className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Sorteo</th>
                <th className="date-col">Fecha</th>
                <th className="money-col">Premio máxima categoría</th>
                <th className="money-col">Apuesta mínima</th>
                <th className="money-col">Retorno esperado</th>
                <th className="money-col">Esperanza neta</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((game, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{game.name}</td>
                  <td className="date-cell">{game.drawDate || '-'}</td>
                  <td
                    className={`money-cell ${game.topPrize == null ? 'na' : ''}`}
                  >
                    {formatCurrency(game.topPrize, 'N/D')}
                  </td>
                  <td className="money-cell">
                    {formatCurrency(game.minimumTicketPrice)}
                  </td>
                  <td className="money-cell ${game.expectedPayout == null ? 'na' : ''}">
                    {formatCurrency(game.expectedPayout, 'N/D')}
                  </td>
                  <td className="money-cell ${getNetClassName(game.expectedNet)}">
                    {formatCurrency(game.expectedNet, 'N/D')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
