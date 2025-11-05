import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="Gen21 Logo" className="h-8 mr-2" />
            </div>
            <p className="text-gray-400">Your trusted partner for home services in Bangladesh</p>
            <p className="text-gray-400 text-sm mt-2">Version: 2.3.06</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/plumbing" className="text-gray-400 hover:text-white">Plumbing</Link></li>
              <li><Link href="/electrical" className="text-gray-400 hover:text-white">Electrical</Link></li>
              <li><Link href="/cleaning" className="text-gray-400 hover:text-white">Cleaning</Link></li>
              <li><Link href="/ac-repair" className="text-gray-400 hover:text-white">AC Repair</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/blogs" className="text-gray-400 hover:text-white">Blog</Link></li>
              {/* <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li> */}
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link href="/become-partner" className="text-yellow-400 hover:text-yellow-300 font-semibold">Become a Partner</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms-conditions" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Gen21. All rights reserved.</p>
          <p className="mt-2">Dhaka, Bangladesh</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://www.facebook.com/gen21.au" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://youtube.com/@Gen21au" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.604.246-4.873 1.544-4.873 5.17v5.907c0 3.403 1.29 4.93 4.873 5.17 3.6.245 11.626.246 15.23 0 3.604-.245 4.873-1.544 4.873-5.17V8.353c0-3.403-1.29-4.93-4.873-5.17zm-10.615 12.86v-8.65l8 4.353-8 4.297z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/gen21.au" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://www.x.com/gen21.au" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
