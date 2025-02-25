import { unstable_ViewTransition as ViewTransition } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition>
      <main className="mx-auto max-w-2xl grow pt-14 sm:pt-32">{children}</main>
      <footer className="mx-auto max-w-2xl pt-32">
        <span className="mt-8 text-center text-sm text-zinc-400">
          &copy; {new Date().getFullYear()} Tommy Lunde Barvåg
        </span>
      </footer>
    </ViewTransition>
  );
}
