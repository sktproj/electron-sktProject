import styles from './Timer.module.css';

function Timer({ openTime, currentTime }) {
  return (
    <div
      className={styles.timer}
      style={{
        width: `${
          100 * (currentTime / openTime) > 100
            ? 100
            : 100 * (currentTime / openTime)
        }%`,
      }}
    ></div>
  );
}

export default Timer;
