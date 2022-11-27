import Identifier from './identifier/Identifier';
import Tag from './tag/Tag';
import styles from './Info.module.css';
import { useContext, useEffect, useState } from 'react';
import URLUtil from 'utils/URL';
import ProductAPI from 'api/ProductAPI';
import BorrowAPI from 'api/BorrowAPI';
import ReturnProductAPI from 'api/ReturnProductAPI';
import infoModifyButtonImg from 'image/student_page_info_modify_button_img.png';
import AppContext from 'context/AppContext';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';

function Info() {
  const [returnDueProductAmount, setReturnDueProductAmount] = useState(-1);
  const [overdueProductAmount, setOverdueProductAmount] = useState(-1);
  const [overdueCount, setOverdueCount] = useState(-1);
  const { setCurrentModal } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const studentId = URLUtil.getQueryParam('id');

      const borrowList = await BorrowAPI.getBorrowListAllByStudentId(studentId);
      setReturnDueProductAmount(borrowList.length);

      const overdueProductList = await BorrowAPI.getBorrowListFilterOverdue(
        studentId,
      );
      setOverdueProductAmount(overdueProductList.length);

      const overdueReturnedProductList =
        await ReturnProductAPI.getReturnProductListFilterOverdue(studentId);
      setOverdueCount(
        overdueProductList.length + overdueReturnedProductList.length,
      );
    })();
  }, []);

  return (
    <div className={styles.info}>
      <div className={styles.infoModify}>
        <img
          width="25px"
          src={infoModifyButtonImg}
          alt=""
          onClick={() => {
            setCurrentModal(KIND_OF_MODAL.MODIFY_STUDENT_INFO);
          }}
        />
      </div>
      <Identifier />
      <Tag
        name={'빌린 물품'}
        value={`${returnDueProductAmount}개`}
        color="#1cc88a"
      />
      <Tag
        name={'연체 물품'}
        value={`${overdueProductAmount}개`}
        color="#f6c23e"
      />
      <Tag name={'연체 횟수'} value={`${overdueCount}번`} color="#e74a3b" />
    </div>
  );
}

export default Info;
