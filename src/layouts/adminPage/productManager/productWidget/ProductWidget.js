import styles from './ProductWidget.module.css';

function ProductWidget({ id, name }) {
  const fontSize = 40 - name.length * 2;
  return (
    <span className={styles.widget}>
      <div
        style={{ fontSize: `${fontSize < 24 ? 24 : fontSize}px` }}
        className={styles.productName}
      >
        {name}
      </div>
      <button className={styles.deleteButton}>삭제</button>
    </span>
  );
}

export default ProductWidget;
