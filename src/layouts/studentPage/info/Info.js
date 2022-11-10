import { useContext } from 'react';
import StudentPageContext from 'context/StudentPageContext';
import Id from 'layouts/studentPage/info/Id';
import Tag from 'layouts/studentPage/info/Tag';
import styles from './Info.module.css';

function Info() {
  const { student } = useContext(StudentPageContext);
  const { grade, classNM, name, overdue } = student;

  return (
    <div className={styles.info}>
      <Id grade={grade} classNM={classNM} name={name} />
      <Tag name={'반납 예정 물품'} value={`${123}개`} color="green" />
      <Tag name={'연체 물품'} value={`${123}개`} color="yello" />
      <Tag name={'연체 횟수'} value={`${overdue}번`} color="red" />
    </div>
  );
}

export default Info;
