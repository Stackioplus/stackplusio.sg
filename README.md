# StackPlus - HR SAAS Website

A modern, professional website for StackPlus HR SAAS company built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Features

- **Modern Tech Stack**: Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility
- **Professional Design**: Clean, modern UI with smooth animations and transitions
- **Complete Pages**:
  - Home (Landing page with hero, features, testimonials)
  - Features (Detailed product features)
  - Pricing (Three pricing tiers with FAQ)
  - About (Company story, mission, values, team)
  - Contact (Contact form with company information)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── features/          # Features page
│   ├── pricing/           # Pricing page
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── CTA.tsx           # Call-to-action component
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Customization

### Updating Content

All content is currently using placeholder text. Update the following to match your brand:

1. **Company Information**: Update company name, contact details in components
2. **Colors**: Modify the primary color palette in `tailwind.config.ts`
3. **Content**: Replace placeholder text in each page component
4. **Images**: Add your company images to the `/public` folder and update references

### Branding

The site uses a primary blue color scheme. To change:

1. Edit `tailwind.config.ts` and update the `primary` color values
2. Update the company name "StackPlus" throughout the components

### Adding Features

- Add new pages in the `app/` directory
- Create new reusable components in `components/`
- Update navigation links in `components/Header.tsx`

## Technologies Used

- **Next.js 16**: React framework with App Router
- **React 19**: Latest version with modern features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **PostCSS & Autoprefixer**: CSS processing

## Deployment

This site can be deployed to:

- **Vercel** (Recommended): `vercel deploy`
- **Netlify**: Connect your git repository
- **Any Node.js hosting**: Run `npm run build && npm start`

## Next Steps

1. Replace all placeholder content with your actual company information
2. Add real images and update image paths
3. Connect the contact form to your backend/email service
4. Add analytics (Google Analytics, etc.)
5. Set up your custom domain
6. Add a blog section if needed
7. Implement authentication if required

## Support

For issues or questions, please refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## License

This project is created for StackPlus HR SAAS company.
