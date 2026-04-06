export interface SiteContent {
  lang: 'fr' | 'en'
  meta: {
    title: string
    description: string
    locale: string
  }
  nav: {
    book: string
    links: { label: string; href: string }[]
  }
  hero: {
    line1: string
    line2: string
    description: string
    cta: string
    badge: string
  }
  ticker: string[]
  stats: { value: string; suffix: string; label: string }[]
  portfolio: {
    title: string
    subtitle: string
    items: { src: string; alt: string; caption: string; w: number; h: number }[]
  }
  about: {
    title: string
    subtitle: string
    paragraphs: string[]
    tags: string[]
    signature: string
  }
  pricing: {
    title: string
    subtitle: string
    togglePersonal: string
    togglePro: string
    personal: PricingCard[]
    pro: PricingCard[]
    ctaPersonal: string
    ctaPro: string
  }
  process: {
    title: string
    subtitle: string
    steps: { icon: string; title: string; description: string }[]
  }
  testimonials: {
    title: string
    subtitle: string
    items: { name: string; role: string; text: string; initials: string }[]
  }
  clients: {
    title: string
  }
  contact: {
    title: string
    subtitle: string
    address: string
    city: string
    email: string
    availability: string
    available: string
    form: {
      name: string
      email: string
      message: string
      send: string
      sending: string
      success: string
    }
  }
  devis: {
    title: string
    subtitle: string
    fields: {
      company: string
      name: string
      email: string
      date: string
      location: string
      people: string
      budget: string
      message: string
      send: string
      sending: string
      success: string
    }
    budgets: string[]
  }
  footer: {
    description: string
    links: { label: string; href: string }[]
    legal: { label: string; href: string }[]
    copyright: string
  }
}

export interface PricingCard {
  name: string
  price: string
  unit?: string
  features: string[]
  highlight?: boolean
  badge?: string
}
