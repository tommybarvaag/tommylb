import { getActiveWorkYears } from "@/utils/date-utils";
import Link from "next/link";

function ActiveWorkYears() {
  return (
    <>
      I&apos;ve spent the <Link href="/cv/about">last {getActiveWorkYears()}</Link> creating web
      solutions for great companies. Experimenting with new technologies and learning new things is
      what I love the most.
    </>
  );
}

export { ActiveWorkYears };
