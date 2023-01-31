import { useContext } from 'react';
import AppContext from 'context/AppContext';
import CustomButton from 'components/customButton/CustomButton';
import BorrowAPI from 'api/BorrowAPI';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import URLUtil from 'utils/URL';
import KIND_OF_TABLE_FILTER from 'constant/KIND_OF_TABLE_FILTER';

function ConfirmButton({ selectedList }) {
  const studentId = URLUtil.getQueryParam('id');
  const { setCurrentModal } = useContext(AppContext);

  return (
    <CustomButton
      width="200px"
      height="40px"
      fontSize="24px"
      color="#4e73df"
      onClickEvent={async () => {
        await BorrowAPI.addBorrow(studentId, selectedList);
        setCurrentModal(KIND_OF_MODAL.NONE);
        const { grade, classNM, name } = URLUtil.getQueryParams([
          'grade',
          'classNM',
          'name',
        ]);
        window.location.hash = `/student?id=${studentId}&grade=${grade}&classNM=${classNM}&name=${name}&filter=${KIND_OF_TABLE_FILTER.BORROW}`;
        window.location.reload();
      }}
    >
      확인
    </CustomButton>
  );
}

export default ConfirmButton;
