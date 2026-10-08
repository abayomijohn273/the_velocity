import Image from 'next/image';
import Logo from '../../../../../public/assets/images/webp/logo.webp';
import styles from '../../styles.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.shell} ${styles.footerRow}`}>
        <a className={styles.footerBrand} href="#top">
          <Image src={Logo} alt="The Velocity" sizes="145px" />
        </a>
        <p>AI Launch Hour · October 24, 2026 · Virtual</p>
        <p>Judge information linked to public professional profiles.</p>
      </div>
    </footer>
  );
};

export default Footer;
