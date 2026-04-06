import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — Noctara.',
  robots: { index: false },
}

const sections = [
  {
    title: '1. Responsable du traitement',
    content: 'KANDEMIR MOUHAMMED — NOCTARA., Entrepreneur individuel, SIRET 820 139 699 00046, 17 B Rue Bartholdi Bât. 3 Appt 313, 63100 Clermont-Ferrand. Email : contact@thenoctara.com.',
  },
  {
    title: '2. Données collectées',
    content: 'NOCTARA collecte uniquement les données nécessaires aux prestations : nom, prénom, adresse email, numéro de téléphone (optionnel), et informations relatives aux projets photographiques. Aucune donnée sensible n\'est collectée.',
  },
  {
    title: '3. Finalités du traitement',
    content: 'Les données sont utilisées exclusivement pour : répondre aux demandes de contact et de devis, gérer et exécuter les prestations commandées, envoyer des informations liées aux projets en cours.',
  },
  {
    title: '4. Base légale',
    content: 'Le traitement est fondé sur l\'exécution contractuelle (art. 6.1.b RGPD) et l\'intérêt légitime de NOCTARA à gérer sa relation client (art. 6.1.f RGPD).',
  },
  {
    title: '5. Durée de conservation',
    content: 'Les données sont conservées pendant la durée nécessaire à l\'exécution des prestations, puis archivées pour une durée de 3 ans à compter de la fin de la relation commerciale, conformément aux obligations légales.',
  },
  {
    title: '6. Vos droits (RGPD)',
    content: 'Conformément au Règlement (UE) 2016/679, vous disposez des droits suivants : accès, rectification, effacement, limitation, portabilité et opposition. Pour les exercer : contact@thenoctara.com. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).',
  },
  {
    title: '7. Cookies et stockage local',
    content: 'Ce site utilise uniquement un stockage localStorage pour mémoriser vos préférences de thème (clair/sombre). Aucun cookie publicitaire, aucun traceur tiers, aucune donnée transmise à des tiers.',
  },
  {
    title: '8. Sécurité',
    content: 'NOCTARA met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation. Le site est hébergé sur Vercel Inc. (San Francisco, USA), qui dispose d\'une certification ISO 27001.',
  },
]

export default function Confidentialite() {
  return (
    <div className="min-h-screen dark:bg-dark-bg bg-light-bg py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-body dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors mb-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Retour au site
        </Link>

        <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">LÉGAL</p>
        <h1 className="text-3xl md:text-4xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-2">
          Politique de Confidentialité
        </h1>
        <p className="text-sm font-body dark:text-dark-subtle text-light-subtle mb-12">
          NOCTARA · Conforme RGPD · Dernière mise à jour : Juillet 2025
        </p>

        <div className="flex flex-col gap-6">
          {sections.map((s) => (
            <div key={s.title} className="p-6 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border">
              <h2 className="text-base font-display font-bold dark:text-dark-text text-light-text mb-3">{s.title}</h2>
              <p className="text-sm font-body dark:text-dark-subtle text-light-subtle leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
