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
          const workbook = await createWorkbook();

          workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            const currentDate = moment().format('YYMMDD');
            anchor.download = `${currentDate}_양심물품실_반납기록.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
          });
        }}
      >
        대출 목록 출력
      </CustomButton>
    </div>
  );
}

async function createWorkbook() {
  const workbook = new Excel.Workbook();

  workbook.creator = '양심물품실';
  workbook.lastModifiedBy = '양심물품실';
  workbook.created = moment().format('YYYY-MM-DD');
  workbook.lastModifiedBy = moment().format('YYYY-MM-DD');

  const sheet1 = workbook.addWorksheet('Sheet1');

  const kindOfColumns = [
    { header: '학년', key: 'grade' },
    { header: '반', key: 'classNM' },
    { header: '번호', key: 'studentNB' },
    { header: '이름', key: 'name' },
    { header: '빌린 물품', key: 'product' },
    { header: '대여일', key: 'borrowDate' },
    { header: '반납일', key: 'returnDate' },
  ];

  sheet1.columns = kindOfColumns.map(column => {
    return {
      header: column.header,
      key: column.key,
      width: '20',
      style: {
        font: { size: 16 },
      },
    };
  });

  const returnProductList =
    await ReturnProductAPI.getReturnProductListJoinStudentAndProduct();

  returnProductList.forEach(returnProduct => {
    const { grade, classNM, studentNB, name } = returnProduct.Student;
    const product = returnProduct.Product.name;
    const { borrowDate, returnDate } = returnProduct;

    const sheetRow = {
      grade,
      classNM,
      studentNB: '777',
      name,
      product,
      borrowDate,
      returnDate,
    };
    sheet1.addRow(sheetRow);
  });

  return workbook;
}

export default ExportExcel;
