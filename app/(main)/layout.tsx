import Main from "@/components/main";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const name = "Tommy Lunde Barvåg";

  return <Main className="pt-14 sm:pt-32">{children}</Main>;
}
