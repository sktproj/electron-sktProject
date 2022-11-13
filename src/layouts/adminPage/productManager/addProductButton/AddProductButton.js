import { useContext } from 'react';
import styles from './AddProductButton.module.css';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import AppContext from 'context/AppContext';

function AddProductButton() {
  const { setCurrentModal } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <button
        className={styles.addProductButton}
        onClick={() => {
          setCurrentModal(KIND_OF_MODAL.ADD_PRODUCT_MODAL);
        }}
      >
        +
      </button>
    </div>
  );
}

export default AddProductButton;
