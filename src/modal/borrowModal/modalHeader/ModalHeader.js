import { useContext } from 'react';
import AppContext from 'context/AppContext';
import styles from './ModalHeader.module.css';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';

function ModalHeader() {
  const { setCurrentModal } = useContext(AppContext);

  return (
    <div className={styles.header}>
      <span className={styles.title}>빌릴 물품 선택</span>
      <button
        className={styles.closeButton}
        onClick={() => {
          setCurrentModal(KIND_OF_MODAL.NONE);
        }}
      >
        X
      </button>
    </div>
  );
}

export default ModalHeader;
