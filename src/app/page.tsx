import Header from '../components/Header'
import HeroSlider from '../components/HeroSlider'
import ServiceCategoryCarousel from '../components/ServiceCategoryCarousel'
import FeaturesSection from '../components/FeaturesSection'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSlider />
        <ServiceCategoryCarousel />
        <FeaturesSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
