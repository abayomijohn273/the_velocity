import styles from '../../styles.module.css';

const steps = [
  {
    time: '00–05',
    title: 'Choose',
    description: 'One user. One urgent problem. One useful outcome.',
  },
  {
    time: '05–12',
    title: 'Define',
    description: 'Write the problem and decide what success means.',
  },
  { time: '12–20', title: 'Design', description: 'Map the core flow and the role AI will play.' },
  {
    time: '20–42',
    title: 'Build',
    description: 'Make the critical path work. Ignore extra features.',
  },
  {
    time: '42–50',
    title: 'Test',
    description: 'Watch one person use it. Fix the biggest failure.',
  },
  { time: '50–60', title: 'Launch', description: 'Publish the link and prepare a 60-second demo.' },
];

const SprintSection = () => {
  return (
    <section className={`${styles.section} ${styles.sprint}`} id="sprint">
      <div className={styles.shell}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>The build clock</div>
            <h2>
              From problem to
              <br />
              product in 60.
            </h2>
          </div>
          <p>
            The clock is the constraint. Keep the scope narrow, make the main workflow real, and
            ship something another person can test.
          </p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step) => (
            <article key={step.time} className={styles.step}>
              <span className={styles.stepTime}>{step.time}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className={styles.sprintNote}>
          <span>Working link or live demo required.</span>
          <span>The showcase begins after the build window.</span>
        </div>
      </div>
    </section>
  );
};

export default SprintSection;
