import { CALENDAR_FILE } from '../../constants';
import styles from '../../styles.module.css';

const FinalCtaSection = () => {
  return (
    <section className={styles.finalCta}>
      <div className={`${styles.shell} ${styles.ctaGrid}`}>
        <h2>What will you launch in 60 minutes?</h2>
        <div className={styles.ctaActions}>
          <a className={`${styles.button} ${styles.buttonDark}`} href={CALENDAR_FILE} download>
            Save October 24 <span aria-hidden="true">↗</span>
          </a>
          <a className={`${styles.button} ${styles.buttonOutline}`} href="#challenges">
            Review the challenges
          </a>
          <p className={styles.ctaSmall}>
            Virtual · 7:00 PM WAT · Joining link shared before the event
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
