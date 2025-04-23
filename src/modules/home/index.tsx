import Footer from '@/components/layouts/footer';
import AboutSection from './components/aboutSection';
import CommunitySection from './components/communitySection';
import CountriesSection from './components/countriesSection';
import FaqsSection from './components/faqsSection';
import TopSection from './components/topSection';
const Home = () => {
  return (
    <main className="min-h-screen">
      <TopSection />
      <CountriesSection />
      <AboutSection />
      <CommunitySection />
      <FaqsSection />
      <Footer />
    </main>
  );
};

export default Home;
