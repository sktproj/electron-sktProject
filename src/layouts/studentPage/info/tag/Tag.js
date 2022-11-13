import styles from './Tag.module.css';

function Tag({ name, value, color }) {
  return (
    <div className={styles.tag} style={{ borderLeft: `8px solid ${color}` }}>
      <div className={styles.tagName} style={{ color: `${color}` }}>
        {name}
      </div>
      <div className={styles.tagValue}>{value}</div>
    </div>
  );
}

export default Tag;
