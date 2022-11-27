import CustomButton from 'components/customButton/CustomButton';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import AppContext from 'context/AppContext';
import { useContext } from 'react';
import styles from './ChangePassword.module.css';

function ChangePassword() {
  const { setCurrentModal } = useContext(AppContext);

  return (
    <div className={styles.changePassword}>
      <CustomButton
        width="100%"
        height="100%"
        color="#858796"
        fontSize="32px"
        onClickEvent={() => {
          setCurrentModal(KIND_OF_MODAL.CHANGE_ADMIN_PASSWORD);
        }}
      >
        비밀번호 변경
      </CustomButton>
    </div>
  );
}

export default ChangePassword;
