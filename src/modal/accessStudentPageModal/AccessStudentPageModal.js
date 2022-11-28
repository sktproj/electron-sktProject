import CustomInput from 'components/customInput/CustomInput';
import CustomModal from 'components/customModal/CustomModal';
import styles from './AccessStudentPageModal.module.css';
import { useContext, useEffect, useState } from 'react';
import CustomButton from 'components/customButton/CustomButton';
import StudentAPI from 'api/StudentAPI';
import AppContext from 'context/AppContext';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';

const customStyles = {
  content: {
    width: '400px',
    height: '190px',
  },
};

const inputData = [
  { key: 'grade', placeholder: '학년' },
  { key: 'classNM', placeholder: '반' },
  { key: 'studentNB', placeholder: '번호' },
];

function AccessStudentPageModal() {
  const { setCurrentModal } = useContext(AppContext);
  const [studentData, setStudentData] = useState({
    grade: null,
    classNM: null,
    studentNB: null,
  });
  const [warning, setWarning] = useState({ state: false, msg: '' });

  useEffect(() => {
    setWarning(prev => {
      return { state: false, msg: '' };
    });
  }, [studentData]);

  return (
    <CustomModal style={customStyles}>
      <div className={styles.accessStudentPageModal}>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            {inputData.map((data, index) => {
              return (
                <CustomInput
                  key={index}
                  width="100px"
                  height="45px"
                  color={warning.state ? '#e74a3b' : '#4e73df'}
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
          <span
            className={styles.notExistStudentMSG}
            style={{ display: warning.state ? 'inline' : 'none' }}
          >
            {warning.msg}
          </span>
        </div>
        <div className={styles.buttonContainer}>
          <CustomButton
            width="100px"
            height="45px"
            color="#4e73df"
            fontSize="26px"
            onClickEvent={async () => {
              if (
                !studentData.grade ||
                !studentData.classNM ||
                !studentData.studentNB
              ) {
                setWarning(prev => {
                  return {
                    ...prev,
                    state: true,
                    msg: '빈칸을 모두 채워 주십시오.',
                  };
                });
                return;
              }

              const student =
                await StudentAPI.findByGradeAndClassNMAndStudentNB(studentData);

              if (!student) {
                setWarning(prev => {
                  return {
                    ...prev,
                    state: true,
                    msg: '해당하는 학번의 학생이 존재하지 않습니다.',
                  };
                });
                return;
              }

              const { id, grade, classNM, name } = student;
              window.location.hash = `/student?id=${id}&grade=${grade}&classNM=${classNM}&name=${name}`;
              setCurrentModal(KIND_OF_MODAL.NONE);
            }}
          >
            확인
          </CustomButton>
          <CustomButton
            width="100px"
            height="45px"
            color="#e74a3b"
            fontSize="26px"
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

export default AccessStudentPageModal;
