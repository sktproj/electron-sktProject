import { useContext } from 'react';
import AppContext from 'context/AppContext';
import Identifier from './identifier/Identifier';
import Tag from './tag/Tag';
import styles from './Info.module.css';

function Info() {
  const { student } = useContext(AppContext);
  const studentOverdue = student.overdue;

  return (
    <div className={styles.info}>
      <Identifier />
      <Tag name={'반납 예정 물품'} value={`${123}개`} color="#1cc88a" />
      <Tag name={'연체 물품'} value={`${123}개`} color="#f6c23e" />
      <Tag name={'연체 횟수'} value={`${studentOverdue}번`} color="#e74a3b" />
    </div>
  );
}

export default Info;
