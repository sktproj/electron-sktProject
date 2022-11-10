import styles from './Tag.module.css';

function Tag({ name, value, color }) {
  return (
    <div className={`${styles.tag} ${styles[color]}`}>
      <div className={styles.tagName}>{name}</div>
      <div className={styles.tagValue}>{value}</div>
    </div>
  );
}

export default Tag;
