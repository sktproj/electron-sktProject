import { useEffect, useState } from 'react';
import styles from './Identifier.module.css';
import URLUtil from 'utils/URL';
import StudentAPI from 'api/StudentAPI';

function Identifier() {
  const [studentInfo, setStudentInfo] = useState({
    grade: null,
    classNM: null,
    name: null,
  });

  useEffect(() => {
    (async () => {
      const studentId = URLUtil.getQueryParam('id');
      const student = await StudentAPI.findById(studentId);
      const { grade, classNM, name } = student;
      setStudentInfo(prev => {
        return { ...prev, grade, classNM, name };
      });
    })();
  }, []);

  return (
    <div className={styles.id}>
      {studentInfo.grade}학년 {studentInfo.classNM}반 {studentInfo.name}
    </div>
  );
}

export default Identifier;
