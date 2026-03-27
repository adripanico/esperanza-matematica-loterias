import { useEffect } from 'react';
import { Header } from './components/Header/Header';
import { RankingTable } from './components/RankingTable/RankingTable';
import { loadGamesRanking } from './store/gamesRanking/gamesRanking.actions';
import { useAppDispatch } from './store/store';

// const details = document.getElementById('details');

// const gameTabs = document.querySelectorAll('[data-game-tab]');
// const betPanels = document.querySelectorAll('[data-bet-panel]');
// const betSummaryGame = document.getElementById('bet-summary-game');
// const betSummaryNumbers = document.getElementById('bet-summary-numbers');
// const betSummaryStars = document.getElementById('bet-summary-stars');
// const betSummaryStarsRow = document.getElementById('bet-summary-stars-row');
// const betSummaryReintegro = document.getElementById('bet-summary-reintegro');
// const betSummaryReintegroRow = document.getElementById(
//   'bet-summary-reintegro-row',
// );
// const betSummaryExtra = document.getElementById('bet-summary-extra');
// const betSummaryExtraRow = document.getElementById('bet-summary-extra-row');
// const betSummaryDraw = document.getElementById('bet-summary-draw');
// const betSummaryTotal = document.getElementById('bet-summary-total');
// const betFeedback = document.getElementById('bet-feedback');
// const betClear = document.getElementById('bet-clear');

// const betState = {
//   activeGame: 'primitiva',
//   primitiva: {
//     draw: 'proximo',
//     numbers: [],
//     reintegro: null,
//     joker: false,
//   },
//   euromillones: {
//     draw: 'proximo',
//     numbers: [],
//     stars: [],
//   },
// };

// betClear.addEventListener('click', clearActiveBet);

// gameTabs.forEach((tab) => {
//   tab.addEventListener('click', () => setActiveBetGame(tab.dataset.gameTab));
// });

// setupBettingUI();
// renderBetSummary();

//

//   return (
//     lines.find((line) =>
//       category.aliases.some((alias) => line.includes(alias)),
//     ) || null
//   );
// }

// /**
//  * Renderiza el bloque de detalle de cada sorteo con sus categorías en formato tarjeta.
//  */
// function renderDetails(ranking) {
//   details.innerHTML = ranking
//     .map(
//       (game) => `
//     <article class="detail-card">
//       <h2>${game.name}</h2>
//       <p class="detail-meta">${buildDetailMeta(game)}</p>
//       <div class="detail-grid">
//         ${game.rows
//           .map(
//             (row) => `
//           <article class="detail-item">
//             <h3>${row.label}</h3>
//             <p><strong>Premio usado:</strong> ${formatMoneyValue(row.prize, 'N/D')}</p>
//             <p><strong>Probabilidad:</strong> 1 entre ${formatNumber(row.odds)}</p>
//             <p><strong>Valor esperado:</strong> ${formatMoneyValue(row.expected, 'N/D')}</p>
//             <p class="detail-item-source">${describePrizeSource(row.source)}</p>
//           </article>
//         `,
//           )
//           .join('')}
//       </div>
//     </article>
//   `,
//     )
//     .join('');
// }

// /**
//  * Traduce claves internas de procedencia del premio a textos legibles para el usuario.
//  */
// function describePrizeSource(source) {
//   const labels = {
//     'ultimo-resultado': 'último resultado publicado',
//     'bote-vigente': 'sorteo en juego',
//     'bote-acumulado': 'último bote acumulado sin acertantes',
//     'premio-fijo': 'importe fijo',
//     'premio-resuelto': 'no reutilizado: ya adjudicado',
//     'vigente-no-publicado':
//       'La Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) no publica el premio máximo vigente y el último ya resuelto no se reutiliza',
//     'sin-bote-vigente': 'sin bote vigente publicado',
//     'sin-dato': 'sin dato oficial suficiente',
//   };

//   return labels[source] || 'dato disponible';
// }

// /**
//  * Construye la línea de metadatos de cada sorteo con el contexto de cálculo usado.
//  */
// function buildDetailMeta(game) {
//   const meta = [`Próximo sorteo: ${game.drawDate || '-'}`];

//   if (game.resultDate) {
//     meta.push(`Último resultado consultado: ${game.resultDate}`);
//   }

//   if (game.fixedRows.length > 0) {
//     meta.push(`Máxima categoría usada: ${formatMoney(game.topPrize)}`);
//     return meta.join(' | ');
//   }

