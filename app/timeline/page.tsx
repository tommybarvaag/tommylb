import Heading from "@/components/heading";
import Text from "@/components/text";
import { TimelineFromBirthUntilNow } from "@/components/timeline";

export default function Timeline() {
  return (
    <>
      <div className="w-full mb-12">
        <Heading as="pageHeading">This is my timeline from birth until now</Heading>
        <Text>Read along this timeline to get to now me a little better.</Text>
      </div>
      <TimelineFromBirthUntilNow showAll heading={null} />
    </>
  );
}
