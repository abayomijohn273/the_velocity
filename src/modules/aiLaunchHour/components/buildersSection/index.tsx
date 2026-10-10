import Image from 'next/image';
import demoImage from '../../../../../public/assets/images/ai-launch-hour/nigeria-builders-demo.jpg';
import pitchImage from '../../../../../public/assets/images/ai-launch-hour/nigeria-builders-pitch.jpg';
import workImage from '../../../../../public/assets/images/ai-launch-hour/nigeria-builders-work.jpg';
import styles from '../../styles.module.css';

const shots = [
  {
    image: pitchImage,
    alt: 'Nigerian technology team presenting a product solution on stage',
    variant: styles.builderShotPrimary,
    sizes: '(max-width: 760px) 100vw, (max-width: 1020px) 60vw, 770px',
    title: 'Make the problem visible.',
    caption: 'From user friction to a clear product story.',
    step: '01 / Define',
    accent: true,
  },
  {
    image: demoImage,
    alt: 'Nigerian product builder demonstrating a technology idea',
    variant: styles.builderShotDemo,
    sizes: '(max-width: 480px) 100vw, (max-width: 1020px) 50vw, 400px',
    title: 'Show the work.',
    caption: 'A useful demo beats a complicated promise.',
    step: '02 / Demo',
  },
  {
    image: workImage,
    alt: 'Nigerian technology participants collaborating around laptops',
    variant: styles.builderShotWork,
    sizes: '(max-width: 480px) 100vw, (max-width: 1020px) 50vw, 400px',
    title: 'Build together.',
    caption: 'Human judgement stays in the loop.',
    step: '03 / Ship',
  },
];

const BuildersSection = () => {
  return (
    <section className={styles.builders} id="builders">
      <div className={styles.shell}>
        <div className={styles.builderIntro}>
          <div>
            <div className={styles.eyebrow}>Built by people</div>
            <h2>
              Nigerian builders.
              <br />
              Real products.
              <br />
              One fast hour.
            </h2>
          </div>
          <div className={styles.builderCopy}>
            <p>
              This is a human-led build sprint. Product thinkers, designers, developers, and
              operators use AI as leverage—then apply their own judgement to decide what deserves to
              ship.
            </p>
            <div className={styles.humanProof} aria-label="Human-led, AI-assisted approach">
              <span>
                <strong>90% human</strong>
                <br />
                Context, craft, decisions, responsibility
              </span>
              <b>10% AI</b>
            </div>
          </div>
        </div>

        <div className={styles.builderMosaic}>
          {shots.map((shot) => (
            <figure key={shot.step} className={`${styles.builderShot} ${shot.variant}`}>
              <Image src={shot.image} alt={shot.alt} sizes={shot.sizes} />
              {shot.accent && <span className={styles.aiAccent}>AI accelerates</span>}
              <figcaption className={styles.builderCaption}>
                <span>
                  <strong>{shot.title}</strong>
                  {shot.caption}
                </span>
                <b>{shot.step}</b>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildersSection;
