import Image from 'next/image';
import Logo from '../../../../../public/assets/images/webp/logo.webp';
import { CALENDAR_FILE } from '../../constants';
import styles from '../../styles.module.css';

const navLinks = [
  { href: '#builders', label: 'Builders' },
  { href: '#challenges', label: 'Challenges' },
  { href: '#sprint', label: 'The sprint' },
  { href: '#judges', label: 'Judges' },
];

const Topbar = () => {
  return (
    <header className={styles.topbar}>
      <nav className={`${styles.nav} ${styles.shell}`} aria-label="Main navigation">
        <a className={styles.brand} href="#top" aria-label="The Velocity AI Launch Hour home">
          <Image src={Logo} alt="The Velocity" sizes="180px" priority />
        </a>
        <div className={styles.navlinks}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <a className={`${styles.button} ${styles.buttonLime}`} href={CALENDAR_FILE} download>
          Add to calendar
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 4v12m0 0-4-4m4 4 4-4M5 20h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </nav>
    </header>
  );
};

export default Topbar;
