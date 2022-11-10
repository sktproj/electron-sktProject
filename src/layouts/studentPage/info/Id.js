import styles from './Id.module.css';

function Id({ grade, classNM, name }) {
  return (
    <div className={styles.id}>
      {grade}학년 {classNM}반 {name}
    </div>
  );
}

export default Id;
