import Identifier from './identifier/Identifier';
import Tag from './tag/Tag';
import styles from './Info.module.css';
import { useEffect, useState } from 'react';
import URLUtil from 'utils/URL';
import ProductAPI from 'api/ProductAPI';
import BorrowAPI from 'api/BorrowAPI';

function Info() {
  const [returnDueProductAmount, setReturnDueProductAmount] = useState(-1);
  const [overdueProductAmount, setOverdueProductAmount] = useState(-1);

  useEffect(() => {
    (async () => {
      const studentId = URLUtil.getQueryParam('id');

      const borrowList = await BorrowAPI.getBorrowListAll(studentId);
      setReturnDueProductAmount(borrowList.length);

      const overdueProductList = await BorrowAPI.getBorrowListFilterOverdue(
        studentId,
      );
      setOverdueProductAmount(overdueProductList.length);
    })();
  }, []);

  return (
    <div className={styles.info}>
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
      <Tag name={'연체 횟수'} value={`${999}번`} color="#e74a3b" />
    </div>
  );
}

export default Info;
