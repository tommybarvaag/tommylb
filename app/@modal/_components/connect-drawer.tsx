"use client";

import { Button } from "@/components/button";
import ContactMeForm from "@/components/contact-me-form";
import { Drawer, DrawerClose, DrawerContent } from "@/components/drawer";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import Text from "@/components/text";

import { useRouteModal } from "@/hooks/use-route-modal";

export default function ConnectDrawer() {
  const { open, onOpenChange, onOpenChangeComplete } = useRouteModal();

  return (
    <Drawer
      open={open}
      swipeDirection="down"
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
    >
      <DrawerContent className="fixed inset-x-0 bottom-0 mx-auto mt-24 flex h-full max-h-[96%] max-w-[1080px] flex-col rounded-t-[10px] bg-background px-4 py-6">
        <DrawerClose
          render={
            <Button className="absolute top-4 right-4" variant="ghost">
              <Icons.X />
            </Button>
          }
        />
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
