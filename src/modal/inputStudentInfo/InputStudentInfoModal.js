import { useContext, useState } from 'react';
import AppContext from 'context/AppContext';
import CustomModal from 'components/customModal/CustomModal';
import ModalHeader from './modalHeader/ModalHeader';
import StudentAPI from 'api/StudentAPI';
import styles from './InputStudentInfoModal.module.css';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import KIND_OF_PAGE from 'constant/KIND_OF_PAGE';

const customStyles = {
  content: {
    width: '500px',
    height: '350px',
  },
};

function InputStudentInfoModal({ studentId }) {
  const { setStudent, setCurrentModal, setCurrentPage } =
    useContext(AppContext);
  const [studentData, setStudentData] = useState({
    grade: null,
    classNM: null,
    name: null,
  });

  return (
    <CustomModal style={customStyles}>
      <div className={styles.inputStudentInfoModal}>
        <ModalHeader />
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="학년"
            onChange={e => {
              setStudentData(prev => {
                return { ...prev, grade: e.target.value };
              });
            }}
          />
          <input
            className={styles.input}
            placeholder="반"
            onChange={e => {
              setStudentData(prev => {
                return { ...prev, classNM: e.target.value };
              });
            }}
          />
          <input
            className={styles.input}
            placeholder="이름"
            onChange={e => {
              setStudentData(prev => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
          <button
            onClick={async () => {
              const createdStudentData = { id: studentId, ...studentData };
              await StudentAPI.createStudent(createdStudentData);
              setStudent(createdStudentData);
              setCurrentModal(KIND_OF_MODAL.NONE);
              setCurrentPage(KIND_OF_PAGE.STUDENT);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </CustomModal>
  );
}

export default InputStudentInfoModal;
