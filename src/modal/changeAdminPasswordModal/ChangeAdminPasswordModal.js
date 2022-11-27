import ElectronStoreAPI from 'api/ElectronStoreAPI';
import CustomButton from 'components/customButton/CustomButton';
import CustomInput from 'components/customInput/CustomInput';
import CustomModal from 'components/customModal/CustomModal';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import AppContext from 'context/AppContext';
import { useContext, useState } from 'react';
import styles from './ChangeAdminPasswordModal.module.css';

const customStyles = {
  content: {
    width: '400px',
    height: '230px',
  },
};

function ChangeAdminPasswordModal() {
  const { setCurrentModal } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <CustomModal style={customStyles}>
      <div className={styles.inputContainer}>
        <CustomInput
          width="100%"
          height="45px"
          color="#4e73df"
          fontSize="22px"
          placeholder="새 비밀번호"
          onChangeEvent={e => {
            setPassword(e.target.value);
          }}
        />
        <CustomInput
          width="100%"
          height="45px"
          color={password === confirmPassword ? '#4e73df' : '#e74a3b'}
          fontSize="22px"
          placeholder="비밀번호 재확인"
          onChangeEvent={e => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      <div className={styles.actionButtonContainer}>
        <CustomButton
          disabled={password !== confirmPassword || !password}
          width="100px"
          height="40px"
          color={
            password !== confirmPassword || !password ? '#858796' : '#4e73df'
          }
          fontSize="24px"
          onClickEvent={async () => {
            await changePassword(password);
            window.location.hash = '/';
            setCurrentModal(KIND_OF_MODAL.NONE);
          }}
        >
          변경
        </CustomButton>
        <CustomButton
          width="100px"
          height="40px"
          color="#e74a3b"
          fontSize="24px"
          onClickEvent={() => {
            setCurrentModal(KIND_OF_MODAL.NONE);
          }}
        >
          취소
        </CustomButton>
      </div>
    </CustomModal>
  );
}

async function changePassword(password) {
  await ElectronStoreAPI.set('adminPassword', password);
}

export default ChangeAdminPasswordModal;
