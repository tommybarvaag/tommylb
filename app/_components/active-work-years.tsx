import { Link } from "@/app/_components/ui/link";
import { getActiveWorkYears } from "@/utils/date-utils";
import { Text } from "./ui/text";

function ActiveWorkYears() {
  return (
    <Text>
      For over <Link href="/cv/about">{getActiveWorkYears()}</Link>, I&apos;ve been building web
      solutions for great companies. I thrive on experimenting with new technologies and
      continuously expanding my knowledge—it&apos;s what drives me.
    </Text>
  );
}

export { ActiveWorkYears };
