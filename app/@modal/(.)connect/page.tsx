import { ShowPlatform } from "@/app/(cv)/cv/_components/show-platform";
import ConnectDialog from "@/app/@modal/_components/connect-dialog";
import ConnectDialogVaul from "@/app/@modal/_components/connect-vaul";
import { Suspense } from "react";

export default function ConnectDialogPage() {
  return (
    <Suspense fallback={<ConnectDialog />}>
      <ShowPlatform
        platforms={{
          desktop: <ConnectDialog />,
          touch: <ConnectDialogVaul />,
          fallback: <ConnectDialog />
        }}
      />
    </Suspense>
  );
}
