import { useContext } from 'react';
import AppContext from 'context/AppContext';
import CustomButton from 'components/customButton/CustomButton';
import BorrowAPI from 'api/BorrowAPI';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';

function ConfirmButton({ selectedList }) {
  const { student, setCurrentModal, reload } = useContext(AppContext);
  const studentId = student.id;

  return (
    <CustomButton
      width="200px"
      height="40px"
      fontSize="24px"
      color="#4e73df"
      onClickEvent={async () => {
        await BorrowAPI.addBorrow(studentId, selectedList);
        setCurrentModal(KIND_OF_MODAL.NONE);
        reload();
      }}
    >
      확인
    </CustomButton>
  );
}

export default ConfirmButton;
