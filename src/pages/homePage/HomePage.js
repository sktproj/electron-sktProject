import styles from './HomePage.module.css';
import homePageMainImg from 'image/home_page_main_img.png';

function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      <div className={styles.homePage}>
        <img
          src={homePageMainImg}
          width="200px"
          alt=""
          className={styles.img}
        />
        <span className={styles.msg}>학생증을 찍어주세요</span>
        <button
          onClick={() => {
            window.location.hash = `/student?id=${123456}&grade=${3}&classNM=${5}&name=${'신재훈'}&overdue=${999}`;
          }}
        >
          test
        </button>
      </div>
    </div>
  );
}

export default HomePage;
