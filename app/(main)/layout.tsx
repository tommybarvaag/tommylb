import Footer from "@/components/footer";
import Main from "@/components/main";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
