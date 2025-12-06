'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { GlobeDemo } from '@/components/GlobeDemo'

export default function Portfolio() {
  useEffect(() => {
    // Hide default header on this page
    const header = document.querySelector('header')
    if (header) header.style.display = 'none'

    // Cleanup - show header again when leaving the page
    return () => {
      if (header) header.style.display = ''
    }
  }, [])

  return (
    <div className="min-h-screen bg-black" style={{ backgroundColor: '#000000' }}>
      {/* Custom black header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <nav className="flex items-center justify-end gap-8">
            <Link href="/" className="text-white hover:text-gray-300 transition">
              About Us
            </Link>
            <Link href="/discover" className="text-white hover:text-gray-300 transition">
              Services
            </Link>
            <Link href="/portfolio" className="text-white hover:text-gray-300 transition">
              Portfolio
            </Link>
            <Link href="/our-cause" className="text-white hover:text-gray-300 transition">
              Our Cause
            </Link>
          </nav>
        </div>
      </div>

      <div className="w-full bg-black pt-24">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-0 text-center">
          Portfolio
        </h1>

        <GlobeDemo />
      </div>
    </div>
  )
}
