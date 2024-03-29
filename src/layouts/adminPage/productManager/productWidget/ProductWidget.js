import ProductAPI from 'api/ProductAPI';
import styles from './ProductWidget.module.css';

function ProductWidget({ id, name, reload }) {
  const fontSize = 40 - name.length * 2;

  return (
    <span className={styles.widget}>
      <div
        style={{ fontSize: `${fontSize < 24 ? 24 : fontSize}px` }}
        className={styles.productName}
      >
        {name}
      </div>
      <button
        className={styles.deleteButton}
        onClick={async () => {
          await ProductAPI.changeStatusToDeleted(id);
          reload({});
        }}
      >
        삭제
      </button>
    </span>
  );
}

export default ProductWidget;
