import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Landing from "@/modules/landing/landing";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Landing />
      </main>
      <Footer />
    </div>
  );
}
