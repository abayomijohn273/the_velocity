import type { CSSProperties } from 'react';
import BuildersSection from './components/buildersSection';
import ChallengesSection from './components/challengesSection';
import FinalCtaSection from './components/finalCtaSection';
import Footer from './components/footer';
import HeroSection from './components/heroSection';
import JudgesSection from './components/judgesSection';
import PartnersSection from './components/partnersSection';
import RulesSection from './components/rulesSection';
import ScoreboardSection from './components/scoreboardSection';
import SprintSection from './components/sprintSection';
import Ticker from './components/ticker';
import Topbar from './components/topbar';
import { dmMono, manrope } from './fonts';
import styles from './styles.module.css';

// next/font's family list ends with a metric-adjusted Arial fallback face, so glyphs these
// fonts lack (arrows like "→") would render in Arial. Expose only the primary family so
// those glyphs fall through to the platform fonts, as on the original event page.
const primaryFamily = (font: { style: { fontFamily: string } }) =>
  font.style.fontFamily.split(',')[0];

const fontVariables = {
  '--font-manrope': primaryFamily(manrope),
  '--font-dm-mono': primaryFamily(dmMono),
} as CSSProperties;

const AiLaunchHour = () => {
  return (
    <div className={styles.page} style={fontVariables}>
      <Topbar />
      <main id="top">
        <HeroSection />
        <Ticker />
        <BuildersSection />
        <PartnersSection />
        <ChallengesSection />
        <SprintSection />
        <JudgesSection />
        <ScoreboardSection />
        <RulesSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default AiLaunchHour;
