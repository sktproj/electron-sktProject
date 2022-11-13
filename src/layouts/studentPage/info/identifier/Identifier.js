import { useContext } from 'react';
import AppContext from 'context/AppContext';
import styles from './Identifier.module.css';

function Identifier() {
  const { student } = useContext(AppContext);
  const { grade, classNM, name } = student;

  return (
    <div className={styles.id}>
      {grade}학년 {classNM}반 {name}
    </div>
  );
}

export default Identifier;
