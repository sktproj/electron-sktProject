import { useState, useEffect, useContext } from 'react';
import StudentPageContext from 'context/StudentPageContext';
import Table from 'components/table/Table';

const { ipcRenderer } = window.require('electron');

function ReturnTableBody() {
  const [rowList, setRowList] = useState([]);
  const { student, currentModal } = useContext(StudentPageContext);
  const studentId = student.id;

  useEffect(() => {
    (async () => {
      const returnProductList = await getReturnProductList(studentId);
      setRowList(returnProductList);
    })();
  }, []);

  return (
    <Table
      columnList={['물품 이름', '빌린 날짜', '반납일', '연체일']}
      rowList={rowList}
      fontSize={'20px'}
    />
  );
}

function getReturnProductList(studentId) {
  return new Promise(resolve => {
    const stringifiedStudentId = JSON.stringify(studentId);
    ipcRenderer.send('GetReturnProductListByStudentId', stringifiedStudentId);
    ipcRenderer.on(
      'Reply_GetReturnProductListByStudentId',
      (event, payload) => {
        resolve(JSON.parse(payload));
      },
    );
  });
}

export default ReturnTableBody;
