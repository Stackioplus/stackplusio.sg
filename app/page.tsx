'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [animateBreak, setAnimateBreak] = useState(false)

  useEffect(() => {
    // Set mounted to true on client side
    setMounted(true)

    // Hide header and footer on homepage
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const main = document.querySelector('main')

    if (header) header.style.display = 'none'
    if (footer) footer.style.display = 'none'
    if (main) {
      main.style.margin = '0'
      main.style.padding = '0'
    }

    // Trigger the break animation after 2 seconds
    const breakTimer = setTimeout(() => {
      setAnimateBreak(true)
    }, 2000)

    // Hide splash screen after animation completes
    const hideTimer = setTimeout(() => {
      setShowSplash(false)
    }, 3500)

    // Cleanup - show them again when leaving the page
    return () => {
      if (header) header.style.display = ''
      if (footer) footer.style.display = ''
      if (main) {
        main.style.margin = ''
        main.style.padding = ''
      }
      clearTimeout(breakTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0" style={{ backgroundColor: '#000000' }}>
      {/* Animated Splash Screen */}
      {mounted && showSplash && (
        <>
          <style jsx>{`
            @keyframes shatter {
              0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: var(--tx) var(--ty) rotate(var(--rotation));
                opacity: 0;
              }
            }

            @keyframes growText {
              0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.3);
              }
              50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.2);
              }
              100% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
              }
            }

            .splash-container {
              position: fixed;
              inset: 0;
              z-index: 9999;
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              grid-template-rows: repeat(4, 1fr);
              background: white;
            }

            .splash-piece {
              background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
              border: 1px solid rgba(0, 0, 0, 0.05);
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .splash-piece.animate {
              animation: shatter 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            }

            .splash-text {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 10000;
              text-align: center;
              animation: growText 1.5s ease-out forwards;
            }

            .splash-text.fade-out {
              animation: fadeOutWithBreak 1.5s ease-out forwards;
            }

            @keyframes fadeOutWithBreak {
              0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
              }
              100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1.5);
              }
            }

            .gradient-text-splash {
              background: linear-gradient(-45deg, #f89b29, #ff0f7b);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              font-size: 3.5rem;
              font-weight: 800;
              line-height: 1.2;
            }

            @media (max-width: 768px) {
              .splash-container {
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 1fr);
              }
              .gradient-text-splash {
                font-size: 2rem;
              }
            }
          `}</style>

          <div className={`splash-text ${animateBreak ? 'fade-out' : ''}`}>
            <h1 className="gradient-text-splash">
              Get your full stack<br />developer for $599
            </h1>
          </div>

          <div className="splash-container">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`splash-piece ${animateBreak ? 'animate' : ''}`}
                style={{
                  '--tx': `translateX(${(Math.random() - 0.5) * 2000}px)`,
                  '--ty': `translateY(${(Math.random() - 0.5) * 2000}px)`,
                  '--rotation': `${(Math.random() - 0.5) * 720}deg`,
                  animationDelay: `${i * 0.05}s`
                } as React.CSSProperties}
              />
            ))}
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-end">
          <nav className="flex items-center gap-8">
            <a href="/discover" className="text-white hover:text-gray-300 transition text-base">Services</a>
            <a href="/portfolio" className="text-white hover:text-gray-300 transition text-base">Portfolio</a>
            <a href="/our-cause" className="text-white hover:text-gray-300 transition text-base">Our Cause</a>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center h-full px-4">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            Building teams that build the future
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light mb-12">
            We connect startups with exceptional developers: on demand, fully integrated, and ready to ship from day one.
          </p>
          <Link href="/discover">
            <button className="btn" style={{ position: 'relative', zIndex: 10 }}>Let's Roll →</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
