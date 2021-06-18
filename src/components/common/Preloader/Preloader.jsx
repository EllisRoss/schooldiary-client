import logo from './logo.svg';
import styles from './Preloader.module.css';

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloaderWrapper}>
        <img src={logo} className={styles.preloaderLogo} alt="logo" />
      </div>
    </div>
  );
}

export default Preloader;
