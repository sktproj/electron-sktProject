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
    width: '500px',
    height: '190px',
  },
};

const inputData = [
  { key: 'grade', placeholder: '학년' },
  { key: 'classNM', placeholder: '반' },
  { key: 'name', placeholder: '이름' },
];

function AccessStudentPageModal() {
  const { setCurrentModal } = useContext(AppContext);
  const [studentData, setStudentData] = useState({
    grade: null,
    classNM: null,
    name: null,
  });
  const [notExistStudent, setNotExistStudent] = useState(false);

  useEffect(() => {
    setNotExistStudent(false);
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
                  width="130px"
                  height="45px"
                  color={notExistStudent ? '#e74a3b' : '#4e73df'}
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
            style={{ display: notExistStudent ? 'inline' : 'none' }}
          >
            해당하는 정보의 학생이 존재하지 않습니다.
          </span>
        </div>
        <div className={styles.buttonContainer}>
          <CustomButton
            width="100px"
            height="45px"
            color="#4e73df"
            fontSize="26px"
            onClickEvent={async () => {
              const student = await StudentAPI.findByGradeAndClassNMAndName(
                studentData,
              );

              if (!student) {
                setNotExistStudent(true);
                return;
              }

              const { id, grade, classNM, name } = student;
              window.location.hash = `/student?id=${id}&grade=${grade}&classNM=${classNM}&name=${name}`;
              setCurrentModal(KIND_OF_MODAL.NONE);
            }}
          >
            확인
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
}

export default AccessStudentPageModal;
