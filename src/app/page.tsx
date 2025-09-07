import type { Metadata } from 'next';
import HeroSlider from '../components/Home/HeroSlider'
import HowItWorks from '../components/Home/HowItWorks'
import ServiceCategoryCarousel from '../components/Home/ServiceCategoryCarousel'
import TrendingServices from '../components/Home/TrendingServices'
import FeaturesSection from '../components/Home/FeaturesSection'
import Testimonials from '../components/Home/Testimonials'
import AppDownloadSection from '../components/Home/AppDownloadSection'

export const metadata: Metadata = {
  title: "Welcome to GEN21: Bangladesh's Premier On-Demand Service Platform | GEN21",
  description: "GEN21 offers hassle-free access to essential services in Bangladesh. Explore our user-friendly app, connect with verified providers, and elevate your lifestyle with convenience at your fingertips",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSlider />
        <ServiceCategoryCarousel />
        <TrendingServices />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <AppDownloadSection />
      </main>
    </div>
  );
}
