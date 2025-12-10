'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import DarkNavigation from '@/components/DarkNavigation'

export default function CompetitionApply() {
  const [formData, setFormData] = useState({
    startupName: '',
    startupDescription: '',
    applicantName: '',
    applicantEmail: '',
    applicantRole: '',
    linkedinProfile: '',
    pitchDeckLink: '',
    linkedinPostLink: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCRWrJIW_VB2Nl0F1ooKvuwojNHko2545IWakWN1MYZP8oSFwQ88ASusR2sB87GqhG/exec'

  // Deadline: 31st December 2025, 11:59 PM Singapore Time (UTC+8)
  const DEADLINE = new Date('2025-12-31T23:59:00+08:00').getTime()

  useEffect(() => {
    // Hide default header on this page
    const header = document.querySelector('header')
    if (header) header.style.display = 'none'

    // Countdown timer
    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = DEADLINE - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)

    return () => {
      if (header) header.style.display = ''
      clearInterval(timer)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Build URL with query parameters for GET request (works with Google Apps Script)
      const params = new URLSearchParams({
        startupName: formData.startupName,
        startupDescription: formData.startupDescription,
        applicantName: formData.applicantName,
        applicantEmail: formData.applicantEmail,
        applicantRole: formData.applicantRole,
        linkedinProfile: formData.linkedinProfile,
        pitchDeckLink: formData.pitchDeckLink,
        linkedinPostLink: formData.linkedinPostLink,
      })

      // Use an iframe to submit to avoid CORS issues
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = `${GOOGLE_SCRIPT_URL}?${params.toString()}`
      document.body.appendChild(iframe)

      // Wait a moment for the request to be sent
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Clean up
      document.body.removeChild(iframe)

      setSubmitted(true)
    } catch (err) {
      setError('Failed to submit application. Please try again.')
      console.error('Submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(-45deg, #f89b29, #ff0f7b);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <DarkNavigation />

      {/* Main Content */}
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Link */}
          <Link href="/competitions" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Competitions
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white mb-4">
            Apply Now
          </h1>
          <p className="text-gray-400 mb-6">Stacker Compete Application</p>

          {/* Countdown Timer */}
          <div className="mb-8">
            <p className="text-gray-500 text-sm mb-3 text-center">Application closes in</p>
            <div className="flex justify-center items-center gap-2 sm:gap-4">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{timeLeft.days}</div>
                <div className="text-sm text-gray-400 mt-1">Days</div>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">:</div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-400 mt-1">Hours</div>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">:</div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-400 mt-1">Minutes</div>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">:</div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-400 mt-1">Seconds</div>
              </div>
            </div>
            <p className="text-gray-600 text-xs mt-4 text-center">Deadline: 31st December 2025, 11:59 PM (SGT)</p>
          </div>

          {submitted ? (
            <div className="bg-green-900/30 border border-green-500/50 rounded-2xl p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-white mb-2">Application Submitted!</h2>
              <p className="text-gray-300 mb-4">Thank you for applying to Stacker Compete. We'll review your application and get back to you soon.</p>
              <p className="text-gray-400 mb-6">In the meantime, check out our other services.</p>
              <Link href="/discover" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition">
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ) : (
            <>
              {/* Instructions */}
              <div className="bg-gradient-to-br from-orange-950/40 to-pink-950/40 border border-orange-500/30 rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Instructions
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3">
                  Have an idea? Film a 60 second video introducing your startup. Make it as creative as possible.
                </p>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3">
                  Post it on LinkedIn and tag{' '}
                  <a href="https://www.linkedin.com/company/lythegigs/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">@Lythe</a>
                  {' '}and{' '}
                  <a href="https://www.linkedin.com/company/stackio/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">@Stack+</a>
                  {' '}then fill up this application form!
                </p>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3">
                  All the best!
                </p>
                <p className="text-orange-400 text-sm font-medium">
                  Make sure to tag the correct pages or your application would be disqualified.
                </p>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Startup Name */}
                <div>
                  <label htmlFor="startupName" className="block text-sm font-medium text-gray-300 mb-2">
                    Name of Startup <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="startupName"
                    name="startupName"
                    required
                    value={formData.startupName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition"
                    placeholder="Enter your startup name"
                  />
                </div>

                {/* Startup Description */}
                <div>
                  <label htmlFor="startupDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    Short Description of Startup <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="startupDescription"
                    name="startupDescription"
                    required
                    rows={3}
                    value={formData.startupDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition resize-none"
                    placeholder="Describe what your startup does in a few sentences"
                  />
                </div>

                {/* Applicant Name */}
                <div>
                  <label htmlFor="applicantName" className="block text-sm font-medium text-gray-300 mb-2">
                    Applicant's Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="applicantName"
                    name="applicantName"
                    required
                    value={formData.applicantName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Applicant Email */}
                <div>
                  <label htmlFor="applicantEmail" className="block text-sm font-medium text-gray-300 mb-2">
                    Applicant's Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="applicantEmail"
                    name="applicantEmail"
                    required
                    value={formData.applicantEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Applicant Role */}
                <div>
                  <label htmlFor="applicantRole" className="block text-sm font-medium text-gray-300 mb-2">
                    Applicant's Role in Startup <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="applicantRole"
                    name="applicantRole"
                    required
                    value={formData.applicantRole}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition"
                    placeholder="e.g. CEO, Co-founder, CTO"
                  />
                </div>

                {/* LinkedIn Profile */}
                <div>
                  <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-300 mb-2">
                    Applicant's LinkedIn Profile <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    id="linkedinProfile"
                    name="linkedinProfile"
                    required
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                {/* Pitch Deck Link */}
                <div>
                  <label htmlFor="pitchDeckLink" className="block text-sm font-medium text-gray-300 mb-2">
                    Pitch Deck Link <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    id="pitchDeckLink"
                    name="pitchDeckLink"
                    required
                    value={formData.pitchDeckLink}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition"
                    placeholder="https://drive.google.com/file/..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Upload your pitch deck to Google Drive or Dropbox and paste the share link here
                  </p>
                </div>

                {/* LinkedIn Post Link */}
                <div>
                  <label htmlFor="linkedinPostLink" className="block text-sm font-medium text-gray-300 mb-2">
                    Link to LinkedIn Post <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    id="linkedinPostLink"
                    name="linkedinPostLink"
                    required
                    value={formData.linkedinPostLink}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition"
                    placeholder="https://linkedin.com/posts/..."
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative inline-flex items-center justify-center text-base rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 font-semibold text-white transition-all duration-200 hover:from-orange-600 hover:to-pink-600 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
