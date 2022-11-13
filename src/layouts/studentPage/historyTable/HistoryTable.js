import { useEffect, useState, useContext } from 'react';
import AppContext from 'context/AppContext';
import TableFilter from './tableFilter/TableFilter';
import TableBody from './tableBody/TableBody';
import CustomButton from 'components/customButton/CustomButton';
import Pagenation from './pagenation/Pagenation';
import styles from './HistoryTable.module.css';
import BorrowAPI from 'api/BorrowAPI';
import ReturnProductAPI from 'api/ReturnProductAPI';
import DateUtil from 'utils/Date';
import KIND_OF_TABLE_FILTER from 'constant/KIND_OF_TABLE_FILTER';
import TABLE_SHOWED_ROW_AMOUNT from 'constant/TABLE_SHOWED_ROW_AMOUNT';

function HistoryTable() {
  const [currentFilter, setCurrentFilter] = useState(
    KIND_OF_TABLE_FILTER.BORROW,
  );
  const [history, setHistory] = useState([]);
  const [tableRow, setTableRow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { student } = useContext(AppContext);
  const studentId = student.id;

  useEffect(() => {
    (async () => {
      setHistory(await getHistory(currentFilter, studentId));
      setCurrentPage(1);
    })();
  }, [currentFilter]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * TABLE_SHOWED_ROW_AMOUNT;
    setTableRow(
      history.slice(startIndex, startIndex + TABLE_SHOWED_ROW_AMOUNT),
    );
  }, [history, currentPage]);

  return (
    <div className={styles.historyTable}>
      <TableFilter
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      <div>
        <TableBody column={getColumn(currentFilter)} row={tableRow} />
      </div>
      <Pagenation
        limitPage={getShowedLimitPage(history.length)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

async function getHistory(currentFilter, studentId) {
  switch (currentFilter) {
    case KIND_OF_TABLE_FILTER.BORROW:
      const borrowList = await BorrowAPI.getBorrowListFilterBorrow(studentId);
      return processBorrowList(borrowList);

    case KIND_OF_TABLE_FILTER.OVERDUE:
      const overdueList = await BorrowAPI.getBorrowListFilterOverdue(studentId);
      return processBorrowList(overdueList);

    case KIND_OF_TABLE_FILTER.RETURN:
      return await ReturnProductAPI.getReturnProductList(studentId);
    default:
      return null;
  }
}

function processBorrowList(tableData) {
  return tableData.map(borrow => {
    const productName = borrow.Product.name;
    const { id, borrowDate, returnDueDate } = borrow;
    let remainingDays = DateUtil.getRemainingDays(
      DateUtil.getCurrentDate(),
      returnDueDate,
    );
    const remainingReturnDay =
      remainingDays >= 0
        ? remainingDays === 0
          ? '오늘까지'
          : `${remainingDays}일`
        : '0일';
    const status = remainingDays >= 0 ? '빌림' : '연체';
    const overdueDay = remainingDays >= 0 ? '0일' : `${-remainingDays}일`;

    return [
      productName,
      borrowDate,
      returnDueDate,
      remainingReturnDay,
      status,
      overdueDay,
      <CustomButton
        width="70px"
        height="40px"
        fontSize="22px"
        color="#e74a3b"
        onClickEvent={async () => {
          await ReturnProductAPI.returnProduct(id);
          window.location.reload();
        }}
      >
        반납
      </CustomButton>,
    ];
  });
}

function getColumn(currentFilter) {
  return currentFilter === KIND_OF_TABLE_FILTER.RETURN
    ? ['물품 이름', '빌린 날짜', '반납일', '연체일']
    : [
        '물품 이름',
        '빌린 날짜',
        '반납 예정일',
        '남은 반납일',
        '상태',
        '연체일',
        ' ',
      ];
}

function getShowedLimitPage(dataLength) {
  const result = Math.ceil(dataLength / TABLE_SHOWED_ROW_AMOUNT);
  return result < 1 ? 1 : result;
}

export default HistoryTable;
