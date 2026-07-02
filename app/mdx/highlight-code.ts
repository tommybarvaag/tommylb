import { cacheLife } from "next/cache";

import {
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from "@shikijs/transformers";
import { codeToHtml, createCssVariablesTheme } from "shiki";

const cssVariablesTheme = createCssVariablesTheme({});

// Deterministic per (code, lang) → cache it so Shiki's internal Date.now() is prerendered,
// not treated as uncached dynamic IO by Cache Components (which fails the build).
export async function highlightCode(code: string, lang: string) {
  "use cache";
  cacheLife("max");

  return codeToHtml(code, {
    lang,
    theme: cssVariablesTheme,
    transformers: [
      {
        pre(hast) {
          if (hast.children.length !== 1) {
            throw new Error("<pre>: Expected a single <code> child");
          }

          if (hast.children[0].type !== "element") {
            throw new Error("<pre>: Expected a <code> child");
          }

          return hast.children[0];
        },
        postprocess(rawHtml) {
          return rawHtml.replace(/^<code>|<\/code>$/g, "");
        }
      },
      transformerNotationHighlight(),
      transformerNotationWordHighlight()
    ]
  });
}
