import { useState, useCallback } from 'react';
import AppContext from 'context/AppContext';
import Header from 'layouts/app/header/Header';
import HomePage from 'pages/homePage/HomePage';
import StudentPage from 'pages/studentPage/StudentPage';
import AdminPage from 'pages/adminPage/AdminPage';
import BorrowModal from 'modal/borrowModal/BorrowModal';
import AddProductModal from 'modal/addProductModal/AddProductModal';
import AdminAuthModal from 'modal/adminAuth/AdminAuthModal';
import KIND_OF_PAGE from 'constant/KIND_OF_PAGE';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import styles from './App.module.css';

const studentData = {
  id: 123456,
  grade: 3,
  classNM: 5,
  name: '신재훈',
  overdue: 999,
};

function App() {
  const [update, updateState] = useState();
  const reload = useCallback(() => updateState({}), []);
  const [currentPage, setCurrentPage] = useState(KIND_OF_PAGE.STUDENT);
  const [currentModal, setCurrentModal] = useState(KIND_OF_MODAL.NONE);

  return (
    <AppContext.Provider
      value={{
        student: studentData,
        currentModal,
        setCurrentModal,
        setCurrentPage,
        update,
        reload,
      }}
    >
      <div className={styles.root}>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {renderPage(currentPage, studentData)}
        {renderModal(currentModal)}
      </div>
    </AppContext.Provider>
  );
}

function renderPage(currentPage) {
  switch (currentPage) {
    case KIND_OF_PAGE.HOME:
      return <HomePage />;

    case KIND_OF_PAGE.STUDENT:
      return <StudentPage student={studentData} />;

    case KIND_OF_PAGE.ADMIN:
      return <AdminPage />;

    default:
      return null;
  }
}

function renderModal(currentModal) {
  switch (currentModal) {
    case KIND_OF_MODAL.BORROW_MODAL:
      return <BorrowModal />;

    case KIND_OF_MODAL.ADD_PRODUCT_MODAL:
      return <AddProductModal />;

    case KIND_OF_MODAL.ADMIN_AUTH:
      return <AdminAuthModal />;

    default:
      return null;
  }
}

export default App;
