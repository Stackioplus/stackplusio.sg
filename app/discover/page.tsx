'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'

export default function Discover() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    // Hide default header on this page
    const header = document.querySelector('header')
    if (header) header.style.display = 'none'

    // Load Lottie script
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js'
    script.type = 'module'
    document.body.appendChild(script)

    // Cleanup - show header again when leaving the page
    return () => {
      if (header) header.style.display = ''
      document.body.removeChild(script)
    }
  }, [])

  const openModal = (service: string) => {
    setSelectedService(service)
    setIsModalOpen(true)
    setFormData({ name: '', email: '', description: '' })
    setSubmitMessage('')
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedService('')
    setFormData({ name: '', email: '', description: '' })
    setSubmitMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send data to API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: selectedService,
          description: formData.description,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage(data.message || 'Inquiry sent successfully! We will get back to you soon.')

        // Close modal after 3 seconds
        setTimeout(() => {
          closeModal()
        }, 3000)
      } else {
        setSubmitMessage(data.error || 'Failed to send inquiry. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      <style jsx>{`
        .pricing-card {
          width: 100%;
          max-width: 350px;
          background: #e5e7eb;
          border-radius: 18px;
          padding: 30px 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        @media (min-width: 640px) {
          .pricing-card {
            padding: 40px 30px;
          }
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .pricing-card-popular {
          width: 100%;
          max-width: 350px;
          background: #e5e7eb;
          border-radius: 18px;
          padding: 30px 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 3px solid transparent;
          background-image: linear-gradient(#e5e7eb, #e5e7eb), linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          position: relative;
        }

        @media (min-width: 640px) {
          .pricing-card-popular {
            padding: 40px 30px;
          }
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
          font-size: 32px;
          font-weight: 700;
          color: #000;
          margin-bottom: 15px;
        }

        @media (min-width: 640px) {
          .tier-name {
            font-size: 40px;
          }
        }

        .tier-description {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          min-height: 80px;
        }

        @media (min-width: 640px) {
          .tier-description {
            font-size: 18px;
            min-height: 100px;
          }
        }

        .tier-price {
          font-size: 28px;
          font-weight: 600;
          color: #000;
          margin-bottom: 30px;
        }

        @media (min-width: 640px) {
          .tier-price {
            font-size: 32px;
          }
        }

        .tier-price span {
          font-size: 14px;
          color: #666;
        }

        @media (min-width: 640px) {
          .tier-price span {
            font-size: 16px;
          }
        }

        .btn-learn-more {
          width: 9em;
          height: 3em;
          border-radius: 30em;
          font-size: 15px;
          font-family: inherit;
          border: 2px solid #000000;
          background: #ffffff;
          color: #000000;
          position: relative;
          overflow: hidden;
          z-index: 1;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: color 0.5s ease;
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

        .btn-learn-more:hover {
          color: #e5e5e5;
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
            <Link href="/our-cause" className="text-gray-300 hover:text-gray-100 transition hidden sm:inline text-xs sm:text-sm md:text-base">
              Our Cause
            </Link>
            <Link href="/competitions" className="text-gray-300 hover:text-gray-100 transition text-xs sm:text-sm md:text-base">
              Competitions
            </Link>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 sm:pt-18 md:pt-20 pb-12 sm:pb-16 md:pb-20">
        {/* Full width black container with cards */}
        <div className="w-full py-12 sm:py-16 md:py-20" style={{ backgroundColor: '#000000' }}>
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 text-center mb-6 sm:mb-8">
              Lease Developers
            </h2>

            {/* Free Trial text */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100">
                Get <span className="gradient-text">One Week</span> Free Trial With A Stacker
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
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
                <button className="btn-learn-more" onClick={() => openModal('Tier 1 - Junior Developer ($599/month)')}>Select</button>
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
                <button className="btn-learn-more" onClick={() => openModal('Tier 2 - Senior Developer ($799/month)')}>Select</button>
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
                <button className="btn-learn-more" onClick={() => openModal('Tier 3 - Enterprise ($1500/month)')}>Select</button>
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
        <section className="py-12 sm:py-16 md:py-20 px-4" style={{ backgroundColor: '#1a1a1a' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 text-center mb-10 sm:mb-12 md:mb-16">
              Project Management
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-12 fade-in-left">
              {/* Lottie animation on the left */}
              <div className="flex-1 w-full flex justify-center">
                {/* @ts-ignore */}
                <dotlottie-wc
                  src="https://lottie.host/0aeab362-de3a-48d7-80f9-4afb00004909/tmuIdnKQjU.lottie"
                  style={{ width: '500px', height: '500px' }}
                  autoplay
                  loop
                />
              </div>

              {/* Description on the right */}
              <div className="flex-1 w-full">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4 sm:mb-6">
                  You Dream, <span className="gradient-text">We Build</span>
                </h3>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="text-base sm:text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-xl sm:text-2xl">✓</span>
                    Planning & Setup
                  </li>
                  <li className="text-base sm:text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-xl sm:text-2xl">✓</span>
                    Execution
                  </li>
                  <li className="text-base sm:text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-xl sm:text-2xl">✓</span>
                    Review & Feedback
                  </li>
                  <li className="text-base sm:text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-xl sm:text-2xl">✓</span>
                    Delivery & Closeout
                  </li>
                </ul>
                <button className="btn-learn-more" onClick={() => openModal('Project Management')}>Get a Quote</button>
              </div>
            </div>
          </div>
        </section>

        {/* Pixel To Production Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4" style={{ backgroundColor: '#000000' }}>
          <style>{`
            .loader-wrapper {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 200px;
              height: 200px;
              font-family: "Inter", sans-serif;
              font-size: 1em;
              font-weight: 300;
              color: white;
              border-radius: 50%;
              background-color: transparent;
              user-select: none;
              margin: 0 auto;
            }

            @media (min-width: 640px) {
              .loader-wrapper {
                width: 250px;
                height: 250px;
                font-size: 1.2em;
              }
            }

            @media (min-width: 768px) {
              .loader-wrapper {
                width: 300px;
                height: 300px;
                font-size: 1.5em;
              }
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
              background: #ffffff;
              color: #000000;
              position: relative;
              overflow: hidden;
              z-index: 1;
              cursor: pointer;
              box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
              transition: color 0.5s ease;
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
              color: #e5e5e5;
            }

            .btn-pixel-to-prod:hover::before {
              width: 9em;
            }
          `}</style>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 sm:gap-10 md:gap-12 fade-in-left">
              {/* Animated Loader on the right */}
              <div className="flex-1 flex items-center justify-center w-full">
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
              <div className="flex-1 w-full">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-3 sm:mb-4">
                  Pixel To Production
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6">
                  Transform your Figma and Lovable designs into <span className="gradient-text">fully functional</span> Full Stack Applications
                </p>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="text-base sm:text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-xl sm:text-2xl">✓</span>
                    Figma to Code Conversion
                  </li>
                  <li className="text-base sm:text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-xl sm:text-2xl">✓</span>
                    Lovable Design Integration
                  </li>
                  <li className="text-base sm:text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-xl sm:text-2xl">✓</span>
                    Full Stack Development
                  </li>
                  <li className="text-base sm:text-lg text-gray-200 flex items-center">
                    <span className="mr-3 text-xl sm:text-2xl">✓</span>
                    Responsive & Production-Ready
                  </li>
                </ul>
                <div className="mb-4 sm:mb-6">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
                    $1,000
                  </div>
                  <div className="text-base sm:text-lg">
                    <span className="gradient-text">Shipped in 2 weeks</span>
                  </div>
                </div>
                <button className="btn-pixel-to-prod" onClick={() => openModal('Pixel To Production ($1,000)')}>Get Started</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="rounded-2xl max-w-md w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#000000', border: '1px solid #333' }} onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-200 transition w-10 h-10 flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4 sm:mb-6 pr-8">Service Inquiry</h2>

            {submitMessage ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-200">{submitMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-base"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-base"
                      placeholder="your.email@company.com"
                    />
                  </div>

                  {/* Service (Auto-selected) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Service *
                    </label>
                    <div className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-200 text-sm sm:text-base">
                      {selectedService}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-200 mb-2">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition resize-none text-base"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-gray-100 px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-base min-h-[44px]"
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
