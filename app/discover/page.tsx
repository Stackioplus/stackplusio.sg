'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Discover() {
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
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <style jsx>{`
        .pricing-card {
          width: 350px;
          background: white;
          border-radius: 18px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .pricing-card-popular {
          width: 350px;
          background: white;
          border-radius: 18px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 3px solid transparent;
          background-image: linear-gradient(white, white), linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          position: relative;
        }

        .pricing-card-popular:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(255, 15, 123, 0.3);
        }

        .popular-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100%);
          color: white;
          padding: 8px 24px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(255, 15, 123, 0.4);
        }

        .tier-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          color: #ff0f7b;
          background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
        }

        .tier-name {
          font-size: 40px;
          font-weight: 700;
          color: #000;
          margin-bottom: 15px;
        }

        .tier-description {
          font-size: 18px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          min-height: 100px;
        }

        .tier-price {
          font-size: 32px;
          font-weight: 600;
          color: #000;
          margin-bottom: 30px;
        }

        .tier-price span {
          font-size: 16px;
          color: #666;
        }

        .btn-learn-more {
          width: 9em;
          height: 3em;
          border-radius: 30em;
          font-size: 15px;
          font-family: inherit;
          border: none;
          position: relative;
          overflow: hidden;
          z-index: 1;
          box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
          cursor: pointer;
        }

        .btn-learn-more::before {
          content: '';
          width: 0;
          height: 3em;
          border-radius: 30em;
          position: absolute;
          top: 0;
          left: 0;
          background-image: linear-gradient(to right, #f89b29 0%, #ff0f7b 100%);
          transition: .5s ease;
          display: block;
          z-index: -1;
        }

        .btn-learn-more:hover::before {
          width: 9em;
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .fade-in-left {
          animation: fadeInLeft 1s ease-out;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .gradient-text {
          background: linear-gradient(-45deg, #f89b29, #ff0f7b, #f89b29, #ff0f7b);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>

      {/* Custom Navigation without logo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <nav className="flex items-center justify-end gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              About Us
            </Link>
            <Link href="/discover" className="text-gray-700 hover:text-primary-600 transition">
              Services
            </Link>
            <Link href="/portfolio" className="text-gray-700 hover:text-primary-600 transition">
              Portfolio
            </Link>
            <Link href="/our-cause" className="text-gray-700 hover:text-primary-600 transition">
              Our Cause
            </Link>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="pt-32 pb-20">
        <h1 className="text-5xl md:text-6xl font-bold text-black text-center mb-16 px-4">
          Our Services
        </h1>

        {/* Full width black container with cards */}
        <div className="w-full bg-black py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-8">
              Lease Developers
            </h2>

            {/* Free Trial text */}
            <div className="text-center mb-16">
              <p className="text-xl md:text-2xl text-white">
                Get <span className="gradient-text">One Week</span> Free Trial With A Stacker
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
            {/* Card 1 - Tier 1 */}
            <div className="pricing-card">
              <div className="tier-badge">Junior Developer</div>
              <h3 className="tier-name">Tier 1</h3>
              <div className="tier-description">
                Perfect for startups. Get a junior developer (0 - 2 project experiences ) with fresh perspective and enthusiasm.
              </div>
              <div className="tier-price">
                $599 <span>per month</span>
              </div>
              <div>
                <button className="btn-learn-more">Select</button>
              </div>
            </div>

            {/* Card 2 - Tier 2 */}
            <div className="pricing-card-popular">
              <div className="popular-badge">Most Popular</div>
              <div className="tier-badge">Senior Developer</div>
              <h3 className="tier-name">Tier 2</h3>
              <div className="tier-description">
                Serious performance with senior developer experience (5+ project experience)
              </div>
              <div className="tier-price">
                $799 <span>per month</span>
              </div>
              <div>
                <button className="btn-learn-more">Select</button>
              </div>
            </div>

            {/* Card 3 - Tier 3 */}
            <div className="pricing-card">
              <div className="tier-badge">Enterprise</div>
              <h3 className="tier-name">Tier 3</h3>
              <div className="tier-description">
                The ultimate experience with senior developer and IT consultant (7 years experience) with strategic guidance.
              </div>
              <div className="tier-price">
                $1500 <span>per month</span>
              </div>
              <div>
                <button className="btn-learn-more">Select</button>
              </div>
            </div>

            {/* Cancel Anytime text */}
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm">Cancel Anytime</p>
            </div>
          </div>
          </div>
        </div>

        {/* Project Management Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-black text-center mb-16">
              Project Management
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-12 fade-in-left">
              {/* Image on the left */}
              <div className="flex-1">
                <Image
                  src="/project-management.png"
                  alt="Project Management"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Description on the right */}
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-black mb-6">
                  You choose, We build
                </h3>
                <ul className="space-y-4 mb-8">
                  <li className="text-lg text-gray-700 flex items-center">
                    <span className="mr-3 text-2xl">✓</span>
                    Planning & Setup
                  </li>
                  <li className="text-lg text-gray-700 flex items-center">
                    <span className="mr-3 text-2xl">✓</span>
                    Execution
                  </li>
                  <li className="text-lg text-gray-700 flex items-center">
                    <span className="mr-3 text-2xl">✓</span>
                    Review & Feedback
                  </li>
                  <li className="text-lg text-gray-700 flex items-center">
                    <span className="mr-3 text-2xl">✓</span>
                    Delivery & Closeout
                  </li>
                </ul>
                <button className="btn-learn-more">Get a Quote</button>
              </div>
            </div>
          </div>
        </section>

        {/* Pixel To Production Section */}
        <section className="py-20 px-4 bg-black">
          <style>{`
            .loader-wrapper {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 300px;
              height: 300px;
              font-family: "Inter", sans-serif;
              font-size: 1.5em;
              font-weight: 300;
              color: white;
              border-radius: 50%;
              background-color: transparent;
              user-select: none;
              margin: 0 auto;
            }

            .loader {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              aspect-ratio: 1 / 1;
              border-radius: 50%;
              background-color: transparent;
              animation: loader-rotate 2s linear infinite;
              z-index: 0;
            }

            @keyframes loader-rotate {
              0% {
                transform: rotate(90deg);
                box-shadow:
                  0 10px 20px 0 #fff inset,
                  0 20px 30px 0 #ad5fff inset,
                  0 60px 60px 0 #471eec inset;
              }
              50% {
                transform: rotate(270deg);
                box-shadow:
                  0 10px 20px 0 #fff inset,
                  0 20px 10px 0 #d60a47 inset,
                  0 40px 60px 0 #311e80 inset;
              }
              100% {
                transform: rotate(450deg);
                box-shadow:
                  0 10px 20px 0 #fff inset,
                  0 20px 30px 0 #ad5fff inset,
                  0 60px 60px 0 #471eec inset;
              }
            }

            .loader-letter {
              display: inline-block;
              opacity: 0.4;
              transform: translateY(0);
              animation: loader-letter-anim 2s infinite;
              z-index: 1;
              border-radius: 50ch;
              border: none;
            }

            .loader-letter:nth-child(1) {
              animation-delay: 0s;
            }
            .loader-letter:nth-child(2) {
              animation-delay: 0.1s;
            }
            .loader-letter:nth-child(3) {
              animation-delay: 0.2s;
            }
            .loader-letter:nth-child(4) {
              animation-delay: 0.3s;
            }
            .loader-letter:nth-child(5) {
              animation-delay: 0.4s;
            }
            .loader-letter:nth-child(6) {
              animation-delay: 0.5s;
            }
            .loader-letter:nth-child(7) {
              animation-delay: 0.6s;
            }
            .loader-letter:nth-child(8) {
              animation-delay: 0.7s;
            }
            .loader-letter:nth-child(9) {
              animation-delay: 0.8s;
            }
            .loader-letter:nth-child(10) {
              animation-delay: 0.9s;
            }

            @keyframes loader-letter-anim {
              0%,
              100% {
                opacity: 0.4;
                transform: translateY(0);
              }
              20% {
                opacity: 1;
                transform: scale(1.15);
              }
              40% {
                opacity: 0.7;
                transform: translateY(0);
              }
            }

            .btn-pixel-to-prod {
              width: 9em;
              height: 3em;
              border-radius: 30em;
              font-size: 15px;
              font-family: inherit;
              border: none;
              background: white;
              color: black;
              position: relative;
              overflow: hidden;
              z-index: 1;
              cursor: pointer;
              transition: color 0.3s ease;
            }

            .btn-pixel-to-prod::before {
              content: '';
              width: 0;
              height: 3em;
              border-radius: 30em;
              position: absolute;
              top: 0;
              left: 0;
              background: linear-gradient(to right, #f89b29 0%, #ff6b35 100%);
              transition: .5s ease;
              display: block;
              z-index: -1;
            }

            .btn-pixel-to-prod:hover {
              color: white;
            }

            .btn-pixel-to-prod:hover::before {
              width: 9em;
            }
          `}</style>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 fade-in-left">
              {/* Animated Loader on the right */}
              <div className="flex-1 flex items-center justify-center">
                <div className="loader-wrapper">
                  <div className="loader"></div>
                  <span className="loader-letter">G</span>
                  <span className="loader-letter">E</span>
                  <span className="loader-letter">N</span>
                  <span className="loader-letter">E</span>
                  <span className="loader-letter">R</span>
                  <span className="loader-letter">A</span>
                  <span className="loader-letter">T</span>
                  <span className="loader-letter">I</span>
                  <span className="loader-letter">N</span>
                  <span className="loader-letter">G</span>
                </div>
              </div>

              {/* Description on the left */}
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Pixel To Production
                </h3>
                <p className="text-xl text-gray-300 mb-6">
                  Transform your Figma and Lovable designs into fully functional Full Stack Applications
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-2xl">✓</span>
                    Figma to Code Conversion
                  </li>
                  <li className="text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-2xl">✓</span>
                    Lovable Design Integration
                  </li>
                  <li className="text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-2xl">✓</span>
                    Full Stack Development
                  </li>
                  <li className="text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-2xl">✓</span>
                    Responsive & Production-Ready
                  </li>
                </ul>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-white mb-2">
                    $1,000
                  </div>
                  <div className="text-lg text-gray-300">
                    Shipped in 2 weeks
                  </div>
                </div>
                <button className="btn-pixel-to-prod">Get Started</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
