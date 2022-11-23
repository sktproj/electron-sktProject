import CustomModal from 'components/customModal/CustomModal';
import styles from './InputStudentInfoModal.module.css';
import CustomInput from 'components/customInput/CustomInput';
import { useContext, useState } from 'react';
import CustomButton from 'components/customButton/CustomButton';
import StudentAPI from 'api/StudentAPI';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import AppContext from 'context/AppContext';

const customStyles = {
  content: {
    width: '500px',
    height: '200px',
  },
};

const inputData = [
  { key: 'grade', placeholder: '학년' },
  { key: 'classNM', placeholder: '반' },
  { key: 'studentNB', placeholder: '번호' },
  { key: 'name', placeholder: '이름' },
];

function InputStudentInfoModal({ studentCardId }) {
  const { setCurrentModal } = useContext(AppContext);
  const [studentData, setStudentData] = useState({
    grade: null,
    classNM: null,
    studentNB: null,
    name: null,
  });

  return (
    <CustomModal style={customStyles}>
      <div className={styles.inputStudentInfoModal}>
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
              !studentData.grade || !studentData.classNM || !studentData.name
            }
            width="100px"
            height="45px"
            color="#4e73df"
            fontSize="28px"
            onClickEvent={async () => {
              const createdStudentData = { id: studentCardId, ...studentData };
              await StudentAPI.createStudent(createdStudentData);
              const { id, grade, classNM, name } = createdStudentData;
              setCurrentModal(KIND_OF_MODAL.NONE);
              window.location.hash = `/student?id=${id}&grade=${grade}&classNM=${classNM}&name=${name}`;
            }}
          >
            완료
          </CustomButton>
          <CustomButton
            width="100px"
            height="45px"
            color="#e74a3b"
            fontSize="28px"
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

export default InputStudentInfoModal;
