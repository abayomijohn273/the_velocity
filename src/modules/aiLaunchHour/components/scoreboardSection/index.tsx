import styles from '../../styles.module.css';

const scores = [
  { weight: '25%', criterion: 'Useful user outcome' },
  { weight: '25%', criterion: 'Working prototype' },
  { weight: '20%', criterion: 'Problem clarity' },
  { weight: '15%', criterion: 'Meaningful AI use' },
  { weight: '10%', criterion: 'Responsible design' },
  { weight: '05%', criterion: '60-second demo' },
];

const ScoreboardSection = () => {
  return (
    <section className={`${styles.section} ${styles.scoreboard}`} aria-labelledby="score-title">
      <div className={styles.shell}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>How products are scored</div>
            <h2 id="score-title">
              Useful beats
              <br />
              complicated.
            </h2>
          </div>
          <p>
            The strongest entry solves a real problem, works in front of the judges, and uses AI for
            a reason—not as decoration.
          </p>
        </div>
        <div className={styles.scoreGrid}>
          {scores.map((score) => (
            <div key={score.criterion} className={styles.score}>
              <strong>{score.weight}</strong>
              <span>{score.criterion}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScoreboardSection;
