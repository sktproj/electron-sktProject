import CustomModal from 'components/customModal/CustomModal';
import CustomInput from 'components/customInput/CustomInput';
import { useContext, useState } from 'react';
import CustomButton from 'components/customButton/CustomButton';
import StudentAPI from 'api/StudentAPI';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';
import AppContext from 'context/AppContext';
import styles from './UpdateStudentInfoModal.module.css';
import URLUtil from 'utils/URL';

const customStyles = {
  content: {
    width: '350px',
    height: '230px',
  },
};

function UpdateStudentInfoModal() {
  const { setCurrentModal } = useContext(AppContext);
  const [studentData, setStudentData] = useState({
    classNM: '',
    studentNB: '',
  });

  return (
    <CustomModal style={customStyles}>
      <div className={styles.updateStudentInfoModal}>
        <div className={styles.title}>
          올해 배정받으신 반, 번호를 입력하세요.
        </div>
        <div className={styles.inputContainer}>
          {[
            { key: 'classNM', placeholder: '반' },
            { key: 'studentNB', placeholder: '번호' },
          ].map((data, index) => {
            return (
              <CustomInput
                key={index}
                value={studentData[data.key]}
                width="100px"
                height="45px"
                color="#4e73df"
                fontSize="22px"
                placeholder={data.placeholder}
                onChangeEvent={e => {
                  const text = e.target.value;
                  if (/^[0-9]+$/.test(text) || !text) {
                    setStudentData(prev => {
                      let obj = { ...prev };
                      obj[data.key] = e.target.value;
                      return obj;
                    });
                  }
                }}
              />
            );
          })}
        </div>
        <div className={styles.buttonContainer}>
          <CustomButton
            disabled={!studentData.classNM || !studentData.studentNB}
            width="80px"
            height="40px"
            color="#4e73df"
            fontSize="25px"
            onClickEvent={async () => {
              const studentCardId = URLUtil.getQueryParam('id');
              console.log(studentCardId);
              await StudentAPI.updateStudent(studentCardId, studentData);
              window.location.reload();
            }}
          >
            완료
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
}

export default UpdateStudentInfoModal;
