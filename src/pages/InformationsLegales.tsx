import { Link } from "react-router-dom";
import { Entete } from "@/components/Entete";
import { PiedDePage } from "@/components/PiedDePage";
import { BoutonCopier } from "@/components/BoutonCopier";

const Contact = ({ email = "rennesenvoix@gmail.com" }: { email?: string }) => (
  <span className="inline-flex flex-wrap items-center gap-2">
    <span>{email}</span>
    <BoutonCopier value={email} label="Copier l’adresse e-mail" successMessage="Adresse e-mail copiée !" />
  </span>
);

export default function InformationsLegales({ confidentialite = false }: { confidentialite?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Entete />
      <main className="flex-1 pt-16 md:pt-20">
        <div className="container-wide pb-10 pt-6 md:pb-14 md:pt-10">
          <article className="mx-auto max-w-3xl space-y-8 leading-relaxed text-foreground/80 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_a]:underline [&_a]:underline-offset-4">
            <h1 className="text-headline text-foreground">{confidentialite ? "Politique de confidentialité" : "Mentions légales"}</h1>
            {confidentialite ? <>
              <p className="text-sm italic">Dernière mise à jour : <time dateTime="2026-10-05">5 octobre 2026</time></p>
              <section>
                <h2>Responsable du traitement</h2>
                <p>Association Les Regnaux, dont le siège social est situé au 1 Place du Village, 25440 Rennes sur Loue, représentée par Adrien Maire du Poset.</p>
                <p className="mt-3">Contact : <Contact /></p>
              </section>
              <section>
                <h2>Contact par e-mail</h2>
                <p>Le bouton de copie permet uniquement de copier l’adresse affichée dans votre presse-papiers. Vous pouvez ensuite la coller dans votre messagerie pour nous écrire.</p>
                <p className="mt-3">Si vous envoyez un message, cet échange a lieu en dehors du site, via les services de messagerie de l’expéditeur et du destinataire.</p>
              </section>
              <section>
                <h2>Hébergement et services externes</h2>
                <p>Le site est hébergé par GitHub Pages. GitHub indique enregistrer les adresses IP des visiteurs pour assurer la sécurité du service. Consultez sa <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">politique de confidentialité</a> pour les modalités de traitement et de conservation.</p>
                <p className="mt-3">Le site intègre des vidéos YouTube, une carte Google Maps, des polices Google Fonts et des images hébergées par Unsplash. Leur chargement transmet à ces prestataires des informations techniques, notamment votre adresse IP. Certains services peuvent utiliser des cookies ou d’autres traceurs. Les vidéos utilisent le domaine youtube-nocookie.com, sans que cela garantisse l’absence de tout traitement de données.</p>
                <p className="mt-3">Consultez les politiques de <a href="https://policies.google.com/privacy?hl=fr">Google (YouTube, Maps, Fonts et Gmail)</a> et d’<a href="https://unsplash.com/privacy">Unsplash</a>. Ces prestataires peuvent traiter des données hors de l’Union européenne ; leurs politiques précisent les garanties et les durées applicables.</p>
              </section>
              <section>
                <h2>Vidéos intégrées</h2>
                <p>Les vidéos sont hébergées par YouTube. Les lecteurs se chargent lorsqu’ils entrent dans la zone visible de la page, avant tout clic sur « Lire ». Sur l’accueil, la lecture démarre automatiquement, sans son, lorsque le navigateur le permet. Sur la page « Le festival », la lecture est déclenchée par le visiteur.</p>
                <p className="mt-3">La plateforme peut recevoir votre adresse IP et utiliser des cookies ou d’autres traceurs, selon la <a href="https://policies.google.com/privacy?hl=fr">politique de confidentialité de Google</a>.</p>
              </section>
              <section>
                <h2>Vos droits</h2>
                <p>Selon les conditions prévues par la réglementation, vous pouvez demander l’accès, la rectification, l’effacement ou la limitation du traitement de vos données, et vous opposer à leur traitement. Vous pouvez également demander la portabilité de vos données et retirer votre consentement lorsqu’un traitement repose sur celui-ci, dans les conditions prévues par la réglementation. Pour exercer vos droits auprès du responsable du traitement : <Contact email="rennesenvoix@gmail.com" />. Vous pouvez également adresser une réclamation à la <a href="https://www.cnil.fr/fr/plaintes">CNIL</a> : 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.</p>
              </section>
              <section>
                <h2>Sécurité</h2>
                <p>L’accès au site par HTTPS chiffre les échanges entre votre navigateur et l’hébergeur.</p>
              </section>
            </> : <>
              <p className="text-sm italic">Dernière mise à jour : <time dateTime="2026-10-05">5 octobre 2026</time></p>
              <section>
                <h2>Éditeur du site</h2>
                <p>Association Les Regnaux, association loi 1901</p>
                <address className="not-italic">Siège social : 1 Place du Village<br />25440 Rennes sur Loue</address>
                <p className="mt-3">Email : <Contact email="rennesenvoix@gmail.com" /></p>
              </section>
              <section>
                <h2>Directeur de la publication</h2>
                <p>Adrien Maire du Poset</p>
              </section>
              <section>
                <h2>Hébergement</h2>
                <p>Ce site est hébergé par GitHub Pages :</p>
                <p>GitHub, Inc.</p>
                <p>88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis</p>
                <p><a href="https://github.com">https://github.com</a></p>
              </section>
              <section>
                <h2>Propriété intellectuelle et droit à l’image</h2>
                <p>Sauf mention contraire, les textes, images, sons et vidéos présents sur ce site sont protégés par le droit d’auteur. Toute reproduction ou réutilisation sans autorisation préalable est interdite. Les crédits des œuvres et photographies de tiers sont indiqués à côté de celles-ci.</p>
                <p className="mt-3">Les photographies et vidéos de nos événements peuvent montrer des personnes identifiables. Si vous apparaissez sur une image et souhaitez son retrait, écrivez-nous à <Contact /> : nous la supprimerons rapidement.</p>
              </section>
              <section>
                <h2>Contenus et liens externes</h2>
                <p>Ce site peut contenir des vidéos hébergées par des plateformes tierces et des liens vers d’autres sites. L’éditeur n’est pas responsable de leur contenu ni de leurs pratiques en matière de données personnelles.</p>
              </section>
              <section>
                <h2>Données personnelles</h2>
                <p>Le traitement des données personnelles est décrit dans la <Link to="/confidentialite">Politique de confidentialité</Link>.</p>
              </section>
              <section>
                <h2>Droit applicable</h2>
                <p>Le présent site est soumis au droit français.</p>
              </section>
            </>}
          </article>
        </div>
      </main>
      <PiedDePage />
    </div>
  );
}
