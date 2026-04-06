import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — noctara.',
  robots: { index: false },
}

const sections = [
  {
    title: '1. Identification du vendeur',
    content: 'KANDEMIR MOUHAMMED — noctara., Entrepreneur individuel (Micro-entreprise), SIRET 820 139 699 00046, 17 B Rue Bartholdi Bât. 3 Appt 313, 63100 Clermont-Ferrand. Email : contact@thenoctara.com. TVA non applicable, art. 293 B du CGI (régime micro-entreprise).',
  },
  {
    title: '2. Objet',
    content: 'Les présentes conditions générales de vente s\'appliquent à toutes les prestations de services proposées par noctara., notamment : prises de vue photographiques, retouches, montages vidéo, et vente de supports photos/vidéos aux particuliers et professionnels.',
  },
  {
    title: '3. Devis et commandes',
    content: 'Toute prestation fait l\'objet d\'un devis préalable gratuit, valable 30 jours. La commande est confirmée par la signature du devis et le versement d\'un acompte de 30 % du montant total TTC.',
  },
  {
    title: '4. Tarifs',
    content: 'Les tarifs sont indiqués en euros TTC. En tant que micro-entrepreneur, noctara. n\'est pas assujetti à la TVA (art. 293 B du CGI). noctara. se réserve le droit de modifier ses tarifs à tout moment, sans que cela n\'affecte les commandes confirmées.',
  },
  {
    title: '5. Paiement',
    content: 'Le solde est exigible à la livraison des fichiers. Les paiements sont acceptés par virement bancaire ou PayPal. Tout retard de paiement entraîne des pénalités au taux légal en vigueur, majorées d\'une indemnité forfaitaire de recouvrement de 40 €.',
  },
  {
    title: '6. Droits d\'auteur et cession',
    content: 'Les photographies réalisées demeurent la propriété intellectuelle de KANDEMIR MOUHAMMED — noctara. (Code de la propriété intellectuelle). Le client bénéficie d\'une licence d\'utilisation personnelle et non commerciale. Toute utilisation commerciale ou publicitaire est soumise à un accord écrit et une facturation spécifique.',
  },
  {
    title: '7. Livraison des fichiers',
    content: 'Les fichiers numériques haute résolution sont livrés via une galerie privée en ligne sécurisée, dans le délai convenu au devis. noctara. s\'engage à livrer des fichiers de haute qualité, retouchés selon ses standards professionnels.',
  },
  {
    title: '8. Annulation et report',
    content: 'Annulation par le client à moins de 48 h avant la prestation : l\'acompte est conservé à titre d\'indemnité. Report à plus de 72 h à l\'avance : sans pénalité sous réserve de disponibilité. Annulation par noctara. : remboursement intégral des sommes versées.',
  },
  {
    title: '9. Responsabilité',
    content: 'noctara. ne peut être tenu responsable de la perte ou de l\'endommagement des fichiers après leur livraison. Il est vivement recommandé au client d\'effectuer des copies de sauvegarde. La responsabilité de noctara. est limitée au montant de la prestation concernée.',
  },
  {
    title: '10. Règlement des litiges',
    content: 'En cas de différend, les parties s\'engagent à rechercher une solution amiable dans un délai de 30 jours. À défaut, le litige sera porté devant les juridictions compétentes du ressort de Clermont-Ferrand, conformément au droit français.',
  },
]

export default function CGV() {
  return (
    <div className="min-h-screen dark:bg-dark-bg bg-light-bg py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-body dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors mb-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Retour au site
        </Link>

        <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">LÉGAL</p>
        <h1 className="text-3xl md:text-4xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-2">
          Conditions Générales de Vente
        </h1>
        <p className="text-sm font-body dark:text-dark-subtle text-light-subtle mb-12">
          noctara. — Kandemir MOUHAMMED · Dernière mise à jour : Juillet 2025
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
