export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="mx-auto max-w-2xl pt-14 sm:pt-32">{children}</main>
      <footer />
    </>
  );
}
