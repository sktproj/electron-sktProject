import { useState, useContext, useEffect } from 'react';
import StudentPageContext from 'context/StudentPageContext';
import ProductSelecter from 'layouts/studentPage/borrowModal/ProductSelecter';
import ConfirmButton from 'layouts/studentPage/borrowModal/ConfirmButton';
import Modal from 'components/modal/Modal';
import styles from './BorrowModal.module.css';
import MODAL_LIST from 'constant/MODAL';

const { ipcRenderer } = window.require('electron');
const customStyles = {
  content: {
    width: '850px',
    height: '700px',
  },
};

function BorrowModal() {
  const [selectedList, setSelectedList] = useState([]);
  const { student, setCurrentModal } = useContext(StudentPageContext);
  const studentId = student.id;

  useEffect(() => {
    console.log(selectedList);
  }, [selectedList]);

  return (
    <Modal
      style={customStyles}
      closeModal={() => {
        setCurrentModal(MODAL_LIST.NONE);
      }}
    >
      <div className={styles.borrowModal}>
        <ProductSelecter
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
        <ConfirmButton
          onClickEvent={async () => {
            await addBorrowList(studentId, selectedList);
            setCurrentModal(MODAL_LIST.NONE);
            window.location.reload();
          }}
        />
      </div>
    </Modal>
  );
}

async function addBorrowList(studentId, selectedList) {
  await new Promise(resolve => {
    ipcRenderer.send(
      'AddBorrowList',
      JSON.stringify({
        studentId,
        productList: selectedList,
      }),
    );
    ipcRenderer.on('Reply_AddBorrowList', event => {
      resolve();
    });
  });
}

export default BorrowModal;
