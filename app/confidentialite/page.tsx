import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — Noctara.',
  robots: { index: false },
}

const sections = [
  {
    title: '1. Responsable du traitement',
    content: 'Noctara, photographe professionnel basé à Clermont-Ferrand (France). Contact : contact@thenoctara.com',
  },
  {
    title: '2. Données collectées',
    content: 'Noctara collecte uniquement les données nécessaires aux prestations : nom, prénom, email, et informations relatives aux projets photographiques. Aucune donnée sensible n\'est collectée.',
  },
  {
    title: '3. Utilisation des données',
    content: 'Les données sont utilisées exclusivement pour : répondre aux demandes de contact, établir des devis, gérer les prestations, et envoyer des informations liées aux projets en cours.',
  },
  {
    title: '4. Conservation des données',
    content: 'Les données sont conservées pendant la durée nécessaire à l\'exécution des prestations, puis supprimées dans un délai de 3 ans après la fin de la relation commerciale.',
  },
  {
    title: '5. Droits des utilisateurs',
    content: 'Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification, de suppression et d\'opposition. Pour exercer ces droits, contactez : contact@thenoctara.com',
  },
  {
    title: '6. Cookies',
    content: 'Ce site utilise des cookies fonctionnels (préférences de thème) stockés en localStorage. Aucun cookie tiers ou de tracking n\'est utilisé.',
  },
  {
    title: '7. Sécurité',
    content: 'Noctara met en œuvre les mesures techniques appropriées pour protéger vos données contre tout accès non autorisé, altération ou divulgation.',
  },
]

export default function Confidentialite() {
  return (
    <div className="min-h-screen dark:bg-dark-bg bg-light-bg py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-body dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors mb-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour au site
        </Link>

        <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">LÉGAL</p>
        <h1 className="text-3xl md:text-4xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-2">
          Politique de Confidentialité
        </h1>
        <p className="text-sm font-body dark:text-dark-subtle text-light-subtle mb-12">
          Noctara · RGPD · Dernière mise à jour : Janvier 2025
        </p>

        <div className="flex flex-col gap-8">
          {sections.map((s, i) => (
            <div key={i} className="p-6 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border">
              <h2 className="text-base font-display font-bold dark:text-dark-text text-light-text mb-3">
                {s.title}
              </h2>
              <p className="text-sm font-body dark:text-dark-subtle text-light-subtle leading-relaxed">
                {s.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
