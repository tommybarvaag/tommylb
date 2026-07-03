import { Font } from "@react-pdf/renderer";
import { join } from "node:path";

let hasRegistered = false;

export function registerCvPdfFonts() {
  if (hasRegistered) {
    return;
  }

  Font.register({
    family: "Geist",
    fonts: [
      { src: join(process.cwd(), "assets/fonts/Geist-Regular.otf"), fontWeight: 400 },
      { src: join(process.cwd(), "assets/fonts/Geist-Bold.otf"), fontWeight: 700 }
    ]
  });
  // A CV reads better ragged-right than hyphenated.
  Font.registerHyphenationCallback(word => [word]);

  hasRegistered = true;
}
