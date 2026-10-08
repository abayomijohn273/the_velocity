import Image from 'next/image';
import entrovaLogo from '../../../../../public/assets/images/ai-launch-hour/partner-entrova.svg';
import googleLogo from '../../../../../public/assets/images/ai-launch-hour/partner-google-for-startups.jpg';
import nitdaLogo from '../../../../../public/assets/images/ai-launch-hour/partner-nitda.png';
import techstarsLogo from '../../../../../public/assets/images/ai-launch-hour/partner-techstars.png';
import axiaLogo from '../../../../../public/assets/images/ai-launch-hour/talent-axia-africa.svg';
import prodevsLogo from '../../../../../public/assets/images/ai-launch-hour/talent-prodevs.png';
import styles from '../../styles.module.css';

const partners = [
  { image: googleLogo, alt: 'Google for Startups', variant: styles.partnerLogoGoogle },
  {
    image: nitdaLogo,
    alt: 'National Information Technology Development Agency, NITDA',
    variant: styles.partnerLogoNitda,
  },
  { image: techstarsLogo, alt: 'Techstars', variant: styles.partnerLogoTechstars },
  { image: entrovaLogo, alt: 'Entrova', variant: styles.partnerLogoEntrova },
];

const talentPartners = [
  { image: axiaLogo, alt: 'Axia Africa', variant: styles.talentLogoAxia },
  { image: prodevsLogo, alt: 'ProDevs', variant: styles.talentLogoProdevs },
];

const PartnersSection = () => {
  return (
    <section className={styles.partners} id="partners" aria-labelledby="partners-title">
      <div className={styles.shell}>
        <div className={styles.partnerHead}>
          <div className={styles.eyebrow}>Ecosystem support</div>
          <h2 id="partners-title">In Partnership With:</h2>
          <p>
            Backing the people, platforms, and pathways that help African technology products move
            from idea to impact.
          </p>
        </div>
        <div className={styles.partnerLogos} aria-label="Event partners">
          {partners.map((partner) => (
            <div key={partner.alt} className={`${styles.partnerLogo} ${partner.variant}`}>
              <Image src={partner.image} alt={partner.alt} sizes="240px" />
            </div>
          ))}
        </div>
        <div className={styles.talentPartners} aria-labelledby="talent-partners-title">
          <h3 id="talent-partners-title">Talent Partners:</h3>
          <p>
            Connecting the sprint to training, product talent, and opportunities across the African
            technology ecosystem.
          </p>
          <div className={styles.talentLogos} aria-label="Talent partners">
            {talentPartners.map((partner) => (
              <div
                key={partner.alt}
                className={`${styles.partnerLogo} ${styles.talentLogo} ${partner.variant}`}
              >
                <Image src={partner.image} alt={partner.alt} sizes="240px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
