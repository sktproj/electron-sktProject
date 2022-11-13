import { useState } from 'react';
import CustomModal from 'components/customModal/CustomModal';
import CloseButton from './modalHeader/ModalHeader';
import ProductSelecter from './productSelecter/ProductSelecter';
import ConfirmButton from './confirmButton/ConfirmButton';
import styles from './BorrowModal.module.css';

const customStyles = {
  content: {
    width: '850px',
    height: '700px',
  },
};

function BorrowModal() {
  const [selectedList, setSelectedList] = useState([]);

  return (
    <CustomModal style={customStyles}>
      <div className={styles.borrowModal}>
        <CloseButton />
        <ProductSelecter
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
        <ConfirmButton selectedList={selectedList} />
      </div>
    </CustomModal>
  );
}

export default BorrowModal;
