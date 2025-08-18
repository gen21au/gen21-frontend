import Header from '../components/Includes/Header'
import HeroSlider from '../components/Home/HeroSlider'
import HowItWorks from '../components/Home/HowItWorks'
import ServiceCategoryCarousel from '../components/Home/ServiceCategoryCarousel'
import TrendingServices from '../components/Home/TrendingServices'
import FeaturesSection from '../components/Home/FeaturesSection'
import Testimonials from '../components/Home/Testimonials'
import AppDownloadSection from '../components/Home/AppDownloadSection'
import Footer from '../components/Includes/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSlider />
        <ServiceCategoryCarousel />
        <TrendingServices />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <AppDownloadSection />
      </main>
      <Footer />
    </div>
  );
}
