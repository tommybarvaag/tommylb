import Image from "next/image";
import Link from "next/link";
import ContactMe from "../contactMe";
import Heading from "../heading";
import { LastStravaActivity, StravaRunningGoals } from "../strava";
import Text from "../text";

const CustomLink = props => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link
        className="bg-gradient-to-r dark:from-green-600 dark:to-green-600 bg-growing-underline"
        href={href}
      >
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return (
    <a
      className="bg-gradient-to-r from-green-500 to-green-500 dark:from-green-600 dark:to-green-600 bg-growing-underline"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  );
};

const CustomImage = props => {
  const { src, alt, ...other } = props;
  return (
    <div className="my-4">
      <Image src={src} alt={alt} {...other} />
    </div>
  );
};

const CustomParagraph = props => <Text className="mt-4 mb-4" {...props} />;
const CustomH1 = props => <Heading as="h1" className="mt-4 mb-4" {...props} />;
const CustomH2 = props => <Heading as="h2" className="mt-4 mb-4" {...props} />;
const CustomH3 = props => <Heading as="h3" className="mt-4 mb-4" {...props} />;
const CustomH4 = props => <Heading as="h4" className="mt-4 mb-4" {...props} />;

const MDXComponents = {
  Image: CustomImage,
  a: CustomLink,
  p: CustomParagraph,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
  StravaRunningGoals,
  LastStravaActivity,
  ContactMe
};

export default MDXComponents;
