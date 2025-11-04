import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Capitulos from "../../../../modules/escritura/capitulos";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Capitulos storyId={params.id} />
      </main>
      <Footer />
    </div>
  );
}
