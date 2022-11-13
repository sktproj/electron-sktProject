import { useContext } from 'react';
import AppContext from 'context/AppContext';
import CustomButton from 'components/customButton/CustomButton';
import styles from './BorrowButton.module.css';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';

function BorrowButton() {
  const { setCurrentModal } = useContext(AppContext);

  return (
    <div className={styles.borrowButton}>
      <CustomButton
        width="100%"
        height="90%"
        fontSize="38px"
        color="#4e73df"
        onClickEvent={() => {
          setCurrentModal(KIND_OF_MODAL.BORROW_MODAL);
        }}
      >
        물품 빌리기
      </CustomButton>
    </div>
  );
}

export default BorrowButton;
