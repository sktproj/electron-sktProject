import AccessStudentPage from 'layouts/adminPage/accessStudentPage/AccessStudentPage';
import ProductManager from 'layouts/adminPage/productManager/ProductManager';
import ExportExcel from 'layouts/adminPage/exportExcel/ExportExcel';
import styles from './AdminPage.module.css';

function AdminPage() {
  return (
    <div className={styles.adminPage}>
      <ProductManager />
      <div className={styles.buttonContainer}>
        <AccessStudentPage />
        <ExportExcel />
      </div>
    </div>
  );
}

export default AdminPage;
