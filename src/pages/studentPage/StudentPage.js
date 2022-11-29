import Info from 'layouts/studentPage/info/Info';
import BorrowButton from 'layouts/studentPage/borrowButton/BorrowButton';
import styles from './StudentPage.module.css';
import HistoryTable from 'layouts/studentPage/historyTable/HistoryTable';
import { useContext, useEffect } from 'react';
import AppContext from 'context/AppContext';
import URLUtil from 'utils/URL';
import StudentAPI from 'api/StudentAPI';
import moment from 'moment';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';

function StudentPage() {
  const { setCurrentModal } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const studentCardId = URLUtil.getQueryParam('id');
      const student = await StudentAPI.findById(studentCardId);
      const studentUpdatedAt = student.updatedAt;

      const currentYear = moment().year();
      const currentMonth = moment().month() + 1;
      const studentUpdatedAtYear = moment(studentUpdatedAt).year();

      if (studentUpdatedAtYear < currentYear && currentMonth >= 2) {
        setCurrentModal(KIND_OF_MODAL.MODIFY_STUDENT_INFO);
      }
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
