import MDXComponents from "@/components/mdx/customComponents";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "next-themes";
import "styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <MDXProvider components={MDXComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}
