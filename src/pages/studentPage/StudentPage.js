import Info from 'layouts/studentPage/info/Info';
import BorrowButton from 'layouts/studentPage/borrowButton/BorrowButton';
import styles from './StudentPage.module.css';
import HistoryTable from 'layouts/studentPage/historyTable/HistoryTable';
import { useContext, useEffect, useState } from 'react';
import AppContext from 'context/AppContext';
import URLUtil from 'utils/URL';
import StudentAPI from 'api/StudentAPI';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import Timer from 'layouts/studentPage/timer/Timer';

const DEFAULT_OPEN_TIME = 20 * 100; // ms

function StudentPage() {
  const { setCurrentModal } = useContext(AppContext);
  const [currentOpenTime, setCurrentOpenTime] = useState(DEFAULT_OPEN_TIME);
  const [timer, setTimer] = useState();

  //timer
  useEffect(() => {
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log(currentOpenTime);
    if (currentOpenTime <= 0) {
      setCurrentModal(KIND_OF_MODAL.NONE);
      window.location.hash = '/';
    }
  }, [currentOpenTime]);

  // update student data
  useEffect(() => {
    (async () => {
      const studentCardId = URLUtil.getQueryParam('id');
      const student = await StudentAPI.findById(studentCardId);

      if (!student.classNM || !student.studentNB) {
        setCurrentModal(KIND_OF_MODAL.MODIFY_STUDENT_INFO);
      }
    })();
  }, []);

  return (
    <div
      className={styles.article}
      onMouseMove={() => {
        setCurrentOpenTime(DEFAULT_OPEN_TIME);
      }}
      onMouseEnter={() => {
        const openTimer = setInterval(() => {
          setCurrentOpenTime(prev => prev - 1);
        }, 10);
        setTimer(openTimer);
      }}
      onMouseLeave={() => {
        clearInterval(timer);
      }}
    >
      <div className={styles.mainContainer}>
        <Info />
        <BorrowButton />
        <HistoryTable />
      </div>
      <Timer openTime={DEFAULT_OPEN_TIME} currentTime={currentOpenTime} />
    </div>
  );
}

export default StudentPage;
