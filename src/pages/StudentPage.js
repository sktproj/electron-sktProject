import { useState } from 'react';
import StudentPageContext from 'context/StudentPageContext';
import Header from 'components/header/Header';
import Info from 'layouts/studentPage/info/Info';
import BorrowButton from 'layouts/studentPage/borrowButton/BorrowButton';
import Table from 'layouts/studentPage/Table/Table';
import Footer from 'components/footer/Footer';
import BorrowModal from 'layouts/studentPage/borrowModal/BorrowModal';
import styles from './StudentPage.module.css';
import MODAL_LIST from 'constant/MODAL';

function StudentPage({ student }) {
  const [currentModal, setCurrentModal] = useState(MODAL_LIST.NONE);

  return (
    <StudentPageContext.Provider
      value={{ student, currentModal, setCurrentModal }}
    >
      <section id="studentPage" className={styles.root}>
        <Header />
        <article className={styles.article}>
          <Info />
          <BorrowButton />
          <Table />
        </article>
        <Footer />
      </section>
      {renderModal(currentModal)}
    </StudentPageContext.Provider>
  );
}

function renderModal(currentModal) {
  switch (currentModal) {
    case MODAL_LIST.BORROW_MODAL:
      return <BorrowModal />;

    default:
      return null;
  }
}

export default StudentPage;
