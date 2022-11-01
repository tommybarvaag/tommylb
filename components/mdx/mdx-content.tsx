"use client";

import ContactMe from "@/components/contactMe";
import { LastStravaActivity, StravaRunningGoals } from "@/components/strava";
import Image from "next/image";

const components = { ContactMe, Image, LastStravaActivity, StravaRunningGoals };

import { MDXRemote } from "next-mdx-remote";

export function MdxContent({ source }) {
  return <MDXRemote components={components} {...source} />;
}
