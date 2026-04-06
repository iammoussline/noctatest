import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://thenoctara.com'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0, alternates: { languages: { fr: base, en: `${base}/en` } } },
    { url: `${base}/en`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/cgv`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
