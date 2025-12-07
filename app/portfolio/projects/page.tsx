'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  description: string
  image: string
  keyPoints: string[]
  technologies: string[]
  direction: 'left' | 'right'
  website?: string
  github?: string
  linkedin?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Lint Voice',
    description: 'A modular AI voice framework with streaming speech-to-text, intelligent AI responses, and text-to-speech capabilities. Designed to run locally and optimized for Apple Silicon. A foundation for the community to explore, innovate, and build AI voice applications.',
    image: '/lint-voice.jpeg',
    keyPoints: [
      'Streaming STT → LLM → TTS pipeline',
      'Per-session conversation state',
      'High-quality AI voice output',
      'Optimized for Apple Silicon (M1/M2/M3)',
      'Modular architecture for easy integration'
    ],
    technologies: ['Python', 'AI/ML', 'Apple Silicon'],
    direction: 'left',
    website: 'https://lnkd.in/gWut5uhw',
    github: 'https://lnkd.in/ggqEyjYX'
  },
  {
    id: 2,
    title: 'Novo',
    description: "The world's first human-like marking assistant built to work the way you do. Novo brings true inline marking for every subject, delivering feedback instantly, intelligently, and seamlessly.",
    image: '',
    keyPoints: [
      'True inline marking for every subject',
      'Instant and intelligent feedback',
      'Human-like marking experience',
      'Seamless integration into workflow'
    ],
    technologies: ['AI/ML', 'Education Tech', 'Web App'],
    direction: 'right',
    website: 'https://msnovo.com',
    linkedin: 'https://www.linkedin.com/company/noverse-inc/'
  },
]

