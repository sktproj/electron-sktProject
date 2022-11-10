import { useContext } from 'react';
import StudentPageContext from 'context/StudentPageContext';
import Button from 'components/button/Button';
import styles from './BorrowButton.module.css';
import MODAL_LIST from 'constant/MODAL';

function BorrowButton() {
  const { setCurrentModal } = useContext(StudentPageContext);

  return (
    <div className={styles.borrowButton}>
      <Button
        width="100%"
        height="90%"
        fontSize="38px"
        color="#4e73df"
        onClickEvent={() => {
          setCurrentModal(MODAL_LIST.BORROW_MODAL);
        }}
      >
        물품 빌리기
      </Button>
    </div>
  );
}

export default BorrowButton;
