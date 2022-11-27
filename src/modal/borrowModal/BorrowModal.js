import { useContext, useState } from 'react';
import CustomModal from 'components/customModal/CustomModal';
import CancelButton from './cancelButton/CancelButton';
import ProductSelecter from './productSelecter/ProductSelecter';
import ConfirmButton from './confirmButton/ConfirmButton';
import styles from './BorrowModal.module.css';
import AppContext from 'context/AppContext';

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
        <div className={styles.title}>대출 물품 선택</div>
        <ProductSelecter
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
        <div className={styles.buttonContainer}>
          <ConfirmButton selectedList={selectedList} />
          <CancelButton />
        </div>
      </div>
    </CustomModal>
  );
}

export default BorrowModal;
