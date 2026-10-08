import styles from '../../styles.module.css';

const challenges = [
  {
    num: '01',
    area: 'Career access',
    tag: 'Discover → Match',
    title: 'Opportunity discovery is noisy and exhausting.',
    description:
      'Global talent loses hours searching scattered job boards, checking eligibility, and deciding which roles are worth pursuing.',
    target:
      'An automation that finds, filters, explains, and prioritises relevant opportunities for one user profile.',
  },
  {
    num: '02',
    area: 'Proof of skill',
    tag: 'Evidence → Story',
    title: 'Strong work is often hidden inside weak portfolios.',
    description:
      'Talented people struggle to turn projects, outcomes, and scattered evidence into credible stories that employers can quickly understand.',
    target:
      'An automation that turns verified project evidence into a sharp portfolio case study without inventing claims.',
  },
  {
    num: '03',
    area: 'Inclusive hiring',
    tag: 'Review → Shortlist',
    title: 'Hiring teams spend too long screening—and still miss talent.',
    description:
      'Manual reviews are slow, inconsistent, and vulnerable to surface-level signals that do not predict whether someone can do the work.',
    target:
      'A transparent, skills-based review workflow with clear criteria, evidence links, and human approval.',
  },
  {
    num: '04',
    area: 'Distributed work',
    tag: 'Signal → Action',
    title: 'Remote teams lose decisions between meetings and time zones.',
    description:
      'Updates, action items, risks, and handoffs get buried across calls, messages, and documents—slowing execution.',
    target:
      'An automation that converts messy team signals into owned actions, deadlines, and a useful async update.',
  },
];

const ChallengesSection = () => {
  return (
    <section className={`${styles.section} ${styles.challenges}`} id="challenges">
      <div className={styles.shell}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>The automation briefs</div>
            <h2>
              Pick one friction.
              <br />
              Automate it.
            </h2>
          </div>
          <p>
            Choose a focused problem where AI can remove repetitive work, widen access, or help
            someone make a better decision. Build only the most valuable workflow.
          </p>
        </div>

        <div className={styles.challengeGrid}>
          {challenges.map((challenge) => (
            <article key={challenge.num} className={styles.challenge} data-num={challenge.num}>
              <div className={styles.challengeTop}>
                <span className={styles.challengeNo}>
                  {challenge.num} / {challenge.area}
                </span>
                <span className={styles.tag}>{challenge.tag}</span>
              </div>
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
              <div className={styles.buildTarget}>
                <b>Build target:</b> {challenge.target}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
