import * as React from "react";
import { Image as ThemeUiImage } from "theme-ui";

export default function Image({ jpg, webp, alt, loading = "lazy", ...other }) {
  return (
    <picture>
      <source srcset={webp} type="image/webp" />
      <source srcset={jpg} type="image/jpeg" />
      <ThemeUiImage src={jpg} alt={alt ?? "Missing alt"} loading={loading} {...other} />
    </picture>
  );
}
