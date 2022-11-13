import ProductManager from 'layouts/adminPage/productManager/ProductManager';
import styles from './AdminPage.module.css';

function AdminPage() {
  return (
    <div className={styles.adminPage}>
      <ProductManager />
    </div>
  );
}

export default AdminPage;
