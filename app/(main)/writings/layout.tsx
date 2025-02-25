import { ReactNode, unstable_ViewTransition as ViewTransition } from "react";

export default function WritingsLayout({ children }: { children: ReactNode }) {
  return (
    <ViewTransition name="writings-layout">
      <article className="prose prose-zinc prose-h1:text-base prose-h2:text-base prose-h3:text-base prose-h4:text-base prose-h5:text-base prose-h6:text-base">
        {children}
      </article>
    </ViewTransition>
  );
}
