import AccessStudentPage from 'layouts/adminPage/accessStudentPage/AccessStudentPage';
import ProductManager from 'layouts/adminPage/productManager/ProductManager';
import ExportExcel from 'layouts/adminPage/exportExcel/ExportExcel';
import styles from './AdminPage.module.css';
import ChangePassword from 'layouts/adminPage/changePassword/ChangePassword';

function AdminPage() {
  return (
    <div className={styles.adminPage}>
      <ProductManager />
      <div className={styles.buttonContainer}>
        <AccessStudentPage />
        <ExportExcel />
        <ChangePassword />
      </div>
    </div>
  );
}

export default AdminPage;
