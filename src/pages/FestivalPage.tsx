import brushHero1 from "@/assets/brush-hero1.png";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const values = [
  {
    title: "Des voix à partager",
    description: "Le festival célèbre le chant collectif sous toutes ses formes : polyphonies, créations contemporaines et répertoires venus d'ici ou d'ailleurs.",
  },
  {
    title: "Un rendez-vous ouvert",
    description: "Artistes, habitants, curieux et passionnés se retrouvent pour vivre ensemble une journée de musique accessible et conviviale.",
  },
  {
    title: "Ancré à Rennes-sur-Loue",
    description: "Le festival fait résonner le village et son patrimoine, avec l'envie de créer un moment culturel chaleureux au cœur de la Loue.",
  },
];

const FestivalPage = () => (
  <div className="flex min-h-screen flex-col bg-background text-foreground">
    <Header />
    <main className="relative flex-1 overflow-hidden pt-16 md:pt-20">
      <img
        src={brushHero1}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="container-wide relative py-20 md:py-28">
        <span className="mb-8 block h-2 w-24 rounded-full bg-festival-purple" aria-hidden="true" />
        <h1 className="text-headline">Le festival</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/80 md:text-xl">
          Rennes en Voix est né d'une envie simple : réunir les personnes autour de la force des voix et du plaisir de chanter ensemble.
        </p>

        <section className="mt-14 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-label">Notre histoire</p>
            <h2 className="mt-4 text-headline">Faire entendre les voix</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              Imaginé à Rennes-sur-Loue, le festival crée un espace de rencontre entre ensembles vocaux, habitants et visiteurs. Chaque édition invite à découvrir des univers variés, du chant traditionnel aux explorations les plus actuelles.
            </p>
            <p>
              Plus qu'une succession de concerts, Rennes en Voix souhaite faire de la musique un moment de partage : écouter, échanger, se retrouver et laisser le village vibrer au rythme des voix.
            </p>
          </div>
        </section>

        <section className="mt-20">
          <p className="text-label">Ce qui nous anime</p>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <article key={value.title} className="rounded-2xl border border-border bg-card p-7 md:p-8">
                <span className={`block h-2 w-16 rounded-full ${["bg-festival-blue", "bg-festival-orange", "bg-festival-green"][index]}`} aria-hidden="true" />
                <h2 className="mt-6 font-display text-2xl font-bold">{value.title}</h2>
                <p className="mt-4 leading-relaxed text-foreground/75">{value.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-2xl bg-festival-purple p-8 text-white md:flex md:items-center md:justify-between md:gap-10 md:p-10">
          <div>
            <p className="font-display text-3xl font-bold">Envie de faire partie de l'aventure ?</p>
            <p className="mt-3 max-w-2xl text-white/85">Que vous souhaitiez soutenir le festival, proposer un partenariat ou simplement poser une question, nous serons ravis d'échanger avec vous.</p>
          </div>
          <Link to="/contact" className="mt-6 inline-flex shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-festival-purple md:mt-0">Nous contacter</Link>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default FestivalPage;
