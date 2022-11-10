import ReactModal from 'react-modal';

import styles from './Modal.module.css';

ReactModal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFFFFF',
    boxShadow: 'rgba(149, 157, 165, 0.4) 0px 0px 18px',
  },
};

function Modal(props) {
  return (
    <ReactModal
      isOpen={true}
      style={{ content: { ...customStyles.content, ...props.style.content } }}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button
            className={styles.modalCloseButton}
            onClick={props.closeModal}
          >
            X
          </button>
        </div>
        <div className={styles.modalArticle}>{props.children}</div>
      </div>
    </ReactModal>
  );
}

export default Modal;
