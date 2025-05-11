'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">About HomeShare</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Find and share homes around the world. Connect with hosts and guests in a trusted community.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors duration-200 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors duration-200 inline-block">
                  Listings
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors duration-200 inline-block">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors duration-200 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors duration-200 inline-block">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300 text-sm sm:text-base">&copy; {new Date().getFullYear()} HomeShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}