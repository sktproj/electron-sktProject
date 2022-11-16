import { useEffect, useState } from 'react';
import CustomModal from 'components/customModal/CustomModal';
import SubmitButton from './submitButton/SubmitButton';
import CancelButton from './cancelButton/CancelButton';
import styles from './AdminAuthModal.module.css';

const customStyles = {
  content: {
    width: '400px',
    height: '170px',
  },
};

function AdminAuthModal() {
  const [password, setPassword] = useState('');
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    setIsFailed(false);
  }, [password]);

  return (
    <CustomModal style={customStyles}>
      <div className={styles.adminAuthModal}>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className={`${styles.passwordInput} ${
            isFailed ? styles.failed : null
          }`}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <div className={styles.buttonContainer}>
          <SubmitButton password={password} setIsFailed={setIsFailed} />
          <CancelButton />
        </div>
      </div>
    </CustomModal>
  );
}

export default AdminAuthModal;
