import CustomModal from 'components/customModal/CustomModal';
import CustomInput from 'components/customInput/CustomInput';
import { useContext, useEffect, useState } from 'react';
import CustomButton from 'components/customButton/CustomButton';
import StudentAPI from 'api/StudentAPI';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import AppContext from 'context/AppContext';
import styles from './ModifyStudentInfoModal.module.css';
import URLUtil from 'utils/URL';

const customStyles = {
  content: {
    width: '300px',
    height: '230px',
  },
};

const inputData = [
  { key: 'classNM', placeholder: '반' },
  { key: 'studentNB', placeholder: '번호' },
];

function ModifyStudentInfoModal() {
  const { setCurrentModal } = useContext(AppContext);
  const [studentData, setStudentData] = useState({
    classNM: null,
    studentNB: null,
  });

  return (
    <CustomModal style={customStyles}>
      <div className={styles.modifyStudentInfoModal}>
        <div className={styles.title}>학번 수정</div>
        <div className={styles.inputContainer}>
          {inputData.map((data, index) => {
            return (
              <CustomInput
                key={index}
                width="100px"
                height="45px"
                color="#4e73df"
                fontSize="22px"
                placeholder={data.placeholder}
                onChangeEvent={e => {
                  setStudentData(prev => {
                    let obj = { ...prev };
                    obj[data.key] = e.target.value;
                    return obj;
                  });
                }}
              />
            );
          })}
        </div>
        <div className={styles.buttonContainer}>
          <CustomButton
            disabled={
              !studentData.grade ||
              !studentData.classNM ||
              !studentData.studentNB
            }
            width="80px"
            height="40px"
            color="#4e73df"
            fontSize="25px"
            onClickEvent={async () => {
              const studentCardId = URLUtil.getQueryParam('id');
              await StudentAPI.updateStudent(studentCardId, studentData);
              window.location.reload();
            }}
          >
            완료
          </CustomButton>
          <CustomButton
            width="80px"
            height="40px"
            color="#e74a3b"
            fontSize="25px"
            onClickEvent={() => {
              setCurrentModal(KIND_OF_MODAL.NONE);
            }}
          >
            취소
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
}

export default ModifyStudentInfoModal;
