import styles from '../../styles.module.css';

const rules = [
  'Build one core workflow for one clearly defined user.',
  'Create the competition entry during the official 60-minute sprint.',
  'Use public, synthetic, or explicitly approved data only.',
  'Disclose the AI models, tools, and starter templates used.',
  'Keep a human decision-maker in every high-impact workflow.',
  'Submit a working link or live demo plus one honest limitation.',
];

const RulesSection = () => {
  return (
    <section className={`${styles.section} ${styles.rules}`} id="rules">
      <div className={`${styles.shell} ${styles.rulesGrid}`}>
        <div>
          <div className={styles.eyebrow}>Ship responsibly</div>
          <h2>
            Six rules.
            <br />
            No ambiguity.
          </h2>
          <p className={styles.rulesIntro}>
            Move fast without losing trust. Every entry must be testable, transparent, and safe
            enough to demonstrate.
          </p>
        </div>
        <ol className={styles.ruleList}>
          {rules.map((rule, index) => (
            <li key={rule}>
              <b>{String(index + 1).padStart(2, '0')}</b>
              <span>{rule}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default RulesSection;
