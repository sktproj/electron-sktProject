import CustomButton from 'components/customButton/CustomButton';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import AppContext from 'context/AppContext';
import { useContext } from 'react';

function CancelButton() {
  const { setCurrentModal } = useContext(AppContext);

  return (
    <CustomButton
      width="200px"
      height="40px"
      fontSize="24px"
      color="rgb(231, 74, 59)"
      onClickEvent={async () => {
        setCurrentModal(KIND_OF_MODAL.NONE);
      }}
    >
      취소
    </CustomButton>
  );
}

export default CancelButton;
