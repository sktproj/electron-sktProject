import styles from './ModalHeader.module.css';
import MODAL_LIST from 'constant/MODAL';

function ModalHeader({ setCurrentModal }) {
  return (
    <div className={styles.modalHeader}>
      <button
        className={styles.modalCloseButton}
        onClick={() => {
          setCurrentModal(MODAL_LIST.NONE);
        }}
      >
        X
      </button>
    </div>
  );
}

export default ModalHeader;
