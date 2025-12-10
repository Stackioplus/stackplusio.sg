'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Competitions() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const [isHeroInView, setIsHeroInView] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Hide default header on this page
    const header = document.querySelector('header')
    if (header) header.style.display = 'none'

    // Load Lottie script
    const lottieScript = document.createElement('script')
    lottieScript.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js'
    lottieScript.type = 'module'
    document.body.appendChild(lottieScript)

    // Intersection Observer for Hero section visibility
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHeroInView(entry.isIntersecting)
        })
      },
      {
        threshold: 0.3
      }
    )

    if (heroRef.current) {
      heroObserver.observe(heroRef.current)
    }

    return () => {
      if (header) header.style.display = ''
      heroObserver.disconnect()
      if (document.body.contains(lottieScript)) {
        document.body.removeChild(lottieScript)
      }
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(-45deg, #6366f1, #8b5cf6, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .golden-card {
          position: relative;
          overflow: hidden;
        }

        .golden-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(212, 175, 55, 0.3) 10deg,
            transparent 20deg,
            transparent 180deg,
            rgba(212, 175, 55, 0.3) 190deg,
            transparent 200deg
          );
          animation: ripple-rotate 4s linear infinite;
          z-index: 0;
        }

        .golden-card::after {
          content: '';
          position: absolute;
          inset: 2px;
          background: rgba(250, 250, 250, 0.98);
          border-radius: 14px;
          z-index: 1;
        }

        .golden-card > * {
          position: relative;
          z-index: 2;
        }

        @keyframes ripple-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes highlight {
          0% {
            background-size: 0% 100%;
          }
          100% {
            background-size: 100% 100%;
          }
        }

        .highlight-text {
          background: linear-gradient(90deg, rgba(249, 115, 22, 0.3) 100%, transparent 100%);
          background-position: left;
          background-repeat: no-repeat;
          background-size: 0% 100%;
          animation: highlight 0.8s ease forwards;
          padding: 0 2px;
          border-radius: 2px;
        }

        .highlight-delay-1 {
          animation-delay: 0.5s;
        }

        .highlight-delay-2 {
          animation-delay: 1s;
        }

        .highlight-delay-3 {
          animation-delay: 1.5s;
        }

        .highlight-delay-4 {
          animation-delay: 2s;
        }
      `}</style>

      {/* Custom Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-sm" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 md:py-3">
          <nav className="flex items-center justify-end gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <Link href="/" className="text-gray-300 hover:text-gray-100 transition text-xs sm:text-sm md:text-base">
              About Us
            </Link>
            <Link href="/discover" className="text-gray-300 hover:text-gray-100 transition text-xs sm:text-sm md:text-base">
              Services
            </Link>
            <Link href="/portfolio" className="text-gray-300 hover:text-gray-100 transition text-xs sm:text-sm md:text-base">
              Portfolio
            </Link>
            <Link href="/our-cause" className="text-gray-300 hover:text-gray-100 transition text-xs sm:text-sm md:text-base">
              Our Cause
            </Link>
            <Link href="/competitions" className="text-gray-300 hover:text-gray-100 transition text-xs sm:text-sm md:text-base">
              Competitions
            </Link>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mb-4">
            Stacker Compete
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stack+ presents Stacker Compete which aims to help startups build and launch fast.
          </p>
          <div className="flex justify-center">
            {/* @ts-ignore */}
            <dotlottie-wc
              src="https://lottie.host/224ba669-6c64-40f6-bb8f-92f182067607/IYkJGUJJXy.lottie"
              style={{ width: 'min(500px, 80vw)', height: 'min(500px, 80vw)' }}
              autoplay
              loop
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 text-white hover:opacity-80 transition"
            >
              <span className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="text-sm">Learn more</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={() => setShowModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Card */}
          <div
            className="golden-card rounded-2xl max-w-lg w-full p-4 sm:p-6 md:p-8 max-h-[85vh] overflow-y-auto mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-base sm:text-lg md:text-xl mb-4 text-center font-semibold" style={{ background: 'linear-gradient(-45deg, #f89b29, #ff0f7b)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Where Bold Founders Rise</h2>

            <p className="text-gray-800 mb-4 text-sm sm:text-base">
              This competition is built for founders who want to build fast and launch fast.
            </p>

            <p className="text-gray-800 mb-6 text-sm sm:text-base">
              All you need is a <span className="highlight-text highlight-delay-1">60-second video pitching your idea</span> plus a twist that shows your creativity under pressure. We're looking for <span className="highlight-text highlight-delay-2">sharp thinking, clear vision, and the ability to execute quickly</span>.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center" style={{ background: 'linear-gradient(-45deg, #f89b29, #ff0f7b)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Prize</h3>

            <ul className="text-gray-800 mb-6 space-y-2 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                <span>Winning team receives a <span className="highlight-text highlight-delay-3">4-week free MVP build package</span> worth $5,000 from Stack+</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                <span><span className="highlight-text highlight-delay-4">Direct referral and access</span> to US-based investors</span>
              </li>
            </ul>

            <div className="relative inline-flex items-center justify-center w-full group" style={{ zIndex: 10 }}>
              <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
              <Link
                href="/competitions/apply"
                className="group relative inline-flex items-center justify-center text-sm sm:text-base rounded-xl bg-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30 w-full"
              >
                Apply
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 10"
                  height="10"
                  width="10"
                  fill="none"
                  className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                >
                  <path
                    d="M0 5h7"
                    className="transition opacity-0 group-hover:opacity-100"
                  ></path>
                  <path
                    d="M1 1l4 4-4 4"
                    className="transition group-hover:translate-x-[3px]"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