//   if (game.advertisedJackpot) {
//     meta.push(
//       `Premio máximo vigente usado: ${formatMoney(game.advertisedJackpot)}`,
//     );
//   } else {
//     meta.push(
//       'Premio máximo vigente: no publicado por la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) para el sorteo en juego',
//     );
//   }

//   if (game.expectationStatus !== 'exacta') {
//     meta.push(
//       'Esperanza matemática exacta: no disponible hasta que la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) publique la categoría máxima vigente',
//     );
//   }

//   return meta.join(' | ');
// }

// /**
//  * Formatea probabilidades y contadores con separador de miles.
//  */
// function formatNumber(value) {
//   return new Intl.NumberFormat('es-ES').format(Math.round(value || 0));
// }

// /**
//  * Inicializa toda la interfaz de apuestas y conecta sus eventos principales.
//  */
// function setupBettingUI() {
//   buildBallGrid('primitiva-grid', 49, 'primitiva-number', {
//     startAt: 1,
//     groupSize: 10,
//   });
//   buildBallGrid('primitiva-reintegro-grid', 10, 'primitiva-reintegro', {
//     startAt: 0,
//     compact: true,
//   });
//   buildBallGrid('euromillones-grid', 50, 'euromillones-number', {
//     startAt: 1,
//     groupSize: 10,
//   });
//   buildBallGrid('euromillones-stars-grid', 12, 'euromillones-star', {
//     startAt: 1,
//     groupSize: 6,
//     isStar: true,
//   });

//   document.getElementById('primitiva-random').addEventListener('click', () => {
//     betState.primitiva.numbers = pickRandomUnique(6, 1, 49).sort(
//       (a, b) => a - b,
//     );
//     refreshBetButtons();
//     renderBetSummary();
//   });

//   document
//     .getElementById('primitiva-reintegro-random')
//     .addEventListener('click', () => {
//       betState.primitiva.reintegro = randomBetween(0, 9);
//       refreshBetButtons();
//       renderBetSummary();
//     });

//   document
//     .getElementById('euromillones-random')
//     .addEventListener('click', () => {
//       betState.euromillones.numbers = pickRandomUnique(5, 1, 50).sort(
//         (a, b) => a - b,
//       );
//       refreshBetButtons();
//       renderBetSummary();
//     });

//   document
//     .getElementById('euromillones-stars-random')
//     .addEventListener('click', () => {
//       betState.euromillones.stars = pickRandomUnique(2, 1, 12).sort(
//         (a, b) => a - b,
//       );
//       refreshBetButtons();
//       renderBetSummary();
//     });

//   document
//     .getElementById('primitiva-joker')
//     .addEventListener('change', (event) => {
//       betState.primitiva.joker = event.target.checked;
//       renderBetSummary();
//     });

//   document.querySelectorAll('[data-primitiva-draw]').forEach((button) => {
//     button.addEventListener('click', () => {
//       document
//         .querySelectorAll('[data-primitiva-draw]')
//         .forEach((item) => item.classList.remove('active'));
//       button.classList.add('active');
//       betState.primitiva.draw = button.dataset.primitivaDraw;
//       renderBetSummary();
//     });
//   });

//   document.querySelectorAll('[data-euromillones-draw]').forEach((button) => {
//     button.addEventListener('click', () => {
//       document
//         .querySelectorAll('[data-euromillones-draw]')
//         .forEach((item) => item.classList.remove('active'));
//       button.classList.add('active');
//       betState.euromillones.draw = button.dataset.euromillonesDraw;
//       renderBetSummary();
//     });
//   });
// }

// /**
//  * Genera dinámicamente la rejilla de bolas de un panel de apuestas.
//  */
// function buildBallGrid(containerId, count, type, options = {}) {
//   const startAt = options.startAt ?? 1;
//   const groupSize = options.groupSize ?? count;
//   const isStar = options.isStar ?? false;
//   const compact = options.compact ?? false;
//   const container = document.getElementById(containerId);
//   const groups = [];

//   if (compact) {
//     const items = [];

//     for (let value = startAt; value < startAt + count; value += 1) {
//       items.push(createBallMarkup(type, value, isStar));
//     }

//     container.innerHTML = items.join('');
//   } else {
//     for (let value = startAt; value < startAt + count; value += groupSize) {
//       const values = [];
//       const maxValue = Math.min(value + groupSize - 1, startAt + count - 1);

