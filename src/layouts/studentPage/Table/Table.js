import { useState, useEffect, useContext } from 'react';
import StudentPageContext from 'context/StudentPageContext';
import TableFilter from 'layouts/studentPage/table/TableFilter';
import TableAPI from './TableAPI';
import Table from 'components/table/Table';
import Pagenation from './Pagenation';
import styles from './Table.module.css';
import TABLE from 'constant/TABLE';

function BorrowTable() {
  const [currentFilter, setCurrentFilter] = useState(TABLE.FILTER_LIST.BORROW);
  const [tableDataList, setTableDataList] = useState([]);
  const [rowList, setRowList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { student } = useContext(StudentPageContext);
  const studentId = student.id;

  useEffect(() => {
    (async () => {
      let tableData;
      // eslint-disable-next-line default-case
      switch (currentFilter) {
        case TABLE.FILTER_LIST.BORROW:
          tableData = await TableAPI.getBorrowListFilterBorrow(studentId);
          break;

        case TABLE.FILTER_LIST.OVERDUE:
          tableData = await TableAPI.getBorrowListFilterOverdue(studentId);
          break;

        case TABLE.FILTER_LIST.RETURN:
          tableData = await TableAPI.getReturnProductList(studentId);
      }
      setTableDataList(tableData);
      setCurrentPage(1);
    })();
  }, [currentFilter]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * TABLE.SHOWED_ROW_AMOUNT;
    setRowList(
      tableDataList.slice(startIndex, startIndex + TABLE.SHOWED_ROW_AMOUNT),
    );
  }, [tableDataList, currentPage]);

  return (
    <div className={styles.borrowTable}>
      <TableFilter
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      <div>
        {currentFilter === TABLE.FILTER_LIST.RETURN ? (
          <Table
            columnList={['물품 이름', '빌린 날짜', '반납일', '연체일']}
            rowList={rowList}
            fontSize={'20px'}
          />
        ) : (
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
        )}
      </div>
      <Pagenation
        showedPageAmount={TABLE.SHOWED_PAGE_AMOUNT}
        limitPage={getShowedLimitPage(tableDataList.length)}
        setter={setCurrentPage}
      />
    </div>
  );
}

function getShowedLimitPage(dataLength) {
  const result = Math.ceil(dataLength / TABLE.SHOWED_ROW_AMOUNT);
  return result < 1 ? 1 : result;
}

export default BorrowTable;
