import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found - GEN21',
  icons: {
    icon: '/favicon.png',
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 relative flex items-center justify-center bg-cover bg-center text-white p-8 md:pt-16" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/404-error.png')"}}>
        <div className='text-center'>
          <h1 className="text-9xl font-bold mb-4 errorFront">404</h1>
          <h2 className="text-4xl mb-8">Page Not Found</h2>
          <p className="max-w-prose mx-auto mb-8 text-lg">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link 
            href="/" 
            className="inline-block px-8 py-4 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:text-blue-700 hover:border-blue-700 transition-colors duration-200"
          >
            Return to Homepage
          </Link>
        </div>
      </section>
    </div>
  );
}