//       for (let current = value; current <= maxValue; current += 1) {
//         values.push(createBallMarkup(type, current, isStar));
//       }

//       groups.push(`
//         <div class="ball-row">
//           <div class="ball-row-label">${String(value).padStart(2, '0')}-${String(maxValue).padStart(2, '0')}</div>
//           <div class="ball-row-items" style="--row-count:${groupSize}">${values.join('')}</div>
//         </div>
//       `);
//     }

//     container.innerHTML = groups.join('');
//   }

//   container.querySelectorAll('[data-ball-type]').forEach((button) => {
//     button.addEventListener('click', () => {
//       toggleBall(type, Number(button.dataset.ballValue));
//     });
//   });
// }

// /**
//  * Devuelve el HTML de una bola o estrella seleccionable.
//  */
// function createBallMarkup(type, value, isStar) {
//   return `
//     <button
//       type="button"
//       class="ball${isStar ? ' star-ball' : ''}"
//       data-ball-type="${type}"
//       data-ball-value="${value}"
//     >
//       ${
//         isStar
//           ? `
//         <svg class="star-shape" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
//           <polygon points="50,1 61,35 98,35 68,57 79,95 50,73 21,95 32,57 2,35 39,35"></polygon>
//         </svg>
//       `
//           : ''
//       }
//       <span class="ball-text">${String(value).padStart(2, '0')}</span>
//     </button>
//   `;
// }

// /**
//  * Aplica una pulsación de usuario sobre una bola y actualiza el estado del juego correspondiente.
//  */
// function toggleBall(type, value) {
//   if (type === 'primitiva-number') {
//     toggleSelection(betState.primitiva.numbers, value, 6);
//   }

//   if (type === 'primitiva-reintegro') {
//     betState.primitiva.reintegro =
//       betState.primitiva.reintegro === value ? null : value;
//   }

//   if (type === 'euromillones-number') {
//     toggleSelection(betState.euromillones.numbers, value, 5);
//   }

//   if (type === 'euromillones-star') {
//     toggleSelection(betState.euromillones.stars, value, 2);
//   }

//   refreshBetButtons();
//   renderBetSummary();
// }

// /**
//  * Añade o quita un valor de una selección limitada y la mantiene ordenada.
//  */
// function toggleSelection(list, value, maxItems) {
//   const index = list.indexOf(value);

//   if (index >= 0) {
//     list.splice(index, 1);
//     return;
//   }

//   if (list.length >= maxItems) {
//     return;
//   }

//   list.push(value);
//   list.sort((a, b) => a - b);
// }

// /**
//  * Sincroniza el estado visual de todas las bolas activas con el estado interno de apuesta.
//  */
// function refreshBetButtons() {
//   document.querySelectorAll('[data-ball-type]').forEach((button) => {
//     const type = button.dataset.ballType;
//     const value = Number(button.dataset.ballValue);
//     let active = false;

//     if (type === 'primitiva-number') {
//       active = betState.primitiva.numbers.includes(value);
//     }

//     if (type === 'primitiva-reintegro') {
//       active = betState.primitiva.reintegro === value;
//     }

//     if (type === 'euromillones-number') {
//       active = betState.euromillones.numbers.includes(value);
//     }

//     if (type === 'euromillones-star') {
//       active = betState.euromillones.stars.includes(value);
//     }

//     button.classList.toggle('active', active);
//   });
// }

// /**
//  * Cambia de juego activo en el apartado de apuestas y refresca el resumen lateral.
//  */
// function setActiveBetGame(gameId) {
//   betState.activeGame = gameId;
//   gameTabs.forEach((tab) =>
//     tab.classList.toggle('active', tab.dataset.gameTab === gameId),
//   );
//   betPanels.forEach((panel) =>
//     panel.classList.toggle('active', panel.dataset.betPanel === gameId),
//   );
//   renderBetSummary();
// }

// /**
//  * Renderiza el resumen de la apuesta activa con importes, extras y selección actual.
//  */
// function renderBetSummary() {
//   const gameId = betState.activeGame;

