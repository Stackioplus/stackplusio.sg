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
        <p className="text-xl text-white text-center mt-4">
          We build for startups all over the world
        </p>

        {/* See More Button */}
        <div className="flex justify-center mt-8">
          <button className="ui-btn" onClick={(e) => {
            e.preventDefault();
            window.location.href = '/portfolio/projects';
          }}>
            <span>
              <span className="arrow-icon">→</span> See More
            </span>
          </button>
        </div>

        <style jsx>{`
          .gradient-text {
            background: linear-gradient(to right, #f89b29 0%, #ff0f7b 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .ui-btn {
            --btn-default-bg: #000000;
            --btn-padding: 15px 20px;
            --btn-hover-bg: #000000;
            --btn-transition: .3s;
            --btn-letter-spacing: .1rem;
            --btn-animation-duration: 1.2s;
            --btn-shadow-color: rgba(0, 0, 0, 0.5);
            --btn-shadow: 0 4px 20px 0 var(--btn-shadow-color);
            --hover-btn-color: #FAC921;
            --default-btn-color: #fff;
            --font-size: 16px;
            --font-weight: 600;
            --font-family: Menlo, Roboto Mono, monospace;
          }

          .ui-btn {
            box-sizing: border-box;
            padding: var(--btn-padding);
            display: flex;
            align-items: center;
            justify-content: center;
            font: var(--font-weight) var(--font-size) var(--font-family);
            background: var(--btn-default-bg);
            border: 2px solid #f89b29;
            cursor: pointer;
            transition: var(--btn-transition);
            overflow: hidden;
            box-shadow: var(--btn-shadow);
          }

          .ui-btn span {
            letter-spacing: var(--btn-letter-spacing);
            transition: var(--btn-transition);
            box-sizing: border-box;
            position: relative;
            background: linear-gradient(to right, #f89b29 0%, #ff0f7b 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .arrow-icon {
            font-size: 24px;
          }

          .ui-btn span::before {
            box-sizing: border-box;
            position: absolute;
            content: "";
            background: inherit;
          }

          .ui-btn:hover, .ui-btn:focus {
            background: var(--btn-hover-bg);
          }

          .ui-btn:hover span, .ui-btn:focus span {
            color: var(--hover-btn-color);
          }

          .ui-btn:hover span::before, .ui-btn:focus span::before {
            animation: chitchat linear both var(--btn-animation-duration);
          }

          @keyframes chitchat {
            0% { content: "#"; }
            5% { content: "."; }
            10% { content: "^{"; }
            15% { content: "-!"; }
            20% { content: "#$_"; }
            25% { content: "№:0"; }
            30% { content: "#{+."; }
            35% { content: "@}-?"; }
            40% { content: "?{4@%"; }
            45% { content: "=.,^!"; }
            50% { content: "?2@%"; }
            55% { content: "\\;1}]"; }
            60% { content: "?{%:%"; right: 0; }
            65% { content: "|{f[4"; right: 0; }
            70% { content: "{4%0%"; right: 0; }
            75% { content: "'1_0<"; right: 0; }
            80% { content: "{0%"; right: 0; }
            85% { content: "]>'"; right: 0; }
            90% { content: "4"; right: 0; }
            95% { content: "2"; right: 0; }
            100% { content: ""; right: 0; }
          }

        `}</style>

        <div className="h-screen relative">
          <GlobeDemo />
        </div>
      </div>

    </div>
  )
}
