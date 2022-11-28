import Info from 'layouts/studentPage/info/Info';
import BorrowButton from 'layouts/studentPage/borrowButton/BorrowButton';
import styles from './StudentPage.module.css';
import HistoryTable from 'layouts/studentPage/historyTable/HistoryTable';
import { useContext, useEffect } from 'react';
import AppContext from 'context/AppContext';
import URLUtil from 'utils/URL';
import StudentAPI from 'api/StudentAPI';
import moment from 'moment';

function StudentPage() {
  const { setCurrentModal } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const studentCardId = URLUtil.getQueryParam('id');
      const student = await StudentAPI.findById(studentCardId);
      const studentUpdatedAt = student.updatedAt;

      console.log(studentUpdatedAt, typeof studentUpdatedAt);
    })();
  }, []);

  return (
    <article className={styles.article}>
      <Info />
      <BorrowButton />
      <HistoryTable />
    </article>
  );
}

export default StudentPage;
