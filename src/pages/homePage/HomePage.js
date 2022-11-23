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
      </div>
    </div>
  );
}

export default HomePage;
