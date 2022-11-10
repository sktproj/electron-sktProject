import { useState, useEffect, useContext } from 'react';
import StudentPageContext from 'context/StudentPageContext';
import ProductSelecter from 'layouts/studentPage/borrowModal/ProductSelecter';
import ConfirmButton from 'layouts/studentPage/borrowModal/ConfirmButton';
import Modal from 'components/modal/Modal';
import styles from './BorrowModal.module.css';
import MODAL_LIST from 'constant/MODAL';

const { ipcRenderer } = window.require('electron');
const customStyles = {
  content: {
    width: '700px',
    height: '600px',
  },
};

function BorrowModal() {
  const [productList, setProductList] = useState([]);
  const [selectedProductIdList, setSelectedProductIdList] = useState([1, 2]);
  const { student, setCurrentModal } = useContext(StudentPageContext);
  const studentId = student.id;

  useEffect(() => {
    ipcRenderer.send('FindAllProduct');
    ipcRenderer.on('Reply_FindAllProduct', (event, payload) => {
      const parsedPayload = JSON.parse(payload);
      setProductList(parsedPayload);
    });
  }, []);

  const addBorrowList = () => {
    ipcRenderer.send(
      'AddBorrowList',
      JSON.stringify({
        studentId,
        productList: selectedProductIdList,
      }),
    );
    ipcRenderer.on('Reply_AddBorrowList', event => {
      setCurrentModal(MODAL_LIST.NONE);
    });
  };

  return (
    <Modal
      style={customStyles}
      closeModal={() => {
        setCurrentModal(MODAL_LIST.NONE);
      }}
    >
      <div className={styles.borrowModal}>
        <ProductSelecter productList={productList} />
        <ConfirmButton onClickEvent={addBorrowList} />
      </div>
    </Modal>
  );
}

export default BorrowModal;
