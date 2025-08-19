'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import SearchInput from '@/components/Home/SearchInput';
import debounce from 'lodash.debounce';

export default function Header() {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(pathname !== '/');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (pathname === '/') {
      heroSectionRef.current = document.getElementById('hero-section');
      const handleScroll = debounce(() => {
        if (heroSectionRef.current) {
          const heroBottom = heroSectionRef.current.getBoundingClientRect().bottom;
          setShowSearch(heroBottom <= 100); // Show search when hero bottom reaches 100px from top
        }
      }, 100);

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    const debouncedScroll = debounce(handleScroll, 20);
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            <Image src="/logo.png" width={148} height={38} alt="Gen21 Logo" />
          </Link>

<div className={`flex-1 max-w-xl mx-8 hidden md:block transition-all duration-300 ${
  pathname !== '/' ? 'opacity-100 translate-y-0' : (showSearch ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2')
}`}>
            <SearchInput />
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/services" className="text-gray-600 hover:text-gray-900">
              Services
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
              How It Works
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
          
          {/* User avatar dropdown */}
          <div className="relative ml-4" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <img 
                src="/avatar.png" 
                alt="User account" 
                className="w-10 h-10 rounded-full border-2 border-gray-200"
              />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                <Link href="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  My Account
                </Link>
                <Link href="/change-password" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Change Password
                </Link>
                <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Dashboard
                </Link>
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  My Profile
                </Link>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
          </div>

          <button className="md:hidden p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Search Input - Show always on non-home pages, show on home page after scroll */}
    </header>
  );
}
