import styles from '../../styles.module.css';
import Countdown from './countdown';

const eventFacts = [
  { label: 'Date', value: 'Saturday, Oct 24, 2026' },
  { label: 'Time', value: '7:00 PM WAT' },
  { label: 'Where', value: 'Live online' },
];

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.shell} ${styles.heroGrid}`}>
        <div>
          <div className={styles.eyebrow}>The Velocity presents · Virtual</div>
          <h1>
            AI Launch <span>Hour.</span>
          </h1>
          <p className={styles.heroLede}>
            Solve one real problem. Build one useful AI automation. Launch a working product in 60
            minutes.
          </p>
          <div className={styles.heroActions}>
            <a className={`${styles.button} ${styles.buttonLime}`} href="#challenges">
              Choose your challenge <span aria-hidden="true">↘</span>
            </a>
            <a className={`${styles.button} ${styles.buttonGhost}`} href="#sprint">
              See the 60-minute plan
            </a>
          </div>
          <div className={styles.eventStrip} aria-label="Event information">
            {eventFacts.map((fact) => (
              <div key={fact.label} className={styles.eventFact}>
                <span className={styles.label}>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.clockCard} aria-label="Event countdown">
          <div className={styles.sixty}>
            60<small>:00</small>
          </div>
          <div className={styles.progress} aria-hidden="true">
            <span />
          </div>
          <hr className={styles.clockRule} />
          <div className={styles.countdownLabel}>Until the build begins</div>
          <Countdown />
        </aside>
      </div>
    </section>
  );
};

export default HeroSection;