export default function Projects() {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Hide default header on this page
    const header = document.querySelector('header')
    if (header) header.style.display = 'none'

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Cleanup
    return () => {
      if (header) header.style.display = ''
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black" style={{ backgroundColor: '#000000' }}>
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-150px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(150px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientFlow {
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
          animation: gradientFlow 3s ease infinite;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .project-from-left {
          opacity: 0;
          transform: translateX(-150px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .project-from-right {
          opacity: 0;
          transform: translateX(150px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .project-from-left.animate-in,
        .project-from-right.animate-in {
          opacity: 1;
          transform: translateX(0);
        }

        .project-image-container {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
        }

        .project-image-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(248, 155, 41, 0.1), rgba(255, 15, 123, 0.1));
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }

        .project-card:hover .project-image-container::before {
          opacity: 1;
        }

        .key-point {
          position: relative;
          padding-left: 24px;
        }

        .key-point::before {
          content: '→';
          position: absolute;
          left: 0;
          background: linear-gradient(to right, #f89b29, #ff0f7b);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Novo Loader Animation */
        .loader-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 120px;
          width: auto;
          margin: 2rem;
          font-family: "Poppins", sans-serif;
          font-size: 1.6em;
          font-weight: 600;
          user-select: none;
          color: #fff;
          scale: 2;
        }

        .loader {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 1;
          background-color: transparent;
          mask: repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 6px,
            black 7px,
            black 8px
          );
        }

        .loader::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle at 50% 50%, #4c1d95 0%, transparent 50%),
            radial-gradient(circle at 45% 45%, #3b0764 0%, transparent 45%),
            radial-gradient(circle at 55% 55%, #581c87 0%, transparent 45%),
            radial-gradient(circle at 45% 55%, #2e1065 0%, transparent 45%),
            radial-gradient(circle at 55% 45%, #4a044e 0%, transparent 45%);
          mask: radial-gradient(
            circle at 50% 50%,
            transparent 0%,
            transparent 10%,
            black 25%
          );
          animation:
            transform-animation 2s infinite alternate,
            opacity-animation 4s infinite;
          animation-timing-function: cubic-bezier(0.6, 0.8, 0.5, 1);
        }

        @keyframes transform-animation {
          0% {
            transform: translate(-55%);
          }
          100% {
            transform: translate(55%);
          }
        }

        @keyframes opacity-animation {
          0%,
          100% {
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          65% {
            opacity: 0;
          }
        }

        .loader-letter {
          display: inline-block;
          opacity: 0;
          animation: loader-letter-anim 4s infinite linear;
          z-index: 2;
        }

        .loader-letter:nth-child(1) { animation-delay: 0.1s; }
        .loader-letter:nth-child(2) { animation-delay: 0.205s; }
        .loader-letter:nth-child(3) { animation-delay: 0.31s; }
        .loader-letter:nth-child(4) { animation-delay: 0.415s; }
        .loader-letter:nth-child(5) { animation-delay: 0.521s; }
        .loader-letter:nth-child(6) { animation-delay: 0.626s; }
        .loader-letter:nth-child(7) { animation-delay: 0.731s; }
        .loader-letter:nth-child(8) { animation-delay: 0.837s; }
        .loader-letter:nth-child(9) { animation-delay: 0.942s; }
        .loader-letter:nth-child(10) { animation-delay: 1.047s; }

        @keyframes loader-letter-anim {
          0% {
            opacity: 0;
          }
          5% {
            opacity: 1;
            text-shadow: 0 0 4px #fff;
            transform: scale(1.1) translateY(-2px);
          }
          20% {
            opacity: 0.2;
          }
          100% {
            opacity: 0;
          }
        }

        /* Bouncing loader */
        .bounce-wrapper {
          width: 200px;
          height: 60px;
          position: relative;
          z-index: 1;
        }

        .bounce-circle {
          width: 20px;
          height: 20px;
          position: absolute;
          border-radius: 50%;
          background-color: #fff;
          left: 15%;
          transform-origin: 50%;
          animation: circle7124 .5s alternate infinite ease;
        }

        @keyframes circle7124 {
          0% {
            top: 60px;
            height: 5px;
            border-radius: 50px 50px 25px 25px;
            transform: scaleX(1.7);
          }

          40% {
            height: 20px;
            border-radius: 50%;
            transform: scaleX(1);
          }

          100% {
            top: 0%;
          }
        }

        .bounce-circle:nth-child(2) {
          left: 45%;
          animation-delay: .2s;
        }

        .bounce-circle:nth-child(3) {
          left: auto;
          right: 15%;
          animation-delay: .3s;
        }

        .bounce-shadow {
          width: 20px;
          height: 4px;
          border-radius: 50%;
          background-color: rgba(0,0,0,0.9);
          position: absolute;
          top: 62px;
          transform-origin: 50%;
          z-index: -1;
          left: 15%;
          filter: blur(1px);
          animation: shadow046 .5s alternate infinite ease;
        }

        @keyframes shadow046 {
          0% {
            transform: scaleX(1.5);
          }

          40% {
            transform: scaleX(1);
            opacity: .7;
          }

          100% {
            transform: scaleX(.2);
            opacity: .4;
          }
        }

        .bounce-shadow:nth-child(4) {
          left: 45%;
          animation-delay: .2s;
        }

        .bounce-shadow:nth-child(5) {
          left: auto;
          right: 15%;
          animation-delay: .3s;
        }

        /* Logo Carousel */
        .carousel-track {
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

      `}</style>

      {/* Custom black header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/portfolio" className="text-white hover:text-gray-300 transition">
              ← Back to Portfolio
            </Link>
            <div className="flex items-center gap-8">
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
            </div>
          </nav>
        </div>
      </div>

      <div className="pt-32 pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Animated Header */}
          <div className="text-center mb-24">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 fade-in-up">
              Our <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-gray-400 fade-in-up" style={{ animationDelay: '0.2s' }}>
              Showcasing what Stack+ developers have built
            </p>
          </div>

          {/* Projects - Alternating Left/Right */}
          <div className="space-y-32">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => { projectRefs.current[index] = el }}
                className={`project-card ${project.direction === 'left' ? 'project-from-left' : 'project-from-right'}`}
              >
                <div className={`flex flex-col ${project.direction === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                  {/* Image or Custom Visual */}
                  <div className="w-full lg:w-1/2">
                    {project.image ? (
                      <div className="project-image-container aspect-video relative shadow-2xl shadow-orange-500/10">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ) : project.title === 'Novo' ? (
                      <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-purple-900/30">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source src="/novo-video.mp4" type="video/mp4" />
                        </video>
                      </div>
                    ) : (
                      <div className="aspect-video relative flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-2xl">
                        <span className="text-6xl text-gray-700">🚀</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                      {project.title}
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Points */}
                    <div className="space-y-3 pt-4">
                      {project.keyPoints.map((point, i) => (
                        <p key={i} className="key-point text-gray-300">
                          {point}
                        </p>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex gap-3 flex-wrap pt-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-white rounded-full text-sm border border-orange-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    {(project.website || project.github || project.linkedin) && (
                      <div className="flex gap-5 pt-6">
                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-400 hover:text-teal-300 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="2" y1="12" x2="22" y2="12"></line>
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-400 hover:text-teal-300 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                        {project.linkedin && (
                          <a
                            href={project.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-400 hover:text-teal-300 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More projects prompt */}
          <div className="mt-32 flex flex-col items-center">
            <p className="text-gray-600 text-lg mb-8">
              More projects coming soon...
            </p>
            <div className="bounce-wrapper">
              <div className="bounce-circle"></div>
              <div className="bounce-circle"></div>
              <div className="bounce-circle"></div>
              <div className="bounce-shadow"></div>
              <div className="bounce-shadow"></div>
              <div className="bounce-shadow"></div>
            </div>
          </div>

          {/* Partners Section */}
          <div className="mt-40">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Partners
              </h2>
              <p className="text-xl text-gray-400">
                Trusted by Startups and Universities all over the world
              </p>
            </div>

            {/* Logo Carousel */}
            <div className="relative overflow-hidden py-8">
              <div className="carousel-track flex gap-16 items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, i) => (
                  <div key={i} className="flex-shrink-0 w-32 h-20 relative transition-all duration-300 opacity-80 hover:opacity-100">
                    <Image
                      src={`/client-logo-${num}.jpeg`}
                      alt={`Partner ${num}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
