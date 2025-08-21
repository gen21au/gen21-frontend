import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Includes/Header';
import Footer from '@/components/Includes/Footer';

export const metadata: Metadata = {
  title: 'About Us - GEN21',
  description: 'Learn more about our company and values',
};

export default function AboutPage() {
  return (
    <main>
    {/* Banner Section */}
    <section className="flex h-[400px] items-center justify-center bg-cover bg-center text-white" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/home-service.jpg')"}}>
        <div className="max-w-[800px] p-8 text-center">
            <h1 className="text-5xl mb-6 font-bold">About GEN21</h1>
            <p className="text-xl">Pioneering the future of digital solutions</p>
        </div>
    </section>

    {/* Content Sections */}
    <section className="py-16 px-8">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-16">
        <div className="p-8">
            <h2 className="text-4xl mb-6 font-semibold">Our Story</h2>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
        <Image 
            src="/service-thumb.png" 
            alt="Our story" 
            width={600}
            height={400}
            className="rounded-lg shadow-md"
        />
        </div>
    </section>

    <section className="bg-gray-100/30 py-16 px-8">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-16 flex-row-reverse">
        <div className="p-8">
            <h2 className="text-4xl mb-6 font-semibold">Our Mission</h2>
            <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
            in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
        <Image 
            src="/home-service.jpg" 
            alt="Our mission" 
            width={600}
            height={400}
            className="rounded-lg shadow-md"
        />
        </div>
    </section>
    </main>
  );
}
