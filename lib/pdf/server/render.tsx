import { renderToBuffer } from "@react-pdf/renderer";

import { registerCvPdfFonts } from "@/lib/pdf/server/fonts";
import { CvPdfTemplate } from "@/lib/pdf/templates/cv";
import { buildCvPdfData } from "@/lib/pdf/templates/cv/data";

export async function renderCvPdf() {
  registerCvPdfFonts();

  return renderToBuffer(<CvPdfTemplate data={buildCvPdfData()} />);
}
