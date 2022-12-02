import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AppContext from 'context/AppContext';
import Header from 'layouts/app/header/Header';
import BorrowModal from 'modal/borrowModal/BorrowModal';
import AddProductModal from 'modal/addProductModal/AddProductModal';
import AdminAuthModal from 'modal/adminAuth/AdminAuthModal';
import InputStudentInfoModal from 'modal/inputStudentInfo/InputStudentInfoModal';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import styles from './App.module.css';
import HomePage from 'pages/homePage/HomePage';
import StudentPage from 'pages/studentPage/StudentPage';
import AdminPage from 'pages/adminPage/AdminPage';
import AccessStudentPageModal from 'modal/accessStudentPageModal/AccessStudentPageModal';
import ChangeAdminPassword from 'modal/changeAdminPasswordModal/ChangeAdminPasswordModal';
import ModifyStudentInfoModal from 'modal/modifyStudentInfoModal/ModifyStudentInfoModal';
import UpdateStudentInfoModal from 'modal/updateStudentInfoModal/UpdateStudentInfoModal';

const { ipcRenderer } = window.require('electron');

function App() {
  const [currentModal, setCurrentModal] = useState(KIND_OF_MODAL.NONE);
  const [studentCardId, setStudentCardId] = useState('');

  ipcRenderer.on('ScanningCard', (event, payload) => {
    const { cardId, studentData } = JSON.parse(payload);
    if (studentData) {
      const { id, grade, classNM, name } = studentData;
      window.location.hash = `/student?id=${id}&grade=${grade}&classNM=${classNM}&name=${name}`;
      window.location.reload();
      return;
    }

    setStudentCardId(cardId);
    setCurrentModal(KIND_OF_MODAL.INPUT_STUDENT_INFO_MODAL);
  });

  return (
    <HashRouter>
      <AppContext.Provider
        value={{
          setCurrentModal,
        }}
      >
        <div className={styles.root}>
          <Header />
          <div className={styles.article}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/studentAuth" element={<AdminPage />} />
              <Route path="/student" element={<StudentPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
          {renderModal(currentModal, studentCardId)}
        </div>
      </AppContext.Provider>
    </HashRouter>
  );
}

function renderModal(currentModal, studentCardId) {
  switch (currentModal) {
    case KIND_OF_MODAL.BORROW_MODAL:
      return <BorrowModal />;

    case KIND_OF_MODAL.ADD_PRODUCT_MODAL:
      return <AddProductModal />;

    case KIND_OF_MODAL.ADMIN_AUTH:
      return <AdminAuthModal />;

    case KIND_OF_MODAL.INPUT_STUDENT_INFO_MODAL:
      return <InputStudentInfoModal studentCardId={studentCardId} />;

    case KIND_OF_MODAL.ACCESS_STUDENT_PAGE_MODAL:
      return <AccessStudentPageModal />;

    case KIND_OF_MODAL.CHANGE_ADMIN_PASSWORD:
      return <ChangeAdminPassword />;

    case KIND_OF_MODAL.MODIFY_STUDENT_INFO:
      return <ModifyStudentInfoModal />;

    case KIND_OF_MODAL.UPDATE_STUDENT_INFO:
      return <UpdateStudentInfoModal />;

    default:
      return null;
  }
}

export default App;
