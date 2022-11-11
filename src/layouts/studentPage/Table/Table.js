import { useState } from 'react';
import TableFilter from 'layouts/studentPage/table/TableFilter';
import BorrowTableBody from 'layouts/studentPage/table/BorrowTableBody';
import ReturnTableBody from 'layouts/studentPage/table/ReturnTableBody';
import styles from './Table.module.css';
import FILTER_LIST from 'constant/FILTER';

function BorrowTable() {
  const [currentFilter, setCurrentFilter] = useState(FILTER_LIST.BORROW);

  return (
    <div className={styles.borrowTable}>
      <TableFilter
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      {currentFilter === FILTER_LIST.RETURN ? (
        <ReturnTableBody />
      ) : (
        <BorrowTableBody currentFilter={currentFilter} />
      )}
    </div>
  );
}

export default BorrowTable;
