import Info from 'layouts/studentPage/info/Info';
import BorrowButton from 'layouts/studentPage/borrowButton/BorrowButton';
import styles from './StudentPage.module.css';
import HistoryTable from 'layouts/studentPage/historyTable/HistoryTable';

function StudentPage() {
  return (
    <article className={styles.article}>
      <Info />
      <BorrowButton />
      <HistoryTable />
    </article>
  );
}

export default StudentPage;
