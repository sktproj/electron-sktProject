import { useState, useEffect, useContext } from 'react';
import StudentPageContext from 'context/StudentPageContext';
import Table from 'components/table/Table';
import FILTER_LIST from 'constant/FILTER';
import TableBodyAPI from 'layouts/studentPage/Table/BorrowTableBodyAPI';

function TableBody({ currentFilter }) {
  const [rowList, setRowList] = useState([]);
  const { student, currentModal } = useContext(StudentPageContext);
  const studentId = student.id;

  useEffect(() => {
    (async () => {
      let borrowList;
      // eslint-disable-next-line default-case
      switch (currentFilter) {
        case FILTER_LIST.ALL:
          borrowList = await TableBodyAPI.getBorrowListFilterAll(studentId);
          break;

        case FILTER_LIST.BORROW:
          borrowList = await TableBodyAPI.getBorrowListFilterBorrow(studentId);
          break;

        case FILTER_LIST.OVERDUE:
          borrowList = await TableBodyAPI.getBorrowListFilterOverdue(studentId);
          break;
      }
      setRowList(borrowList);
    })();
  }, [currentModal, currentFilter]);

  return (
    <Table
      columnList={[
        '물품 이름',
        '빌린 날짜',
        '반납 예정일',
        '남은 반납일',
        '상태',
        '연체일',
        ' ',
      ]}
      rowList={rowList}
      fontSize={'20px'}
    />
  );
}

export default TableBody;
