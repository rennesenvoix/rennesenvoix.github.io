import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const FestivalPage = () => (
  <div className="flex min-h-screen flex-col bg-background text-foreground">
    <Header />
    <main className="flex flex-1 items-center justify-center px-6 pt-16 text-center md:pt-20">
      <div className="py-20">
        <span className="mx-auto mb-8 block h-2 w-24 rounded-full bg-festival-purple" aria-hidden="true" />
        <h1 className="text-headline">Le festival</h1>
        <p className="mt-5 text-xl font-semibold text-foreground/70">Page en construction</p>
        <p className="mt-2 text-foreground/60">Le contenu sera bientôt disponible.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default FestivalPage;
