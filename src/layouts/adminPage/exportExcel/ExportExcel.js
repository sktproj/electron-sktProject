import CustomButton from 'components/customButton/CustomButton';
import styles from './ExportExcel.module.css';
import FileSystemAPI from 'api/FileSystemAPI';

function ExportExcel() {
  return (
    <div className={styles.exportExcel}>
      <CustomButton
        width="100%"
        height="100%"
        color="#33C481"
        fontSize="32px"
        onClickEvent={async () => {
          await FileSystemAPI.writeExcelFile();
        }}
      >
        대출 목록 출력
      </CustomButton>
    </div>
  );
}

export default ExportExcel;
