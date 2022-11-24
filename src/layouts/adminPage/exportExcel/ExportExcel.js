import BorrowAPI from 'api/BorrowAPI';
import CustomButton from 'components/customButton/CustomButton';
import styles from './ExportExcel.module.css';
import Excel from 'exceljs';
import moment from 'moment';
import ReturnProductAPI from 'api/ReturnProductAPI';

function ExportExcel() {
  return (
    <div className={styles.exportExcel}>
      <CustomButton
        width="100%"
        height="100%"
        color="#33C481"
        fontSize="32px"
        onClickEvent={async () => {
          await BorrowAPI.getBorrowListAll(); // 내부 로직 작성 필요 2022-11-24 : 0835
        }}
      >
        대출 목록 출력
      </CustomButton>
    </div>
  );
}

function createExcelFile() {
  const workbook = new Excel.Workbook();

  workbook.creator = '양심물품실';
  workbook.lastModifiedBy = '양심물품실';
  workbook.created = moment().format('YYYY-MM-DD');
  workbook.lastModifiedBy = moment().format('YYYY-MM-DD');

  const sheet1 = workbook.addWorksheet('Sheet1');

  sheet1.columns = [
    {
      header: '학년',
      name: 'grade',
      width: '20',
      style: {
        font: { size: 16 },
      },
    },
    {
      header: '반',
      name: 'classNM',
      width: '20',
      style: {
        font: { size: 16 },
      },
    },
    {
      header: '번호',
      name: 'studentNB',
      width: '20',
      style: {
        font: { size: 16 },
      },
    },
    {
      header: '이름',
      name: 'name',
      width: '20',
      style: {
        font: { size: 16 },
      },
    },
    {
      header: '대여일',
      name: 'borrowDate',
      width: '20',
      style: {
        font: { size: 16 },
      },
    },
    {
      header: '반납일',
      name: 'returnDate',
      width: '20',
      style: {
        font: { size: 16 },
      },
    },
  ];

  const borrowList = ReturnProductAPI.getReturnProductListJoinStudent();

  borrowList.forEach(borrow => {
    const rowArr = [];
  });
}

export default ExportExcel;
