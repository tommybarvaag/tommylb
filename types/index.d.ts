/// <reference types="react" />

import "react";

type AllowCSSVariables = { [key in `--${string}`]: string };

declare module "react" {
  export interface CSSProperties extends AllowCSSVariables {}
}

export type GitHubRelease = {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: GitHubAuthor;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: Date;
  published_at: Date;
  assets: any[];
  tarball_url: string;
  zipball_url: string;
  body: string;
  reactions: GitHubReactions;
};

export type GitHubAuthor = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

export type GitHubReactions = {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
};

export type Platform = "mobile" | "tablet" | "desktop" | "touch";

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
