import Link from 'next/link'

interface CTAProps {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export default function CTA({
  title = "Ready to transform your HR operations?",
  description = "Join thousands of companies using StackPlus to streamline their HR processes and empower their teams.",
  primaryButtonText = "Start Free Trial",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Schedule Demo",
  secondaryButtonLink = "/contact",
}: CTAProps) {
  return (
    <section className="bg-primary-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryButtonLink}
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {primaryButtonText}
          </Link>
          <Link
            href={secondaryButtonLink}
            className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition border border-primary-500"
          >
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  )
}
