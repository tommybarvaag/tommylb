import { Suspense } from "react";

import { ShowPlatform } from "@/app/(cv)/cv/_components/show-platform";
import ConnectDialog from "@/app/@modal/_components/connect-dialog";
import ConnectDrawer from "@/app/@modal/_components/connect-drawer";

export default function ConnectDialogPage() {
  return (
    <Suspense fallback={<ConnectDialog />}>
      <ShowPlatform
        platforms={{
          desktop: <ConnectDialog />,
          touch: <ConnectDrawer />,
          fallback: <ConnectDialog />
        }}
      />
    </Suspense>
  );
}
