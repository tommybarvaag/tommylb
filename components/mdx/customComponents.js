import Image from "next/image";
import Heading from "../heading";
import Link from "../link";
import { LastStravaActivity, StravaRunningGoals } from "../strava";
import Text from "../text";

const CustomLink = props => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const CustomImage = props => {
  return (
    <div className="my-4">
      <Image {...props} />
    </div>
  );
};

const MDXComponents = {
  Image: CustomImage,
  a: CustomLink,
  p: props => <Text className="mt-4 mb-4" {...props} />,
  h1: props => <Heading as="h1" className="mt-4 mb-4" {...props} />,
  h2: props => <Heading as="h2" className="mt-4 mb-4" {...props} />,
  h3: props => <Heading as="h3" className="mt-4 mb-4" {...props} />,
  h4: props => <Heading as="h4" className="mt-4 mb-4" {...props} />,
  h5: props => <Heading as="h5" className="mt-4 mb-4" {...props} />,
  h6: props => <Heading as="h6" className="mt-4 mb-4" {...props} />,
  StravaRunningGoals,
  LastStravaActivity
};

export default MDXComponents;
