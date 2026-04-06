import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — Noctara.',
  robots: { index: false },
}

const sections = [
  {
    title: '1. Objet',
    content: 'Les présentes conditions générales de vente s\'appliquent à toutes les prestations de services conclues par Noctara (photographe professionnel) auprès de ses clients.',
  },
  {
    title: '2. Devis et commandes',
    content: 'Toute prestation fait l\'objet d\'un devis préalable. Le devis est valable 30 jours. La commande est confirmée par le versement d\'un acompte de 30% du montant total.',
  },
  {
    title: '3. Tarifs',
    content: 'Les tarifs sont indiqués en euros TTC. Noctara se réserve le droit de modifier ses tarifs à tout moment. Les prestations sont facturées aux tarifs en vigueur au moment de la confirmation.',
  },
  {
    title: '4. Paiement',
    content: 'Le solde est dû à la livraison des fichiers. Les paiements s\'effectuent par virement bancaire ou PayPal. En cas de retard de paiement, des pénalités de 3× le taux légal s\'appliquent.',
  },
  {
    title: '5. Droits d\'auteur',
    content: 'Les photographies réalisées restent la propriété intellectuelle de Noctara. Le client bénéficie d\'une licence d\'utilisation personnelle et non commerciale, sauf accord écrit contraire.',
  },
  {
    title: '6. Livraison',
    content: 'Les fichiers numériques sont livrés via une galerie privée en ligne, dans les délais convenus dans le devis. Noctara s\'engage à livrer des fichiers de haute qualité, retouchés selon les standards professionnels.',
  },
  {
    title: '7. Annulation',
    content: 'En cas d\'annulation par le client moins de 48h avant la prestation, l\'acompte est conservé. Une annulation par Noctara entraîne le remboursement intégral des sommes versées.',
  },
  {
    title: '8. Responsabilité',
    content: 'Noctara ne peut être tenu responsable de la perte ou dommage des fichiers une fois livrés. Il est fortement recommandé d\'effectuer des sauvegardes.',
  },
]

export default function CGV() {
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
          Conditions Générales de Vente
        </h1>
        <p className="text-sm font-body dark:text-dark-subtle text-light-subtle mb-12">
          Noctara · Dernière mise à jour : Janvier 2025
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