//   if (gameId === 'primitiva') {
//     const total = 1 + (betState.primitiva.joker ? 1 : 0);
//     betSummaryGame.textContent = 'La Primitiva';
//     betSummaryNumbers.textContent = formatBallList(betState.primitiva.numbers);
//     betSummaryStarsRow.classList.add('hidden-row');
//     betSummaryReintegroRow.classList.remove('hidden-row');
//     betSummaryExtraRow.classList.remove('hidden-row');
//     betSummaryReintegro.textContent =
//       betState.primitiva.reintegro === null
//         ? '-'
//         : String(betState.primitiva.reintegro);
//     betSummaryExtra.textContent = betState.primitiva.joker
//       ? 'Con Joker'
//       : 'Sin Joker';
//     betSummaryDraw.textContent =
//       betState.primitiva.draw === 'semanal' ? 'Semanal' : 'Próximo sorteo';
//     betSummaryTotal.textContent = formatMoney(total);
//   }

//   if (gameId === 'euromillones') {
//     const total = betState.euromillones.draw === 'semana' ? 5 : 2.5;
//     betSummaryGame.textContent = 'Euromillones';
//     betSummaryNumbers.textContent = formatBallList(
//       betState.euromillones.numbers,
//     );
//     betSummaryStarsRow.classList.remove('hidden-row');
//     betSummaryReintegroRow.classList.add('hidden-row');
//     betSummaryExtraRow.classList.add('hidden-row');
//     betSummaryStars.textContent = formatBallList(betState.euromillones.stars);
//     betSummaryDraw.textContent =
//       betState.euromillones.draw === 'semana'
//         ? 'Dos sorteos de la semana'
//         : 'Próximo sorteo';
//     betSummaryTotal.textContent = formatMoney(total);
//   }

//   betFeedback.textContent = '';
// }

// /**
//  * Resetea por completo la apuesta activa y devuelve sus controles al estado inicial.
//  */
// function clearActiveBet() {
//   if (betState.activeGame === 'primitiva') {
//     betState.primitiva = {
//       draw: 'proximo',
//       numbers: [],
//       reintegro: null,
//       joker: false,
//     };

//     document.querySelectorAll('[data-primitiva-draw]').forEach((button) => {
//       button.classList.toggle(
//         'active',
//         button.dataset.primitivaDraw === 'proximo',
//       );
//     });
//     document.getElementById('primitiva-joker').checked = false;
//   }

//   if (betState.activeGame === 'euromillones') {
//     betState.euromillones = {
//       draw: 'proximo',
//       numbers: [],
//       stars: [],
//     };

//     document.querySelectorAll('[data-euromillones-draw]').forEach((button) => {
//       button.classList.toggle(
//         'active',
//         button.dataset.euromillonesDraw === 'proximo',
//       );
//     });
//   }

//   refreshBetButtons();
//   renderBetSummary();
//   betFeedback.textContent = 'Apuesta limpiada.';
// }

// /**
//  * Convierte una lista de números en el formato corto mostrado en el resumen.
//  */
// function formatBallList(values) {
//   if (!values.length) {
//     return '-';
//   }

//   return values.map((value) => String(value).padStart(2, '0')).join(' · ');
// }

// /**
//  * Genera una lista de números aleatorios no repetidos dentro de un rango.
//  */
// function pickRandomUnique(count, min, max) {
//   const values = new Set();

//   while (values.size < count) {
//     values.add(randomBetween(min, max));
//   }

//   return [...values];
// }

