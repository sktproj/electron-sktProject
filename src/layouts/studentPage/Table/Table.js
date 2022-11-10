import { useState } from 'react';
import TableFilter from 'layouts/studentPage/Table/TableFilter';
import BorrowTableBody from 'layouts/studentPage/Table/BorrowTableBody';
import ReturnTableBody from 'layouts/studentPage/Table/ReturnTableBody';
import styles from './Table.module.css';
import FILTER_LIST from 'constant/FILTER';

function BorrowTable() {
  const [currentFilter, setCurrentFilter] = useState(FILTER_LIST.ALL);

  return (
    <div className={styles.borrowTable}>
      <TableFilter
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      {currentFilter === FILTER_LIST.RETURN ? (
        <ReturnTableBody currentFilter={currentFilter} />
      ) : (
        <BorrowTableBody currentFilter={currentFilter} />
      )}
    </div>
  );
}

export default BorrowTable;
