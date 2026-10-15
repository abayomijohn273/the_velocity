import Image, { type StaticImageData } from 'next/image';
import abayomiPhoto from '../../../../../public/assets/images/ai-launch-hour/abayomi-olatunji.jpg';
import janinePhoto from '../../../../../public/assets/images/ai-launch-hour/judge-janine-anthony.jpg';
import lolaPhoto from '../../../../../public/assets/images/ai-launch-hour/judge-lola-oguntade.jpg';
import miltonPhoto from '../../../../../public/assets/images/ai-launch-hour/milton-tutu.webp';
import olubusolaPhoto from '../../../../../public/assets/images/ai-launch-hour/olubusola-ajala.jpg';
import oluwatobiPhoto from '../../../../../public/assets/images/ai-launch-hour/oluwatobi-oseni.jpg';
import michaelPhoto from '../../../../../public/assets/images/ai-launch-hour/profile-michael-ifechukwu-olu.jpg';
import oluwatimileyinPhoto from '../../../../../public/assets/images/ai-launch-hour/profile-oluwatimileyin-okusi.jpg';
import styles from '../../styles.module.css';

type Judge = {
  name: string;
  photo: StaticImageData;
  kicker: string;
  credentials?: string;
  role: string;
  profileUrl?: string;
};

const judges: Judge[] = [
  {
    name: 'Abayomi Olatunji',
    photo: abayomiPhoto,
    kicker: 'Technology & talent',
    role: 'CTO at Utiva and technology leader at Entrova, building AI-enabled learning and global talent infrastructure.',
    profileUrl:
      'https://techeconomy.ng/abayomi-olatunji-on-architecting-africas-bridge-between-local-tech-talent-and-global-opportunity',
  },
  {
    name: 'Milton Tutu',
    photo: miltonPhoto,
    kicker: 'Growth & systems',
    role: 'Chief Marketing Officer at Mainstack and founder of Blurpe, known for building growth and customer-acquisition systems.',
    profileUrl: 'https://moment.mainstack.com/speakers',
  },
  {
    name: 'Oluwatobi Oseni',
    photo: oluwatobiPhoto,
    kicker: 'Fintech & inclusion',
    role: 'Co-founder and CEO of Payshiga Technologies and a Global Shaper advancing digital equity and cross-border commerce.',
    profileUrl: 'https://www.weforum.org/people/oluwatobi-oseni/',
  },
  {
    name: 'Olubusola Ajala',
    photo: olubusolaPhoto,
    kicker: 'Law & business',
    role: 'Founder of LAWDEMY and Strictly Law Business, helping legal professionals build stronger, more profitable practices.',
    profileUrl: 'https://strictlylawbiz.com/community/',
  },
  {
    name: 'Lola Oguntade',
    photo: lolaPhoto,
    kicker: 'People & delivery',
    credentials: 'MSW · LMSW · PMP',
    role: 'Project manager and founder of New Spring Consult, bringing human-centered systems, wellbeing, and social impact into delivery.',
    profileUrl: 'https://www.linkedin.com/in/lola-oguntade-msw-lmsw-pmp-114712139',
  },
  {
    name: 'Janine Anthony',
    photo: janinePhoto,
    kicker: 'Media & innovation',
    role: 'Award-winning broadcaster and commercial partnerships executive working at the intersection of sports, technology, and media.',
    profileUrl: 'https://www.linkedin.com/in/janineanthony/',
  },
  {
    name: 'Michael Ifechukwu Olu',
    photo: michaelPhoto,
    kicker: 'Data science',
    role: 'Data Scientist assessing how teams turn data into practical insights, measurable decisions, and useful products.',
  },
  {
    name: 'Oluwatimileyin Okusi',
    photo: oluwatimileyinPhoto,
    kicker: 'Applied AI & data',
    role: 'AI Engineer and Data Scientist evaluating intelligent systems built for focused, real-world problems.',
  },
];

const JudgesSection = () => {
  return (
    <section className={`${styles.section} ${styles.judges}`} id="judges">
      <div className={styles.shell}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>Meet the judges</div>
            <h2>
              Built for impact.
              <br />
              Judged by builders.
            </h2>
          </div>
          <p>
            Technology, product, data, growth, inclusive innovation, human-centered delivery,
            business strategy, and media innovation—eight perspectives deciding which product
            deserves to move forward.
          </p>
        </div>

        <div className={styles.judgeGrid}>
          {judges.map((judge) => (
            <article key={judge.name} className={styles.judgeCard}>
              <div className={styles.judgePhoto}>
                <Image
                  src={judge.photo}
                  alt={judge.name}
                  sizes="(max-width: 480px) 100vw, (max-width: 760px) 42vw, (max-width: 1020px) 50vw, 390px"
                />
              </div>
              <div className={styles.judgeBody}>
                <span className={styles.judgeKicker}>{judge.kicker}</span>
                <h3>{judge.name}</h3>
                {judge.credentials && (
                  <p className={styles.judgeCredentials}>{judge.credentials}</p>
                )}
                <p className={styles.judgeRole}>{judge.role}</p>
                {judge.profileUrl && (
                  <a
                    className={styles.profileLink}
                    href={judge.profileUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    View profile <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JudgesSection;
