import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cgv', '/confidentialite', '/mentions-legales'],
    },
    sitemap: 'https://thenoctara.com/sitemap.xml',
  }
}