// /**
//  * Devuelve un entero aleatorio dentro de un rango inclusivo.
//  */
// function randomBetween(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadGamesRanking());
  }, [dispatch]);

  return (
    <>
      <main>
        <Header />
        <RankingTable />

        <section className="panel betting-panel">
          <div className="betting-head">
            <div>
              <h2>Preparar apuesta</h2>
              <p className="betting-copy">
                Apartado visual para montar apuestas de La Primitiva y
                Euromillones inspirado en la estructura del portal oficial.
              </p>
            </div>
          </div>

          <div
            className="bet-tabs"
            role="tablist"
            aria-label="Selector de juego"
          >
            <button
              id="tab-primitiva"
              className="bet-tab active"
              type="button"
              data-game-tab="primitiva"
            >
              La Primitiva
            </button>
            <button
              id="tab-euromillones"
              className="bet-tab"
              type="button"
              data-game-tab="euromillones"
            >
              Euromillones
            </button>
          </div>

          <div className="bet-layout">
            <div className="bet-main">
              <section className="bet-card active" data-bet-panel="primitiva">
                <div className="bet-card-head">
                  <h3>La Primitiva</h3>
                  <span className="bet-price">1,00 € por apuesta</span>
                </div>
                <div className="choice-block">
                  <p className="choice-title">Sorteo</p>
                  <div className="pill-group">
                    <button
                      className="pill active"
                      type="button"
                      data-primitiva-draw="proximo"
                    >
                      Próximo sorteo
                    </button>
                    <button
                      className="pill"
                      type="button"
                      data-primitiva-draw="semanal"
                    >
                      Semanal
                    </button>
                  </div>
                </div>
                <div className="choice-block">
                  <div className="choice-row">
                    <p className="choice-title">Selecciona 6 números</p>
                    <button
                      className="link-action"
                      id="primitiva-random"
                      type="button"
                    >
                      Combinación automática
                    </button>
                  </div>
                  <div id="primitiva-grid" className="number-grid"></div>
                </div>
                <div className="choice-block">
                  <div className="choice-row">
                    <p className="choice-title">Reintegro</p>
                    <button
                      className="link-action"
                      id="primitiva-reintegro-random"
                      type="button"
                    >
                      Aleatorio
                    </button>
                  </div>
                  <div
                    id="primitiva-reintegro-grid"
                    className="tiny-grid"
                  ></div>
                </div>
                <div className="choice-block toggle-line">
                  <label className="switch-row">
                    <input id="primitiva-joker" type="checkbox" />
                    <span>Jugar también a El Joker (+1,00 €)</span>
                  </label>
                </div>
              </section>

              <section className="bet-card" data-bet-panel="euromillones">
                <div className="bet-card-head">
                  <h3>Euromillones</h3>
                  <span className="bet-price">2,50 € por apuesta</span>
                </div>
                <div className="choice-block">
                  <p className="choice-title">Sorteo</p>
                  <div className="pill-group">
                    <button
                      className="pill active"
                      type="button"
                      data-euromillones-draw="proximo"
                    >
                      Próximo sorteo
                    </button>
                    <button
                      className="pill"
                      type="button"
                      data-euromillones-draw="semana"
                    >
                      Dos sorteos de la semana
                    </button>
                  </div>
                </div>
                <div className="choice-block">
                  <div className="choice-row">
                    <p className="choice-title">Selecciona 5 números</p>
                    <button
                      className="link-action"
                      id="euromillones-random"
                      type="button"
                    >
                      Combinación automática
                    </button>
                  </div>
                  <div id="euromillones-grid" className="number-grid"></div>
                </div>
                <div className="choice-block">
                  <div className="choice-row">
                    <p className="choice-title">Selecciona 2 estrellas</p>
                    <button
                      className="link-action"
                      id="euromillones-stars-random"
                      type="button"
                    >
                      Aleatorias
                    </button>
                  </div>
                  <div id="euromillones-stars-grid" className="star-grid"></div>
                </div>
              </section>
            </div>

            <aside className="bet-sidebar">
              <div className="summary-card">
                <h3>Resumen de la apuesta</h3>
                <p className="summary-game" id="bet-summary-game">
                  La Primitiva
                </p>
                <dl className="summary-list">
                  <div>
                    <dt>Números</dt>
                    <dd id="bet-summary-numbers">-</dd>
                  </div>
                  <div id="bet-summary-stars-row" className="hidden-row">
                    <dt>Estrellas</dt>
                    <dd id="bet-summary-stars">-</dd>
                  </div>
                  <div id="bet-summary-reintegro-row">
                    <dt>Reintegro</dt>
                    <dd id="bet-summary-reintegro">-</dd>
                  </div>
                  <div id="bet-summary-extra-row">
                    <dt>Extra</dt>
                    <dd id="bet-summary-extra">Sin Joker</dd>
                  </div>
                  <div>
                    <dt>Sorteo</dt>
                    <dd id="bet-summary-draw">Próximo sorteo</dd>
                  </div>
                  <div>
                    <dt>Total</dt>
                    <dd id="bet-summary-total">0,00 €</dd>
                  </div>
                </dl>
                <div className="summary-actions">
                  <button id="bet-clear" className="secondary" type="button">
                    Limpiar
                  </button>
                </div>
                <p id="bet-feedback" className="bet-feedback"></p>
              </div>
            </aside>
          </div>
        </section>

        <section id="details" className="details"></section>

        <footer className="site-footer">
          <p>
            <span className="footer-version">v0.4</span>
            <span className="footer-separator" aria-hidden="true">
              ·
            </span>
            <a
              href="https://github.com/rafasanz"
              target="_blank"
              rel="noreferrer"
            >
              @rafasanz
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}

export default App;
