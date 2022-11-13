import { useContext } from 'react';
import AppContext from 'context/AppContext';
import CustomButton from 'components/customButton/CustomButton';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';

function CancelButton() {
  const { setCurrentModal } = useContext(AppContext);

  return (
    <CustomButton
      width={'100px'}
      height={'40px'}
      color={'#e74a3b'}
      fontSize={'24px'}
      onClickEvent={() => {
        setCurrentModal(KIND_OF_MODAL.NONE);
      }}
    >
      취소
    </CustomButton>
  );
}

export default CancelButton;
