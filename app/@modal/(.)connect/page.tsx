import { ShowPlatform } from "@/app/(cv)/cv/_components/show-platform";
import ConnectDialog from "@/app/@modal/_components/connect-dialog";
import ConnectDialogVaul from "@/app/@modal/_components/connect-vaul";

export const runtime = "experimental-edge";

export default function ConnectDialogPage() {
  return (
    <ShowPlatform
      platforms={{
        desktop: <ConnectDialog />,
        touch: <ConnectDialogVaul />,
        fallback: <ConnectDialog />
      }}
    />
  );
}
