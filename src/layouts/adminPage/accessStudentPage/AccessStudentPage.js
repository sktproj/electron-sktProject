import CustomButton from 'components/customButton/CustomButton';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import AppContext from 'context/AppContext';
import { useContext } from 'react';
import styles from './AccessStudentPage.module.css';

function AccessStudentPage() {
  const { setCurrentModal } = useContext(AppContext);

  return (
    <div className={styles.accessStudentPage}>
      <CustomButton
        width="100%"
        height="100%"
        color="#4e73df"
        fontSize="32px"
        onClickEvent={() => {
          setCurrentModal(KIND_OF_MODAL.ACCESS_STUDENT_PAGE_MODAL);
        }}
      >
        학생 페이지 관리
      </CustomButton>
    </div>
  );
}

export default AccessStudentPage;
