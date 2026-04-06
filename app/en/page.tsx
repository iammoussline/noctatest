import type { Metadata } from 'next'
import { EnHomePage } from './EnHomePage'

export const metadata: Metadata = {
  title: 'Noctara. — Professional Photographer | Clermont-Ferrand',
  description: 'Professional photographer based in Clermont-Ferrand. Portrait, wedding, corporate, events. Every moment has only one chance.',
  alternates: {
    canonical: 'https://thenoctara.com/en',
    languages: {
      'fr': 'https://thenoctara.com',
      'en': 'https://thenoctara.com/en',
    },
  },
  openGraph: {
    locale: 'en_US',
  },
}

export default function PageEN() {
  return <EnHomePage />
}
