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
      <style jsx>{`
        .menu-dropdown {
          list-style: none;
        }

        .submenu-link {
          display: block;
          padding: 12px 24px;
          width: 100%;
          position: relative;
          text-align: center;
          transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .submenu-link::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          transform: scaleX(0);
          width: 100%;
          height: 100%;
          background: linear-gradient(-45deg, #f89b29, #ff0f7b);
          z-index: -1;
          transform-origin: left;
          transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .submenu-link:hover::before {
          transform: scaleX(1);
          transform-origin: right;
        }

        .submenu-link:hover {
          color: #ffffff;
        }
      `}</style>

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
              className="flex items-center gap-2 text-gray-300 hover:text-white px-4 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 transition"
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
            <ul
              className={`menu-dropdown absolute right-0 top-full mt-1 w-48 bg-black rounded-b-2xl border border-gray-700 overflow-hidden transition-all duration-300 ${
                isMenuOpen
                  ? 'opacity-100 visible translate-y-0 border-t-0'
                  : 'opacity-0 invisible -translate-y-3 pointer-events-none'
              }`}
              style={{ borderTop: isMenuOpen ? 'none' : undefined }}
            >
              <li>
                <Link
                  href="/"
                  className="submenu-link text-gray-300 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/discover"
                  className="submenu-link text-gray-300 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="submenu-link text-gray-300 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/our-cause"
                  className="submenu-link text-gray-300 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Cause
                </Link>
              </li>
              <li>
                <Link
                  href="/competitions"
                  className="submenu-link text-gray-300 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Competitions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
