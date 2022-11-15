import PageButton from './pageButton/PageButton';
import styles from './Header.module.css';
import homePageButtonImg from 'image/home_page_button_img.png';
import admintPageButtonImg from 'image/admin_page_button_img.png';
import KIND_OF_PAGE from 'constant/KIND_OF_PAGE';
import { useContext } from 'react';
import AppContext from 'context/AppContext';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';

function Header({ currentPage }) {
  const { setCurrentModal } = useContext(AppContext);

  return (
    <div className={styles.header}>
      <PageButton
        isHidden={currentPage === KIND_OF_PAGE.HOME ? true : false}
        image={homePageButtonImg}
        onClickEvent={() => {
          window.location.hash = '/';
        }}
      />
      <PageButton
        isHidden={currentPage === KIND_OF_PAGE.ADMIN ? true : false}
        image={admintPageButtonImg}
        onClickEvent={() => {
          setCurrentModal(KIND_OF_MODAL.ADMIN_AUTH);
        }}
      />
    </div>
  );
}

export default Header;
