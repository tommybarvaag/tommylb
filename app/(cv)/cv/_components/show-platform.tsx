import { ShowPlatformContent } from "@/app/(cv)/cv/_components/show-platform-content";
import { getPlatform } from "@/lib/actions/bowser-actions";
import { ShowPlatformProps } from "@/types";

async function ShowPlatform({
  platforms: { mobile, tablet, desktop, touch, bot, fallback }
}: ShowPlatformProps) {
  const platform = await getPlatform();

  return (
    <ShowPlatformContent
      platform={platform}
      platforms={{ mobile, tablet, desktop, touch, bot, fallback }}
    />
  );
}

export { ShowPlatform };
