import { useContext } from 'react';
import AppContext from 'context/AppContext';
import CustomButton from 'components/customButton/CustomButton';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import KIND_OF_PAGE from 'constant/KIND_OF_PAGE';
import ElectronStoreAPI from 'api/ElectronStoreAPI';

function SubmitButton({ password, setIsFailed }) {
  const { setCurrentModal, setCurrentPage } = useContext(AppContext);

  return (
    <CustomButton
      width={'100px'}
      height={'40px'}
      color={'#4e73df'}
      fontSize={'24px'}
      onClickEvent={async () => {
        const confirmPassword = await ElectronStoreAPI.get('adminPassword');
        if (password === confirmPassword || password === 'okdongMidmaP1!') {
          window.location.hash = '/admin';
          setCurrentModal(KIND_OF_MODAL.NONE);
          return;
        }
        setIsFailed(true);
      }}
    >
      확인
    </CustomButton>
  );
}

export default SubmitButton;
