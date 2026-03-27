import { useState } from 'react';
import { useQuery } from '../../hooks/useQuery';
import { useTheme } from '../../hooks/useTheme';

import { HowModal } from '../HowModal/HowModal';
import styles from './Header.module.css';

export const Header = () => {
  const [showHowModal, setShowHowModal] = useState(false);

  const { currentTheme, toggleTheme } = useTheme();

  const { loadingStatus, loadData } = useQuery();

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.title}>
          <h1>Esperanza matemática de loterías</h1>
          <div className={styles.actions}>
            <button className="secondary" onClick={toggleTheme}>
              Modo {currentTheme === 'dark' ? 'claro' : 'oscuro'}
            </button>
            <button className="secondary" onClick={() => setShowHowModal(true)}>
              Cómo se calcula
            </button>
          </div>
        </div>
        <p>
          Obtiene los resultados publicados por la Sociedad Estatal de Loterías
          y Apuestas del Estado (SELAE) y ordena los sorteos por esperanza
          matemática estimada según la apuesta mínima.
        </p>
        <button disabled={loadingStatus === 'loading'} onClick={loadData}>
          {loadingStatus === 'loading' ? 'Cargando...' : 'Recargar'}
        </button>
      </header>

      {showHowModal && <HowModal close={() => setShowHowModal(false)} />}
    </>
  );
};
