import { useState } from 'react';
import CustomModal from 'components/customModal/CustomModal';
import ProductNameInput from './productNameInput/ProductNameInput';
import AddButton from './addButton/AddButton';
import CancelButton from './cancelButton/CancelButton';
import styles from './AddProductModal.module.css';

const customStyles = {
  content: {
    width: '350px',
    height: '200px',
  },
};

function AddProductModal() {
  const [productName, setProductName] = useState('');

  return (
    <CustomModal style={customStyles}>
      <div className={styles.AddProductModal}>
        <ProductNameInput setProductName={setProductName} />
        <div className={styles.buttonContainer}>
          <AddButton productName={productName} />
          <CancelButton />
        </div>
      </div>
    </CustomModal>
  );
}

export default AddProductModal;
