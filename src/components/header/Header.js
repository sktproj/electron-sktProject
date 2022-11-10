import styles from './Header.module.css';

import admintPageImg from 'image/admin_page_img.png';

function Footer() {
  return (
    <div className={styles.header}>
      <button className={styles.adminPageBtn}>
        <img src={admintPageImg} width="25px" alt="" />
      </button>
    </div>
  );
}

export default Footer;
