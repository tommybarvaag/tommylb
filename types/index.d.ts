/// <reference types="react" />

import "react";

type AllowCSSVariables = { [key in `--${string}`]: string };

declare module "react" {
  export interface CSSProperties extends AllowCSSVariables {}
}

export type StravaApiActivity = {
  name: string;
  distance: number;
  movingTime: number;
  type: string;
  id: number;
  calories: number;
  totalElevationGain: number;
  startDate: Date;
  startDateLocal: Date;
  locationCountry: string;
  kudosCount: number;
  averageSpeed: number;
  maxSpeed: number;
  hasHeartRate: boolean;
  averageHeartRate: number;
  maxHeartRate: number;
  sufferScore: number;
  distanceInKilometers: number;
  formattedMovingTime: string;
  kilometersPerSecond: number;
  minutesPerKilometer: number;
  personalBests: StravaPersonalBest[];
  gear?: StravaGear;
};

export type StravaPersonalBest = {
  name: string;
  distance: number;
  distanceInKilometers: number;
  movingTime: number;
  formattedMovingTime: string;
  value: string;
};

export type StravaPersonalBestSimple = {
  name: string;
  value: string;
};

export type StravaGear = StravaGearSimple & {
  id: string;
  nickname: string;
  resource_state: number;
  retired: boolean;
  converted_distance: number;
};

export type StravaStats = {
  goals: StravaGoal[];
  personalBests: StravaPersonalBestSimple[];
  gear: StravaGearSimple[];
  allTime: StravaStatsSummary;
  thisYear: StravaStatsSummary;
  lastYear: StravaStatsSummary;
};

export type StravaStatsSummary = {
  activityCount: number;
  activityRunningCount: number;
  totalDistanceCovered: number;
  totalRunningDistanceCovered: number;
};

export type StravaGearSimple = {
  name: string;
  primary: boolean;
  distance: number;
};

export type StravaGoal = {
  name: string;
  value: string;
};

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

export type FrontMatterData = {
  title?: string;
  publishedAt?: string;
  summary?: string;
  image?: string;
  author?: string;
  categories?: string[];
  keywords?: string[];
  featured?: boolean;
  published?: boolean;
  unlisted?: boolean;
  readingTime?: FrontMatterReadingTime;
};

export type FrontMatterReadingTime = {
  text: string;
  minutes: number;
  time: number;
  words: number;
};

export type FileSystemPost = FrontMatterData & {
  slug: string;
  publishedAtDateFormatted: string;
};

type Merge<T, U> = Omit<T, keyof U> & U;

type PropsWithAs<P, T extends React.ElementType> = P & { as?: T };

export type PolymorphicPropsWithoutRef<P, T extends React.ElementType> = Merge<
  T extends keyof JSX.IntrinsicElements
    ? React.PropsWithoutRef<JSX.IntrinsicElements[T]>
    : React.ComponentPropsWithoutRef<T>,
  PropsWithAs<P, T>
>;

export type PolymorphicPropsWithRef<P, T extends React.ElementType> = Merge<
  T extends keyof JSX.IntrinsicElements
    ? React.PropsWithRef<JSX.IntrinsicElements[T]>
    : React.ComponentPropsWithRef<T>,
  PropsWithAs<P, T>
>;

// TODO:
// - PolymorphicFunctionComponent
// - PolymorphicVoidFunctionComponent (requires @types/react >=16.9.48)

type PolymorphicExoticComponent<P = {}, T extends React.ElementType = React.ElementType> = Merge<
  React.ExoticComponent<P & { [key: string]: unknown }>,
  {
    /**
     * **NOTE**: Exotic components are not callable.
     */
    <InstanceT extends React.ElementType = T>(
      props: PolymorphicPropsWithRef<P, InstanceT>
    ): React.ReactElement | null;
  }
>;

export type PolymorphicForwardRefExoticComponent<P, T extends React.ElementType> = Merge<
  React.ForwardRefExoticComponent<P & { [key: string]: unknown }>,
  PolymorphicExoticComponent<P, T>
>;

export type PolymorphicMemoExoticComponent<P, T extends React.ElementType> = Merge<
  React.MemoExoticComponent<React.ComponentType<any>>,
  PolymorphicExoticComponent<P, T>
>;

export type PolymorphicLazyExoticComponent<P, T extends React.ElementType> = Merge<
  React.LazyExoticComponent<React.ComponentType<any>>,
  PolymorphicExoticComponent<P, T>
>;
