import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions Légales — Noctara.',
  robots: { index: false },
}

export default function MentionsLegales() {
  return (
    <div className="min-h-screen dark:bg-dark-bg bg-light-bg py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-body dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors mb-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Retour au site
        </Link>

        <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">LÉGAL</p>
        <h1 className="text-3xl md:text-4xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-12">
          Mentions Légales
        </h1>

        <div className="flex flex-col gap-6">
          {[
            {
              title: 'Éditeur du site',
              items: [
                'Nom commercial : NOCTARA.',
                'Exploitant : KANDEMIR MOUHAMMED',
                'Forme juridique : Entrepreneur individuel (Micro-entreprise)',
                'SIREN : 820 139 699',
                'SIRET (siège) : 820 139 699 00046',
                'N° TVA intracommunautaire : FR44820139699',
                'N° RCS : 820 139 699 R.C.S. Clermont-Ferrand',
                'Code APE/NAF : 74.20Z — Activités photographiques',
                'Adresse : Bâtiment 3 - Appt 313, 17 B Rue Bartholdi, 63100 Clermont-Ferrand',
                'Email : contact@thenoctara.com',
                'Inscrit au RCS de Clermont-Ferrand le 12/08/2025',
              ],
            },
            {
              title: 'Hébergement',
              items: [
                'Vercel Inc.',
                '340 Pine Street, Suite 701, San Francisco, CA 94104, USA',
                'https://vercel.com',
              ],
            },
            {
              title: 'Activité principale déclarée',
              items: [
                'Prestations commerciales de photographie et vidéo, comprenant la prise de vue, la retouche, le montage, ainsi que la vente de supports photos et vidéos aux particuliers et professionnels.',
                'Code NAF 74.20Z — Activités photographiques.',
                'Formes d\'exercice : Libérale non réglementée, Commerciale.',
              ],
            },
            {
              title: 'Propriété intellectuelle',
              items: [
                'L\'ensemble du contenu de ce site (textes, photographies, logos, visuels) est la propriété exclusive de KANDEMIR MOUHAMMED — NOCTARA. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite et constitue une contrefaçon au sens du Code de la propriété intellectuelle.',
              ],
            },
            {
              title: 'Limitation de responsabilité',
              items: [
                'NOCTARA s\'efforce d\'assurer l\'exactitude des informations présentes sur ce site. Toutefois, l\'exploitant ne saurait être tenu responsable des erreurs ou omissions, ni des préjudices résultant de l\'utilisation des informations publiées.',
              ],
            },
            {
              title: 'Droit applicable & juridiction',
              items: [
                'Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux compétents du ressort de Clermont-Ferrand seront seuls habilités à connaître du différend.',
              ],
            },
          ].map((section) => (
            <div key={section.title} className="p-6 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border">
              <h2 className="text-base font-display font-bold dark:text-dark-text text-light-text mb-3">{section.title}</h2>
              <ul className="flex flex-col gap-1.5">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm font-body dark:text-dark-subtle text-light-subtle leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
