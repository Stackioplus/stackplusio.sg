'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function DarkNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 md:py-3">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-end gap-4 md:gap-6 lg:gap-8">
          <Link href="/" className="text-gray-300 hover:text-gray-100 transition text-sm md:text-base">
            About Us
          </Link>
          <Link href="/discover" className="text-gray-300 hover:text-gray-100 transition text-sm md:text-base">
            Services
          </Link>
          <Link href="/portfolio" className="text-gray-300 hover:text-gray-100 transition text-sm md:text-base">
            Portfolio
          </Link>
          <Link href="/our-cause" className="text-gray-300 hover:text-gray-100 transition text-sm md:text-base">
            Our Cause
          </Link>
          <Link href="/competitions" className="text-gray-300 hover:text-gray-100 transition text-sm md:text-base">
            Competitions
          </Link>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div className="md:hidden flex justify-end" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
            >
              <span className="text-sm font-medium">Menu</span>
              <svg
                className={`h-4 w-4 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Panel */}
            <div
              className={`absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${
                isMenuOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
              style={{
                background: 'linear-gradient(135deg, rgba(30,30,30,0.98) 0%, rgba(20,20,20,0.98) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <Link
                href="/"
                className="block px-5 py-3 text-gray-200 text-sm hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 hover:text-white transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/discover"
                className="block px-5 py-3 text-gray-200 text-sm hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 hover:text-white transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className="block px-5 py-3 text-gray-200 text-sm hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 hover:text-white transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/our-cause"
                className="block px-5 py-3 text-gray-200 text-sm hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 hover:text-white transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Cause
              </Link>
              <Link
                href="/competitions"
                className="block px-5 py-3 text-gray-200 text-sm hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 hover:text-white transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Competitions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
