import { useEffect, useState } from 'react';
import styles from './Identifier.module.css';
import URLUtil from 'utils/URL';

function Identifier() {
  const [grade, setGrade] = useState('');
  const [classNM, setClassNM] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const { grade, classNM, name } = URLUtil.getQueryParams([
      'grade',
      'classNM',
      'name',
    ]);
    setGrade(grade);
    setClassNM(classNM);
    setName(name);
  }, []);

  return (
    <div className={styles.id}>
      {grade}학년 {classNM}반 {name}
    </div>
  );
}

export default Identifier;
