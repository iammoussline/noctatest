import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LenisProvider } from '@/components/LenisProvider'
import { CustomCursor } from '@/components/CustomCursor'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  metadataBase: new URL('https://thenoctara.com'),
  title: {
    template: '%s | Noctara.',
    default: 'Noctara. — Photographe Professionnel | Clermont-Ferrand',
  },
  description: 'Photographe professionnel basé à Clermont-Ferrand. Portrait, mariage, corporate, événement. Chaque instant a une seule chance.',
  keywords: ['photographe', 'Clermont-Ferrand', 'portrait', 'mariage', 'corporate', 'événement', 'professionnel'],
  authors: [{ name: 'Noctara' }],
  creator: 'Noctara',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    url: 'https://thenoctara.com',
    siteName: 'Noctara.',
    title: 'Noctara. — Photographe Professionnel',
    description: 'Photographe professionnel basé à Clermont-Ferrand. Chaque instant a une seule chance.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Noctara Photography' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noctara. — Photographe Professionnel',
    description: 'Photographe professionnel basé à Clermont-Ferrand.',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://thenoctara.com',
    languages: {
      'fr': 'https://thenoctara.com',
      'en': 'https://thenoctara.com/en',
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#08080f' },
    { media: '(prefers-color-scheme: light)', color: '#f8f8ff' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Borel&family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=Unbounded:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('noctara-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var dark = stored ? stored === 'dark' : prefersDark;
                  document.documentElement.classList.toggle('dark', dark);
                  document.documentElement.classList.toggle('light', !dark);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text">
        {/* Noise texture */}
        <div className="noise-overlay" aria-hidden="true" />

        <LenisProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </LenisProvider>

        <CustomCursor />
      </body>
    </html>
  )
}
