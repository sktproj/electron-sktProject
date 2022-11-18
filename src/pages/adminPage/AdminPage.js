import AccessStudentPage from 'layouts/adminPage/accessStudentPage/AccessStudentPage';
import ProductManager from 'layouts/adminPage/productManager/ProductManager';
import styles from './AdminPage.module.css';

function AdminPage() {
  return (
    <div className={styles.adminPage}>
      <ProductManager />
      <AccessStudentPage />
    </div>
  );
}

export default AdminPage;
