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
              <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Gen21. All rights reserved.</p>
          <p className="mt-2">Dhaka, Bangladesh</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path fillRule="evenodd" d="M19.5 2.25a.75.75 0 00-.75.75v4.235L12 9.53V5.25a.75.75 0 00-.75-.75h-3.5a.75.75 0 00-.75.75v14.5a.75.75 0 00.75.75h3.5a.75.75 0 00.75-.75V14.53l6.75 3.045V19.5a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75V2.25a.75.75 0 00-.75-.75h-2.25zM12 12.53l-1.75-1.75V5.25h1.75v7.28z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C8.714 2 8.385 2.013 7.314 2.06c-.974.043-1.67.19-2.27.425-.6.235-1.09.56-1.59.99-.5.43-1.01.94-1.44 1.44-.43.5-.755 1-.99 1.59-.235.6-.382 1.296-.425 2.27-.047 1.07-.06 1.4-.06 4.5s.013 3.43.06 4.5c.043.974.19 1.67.425 2.27.235.6.56 1.09.99 1.59.43.5.94 1.01 1.44 1.44.5.43 1 .755 1.59.99.6.235 1.296.382 2.27.425 1.07.047 1.4.06 4.5.06s3.43-.013 4.5-.06c.974-.043 1.67-.19 2.27-.425.6-.235 1.09-.56 1.59-.99.5-.43 1.01-.94 1.44-1.44.43-.5.755-1 .99-1.59.235-.6.382-1.296.425-2.27.047-1.07.06-1.4.06-4.5s-.013-3.43-.06-4.5c-.043-.974-.19-1.67-.425-2.27-.235-.6-.56-1.09-.99-1.59-.43-.5-.94-1.01-1.44-1.44-.5-.43-1-.755-1.59-.99-.6-.235-1.296-.382-2.27-.425-1.07-.047-1.4-.06-4.5-.06zm0 2.18c3.28 0 3.68.013 4.7.058.95.04 1.45.17 1.78.3.33.13.57.29.78.5.21.21.37.45.5.78.13.33.26.83.3 1.78.045 1.02.058 1.42.058 4.7s-.013 3.68-.058 4.7c-.04.95-.17 1.45-.3 1.78-.13.33-.29.57-.5.78-.21.21-.45.37-.78.5-.33.13-.83.26-1.78.3-1.02.045-1.42.058-4.7.058s-3.68-.013-4.7-.058c-.95-.04-1.45-.17-1.78-.3-.33-.13-.57-.29-.78-.5-.21-.21-.37-.45-.5-.78-.13-.33-.26-.83-.3-1.78-.045-1.02-.058-1.42-.058-4.7s.013-3.68.058-4.7c.04-.95.17-1.45.3-1.78.13-.33.29-.57.5-.78.21-.21.45-.37.78-.5.33-.13.83-.26 1.78-.3C8.32 4.193 8.72 4.18 12 4.18zm0 3.63c-2.31 0-4.19 1.88-4.19 4.19s1.88 4.19 4.19 4.19 4.19-1.88 4.19-4.19-1.88-4.19-4.19-4.19zm0 2.18c1.105 0 2.01.905 2.01 2.01s-.905 2.01-2.01 2.01-2.01-.905-2.01-2.01.905-2.01 2.01-2.01zm6.82-4.58c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.23 3.067 7.72 7.08 8.49V14.5h-2.5V12h2.5V9.75c0-2.485 1.507-3.868 3.777-3.868 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
