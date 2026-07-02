import "react";

type AllowCSSVariables = { [key in `--${string}`]: string };

declare module "react" {
  export interface CSSProperties extends AllowCSSVariables {}
}

export type ShowPlatforms = {
  mobile?: ReactNode;
  tablet?: ReactNode;
  desktop?: ReactNode;
  touch?: ReactNode;
  bot?: ReactNode;
  fallback?: ReactNode;
};

export type ShowPlatformProps = {
  platforms: ShowPlatforms;
};
