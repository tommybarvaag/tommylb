"use client";

import { Button } from "@/components/button";
import ContactMeForm from "@/components/contact-me-form";
import { Drawer, DrawerClose, DrawerContent } from "@/components/drawer";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import Text from "@/components/text";
import { useRouter } from "next/navigation";

export default function ConnectDialogVaul() {
  const router = useRouter();

  return (
    <Drawer
      open
      onOpenChange={open => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DrawerContent className="fixed inset-x-0 bottom-0 mx-auto mt-24 flex h-full max-h-[96%] max-w-[1080px] flex-col rounded-t-[10px] bg-zinc-900 px-4 py-6">
        <DrawerClose asChild>
          <Button className="absolute right-4 top-4" variant="ghost">
            <Icons.X />
          </Button>
        </DrawerClose>
        <Heading noMargin>Connect</Heading>
        <Text>
          If you have any questions or would like to work with me, please fill out the form below.
        </Text>
        <Text>I will get back to you as soon as possible. Thank you for your interest!</Text>
        <ContactMeForm className="mt-4" location="connect-dialog" />
      </DrawerContent>
    </Drawer>
  );
}
