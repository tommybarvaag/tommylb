import Footer from "@/components/footer";
import Main from "@/components/main";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Main className="pt-14 sm:pt-32">{children}</Main>
      <Footer />
    </>
  );
}
