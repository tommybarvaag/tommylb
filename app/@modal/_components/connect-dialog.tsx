"use client";

import ContactMeForm from "@/components/contact-me-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/dialog";

import { useRouteModal } from "@/hooks/use-route-modal";

export default function ConnectDialog() {
  const { open, onOpenChange, onOpenChangeComplete } = useRouteModal();

  return (
    <Dialog open={open} onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
      <DialogContent className="flex min-h-[540px] flex-1 flex-col">
        <DialogHeader>Connect</DialogHeader>
        <DialogDescription>Connect with me</DialogDescription>
        <ContactMeForm className="mb-0" location="connect-dialog" />
      </DialogContent>
    </Dialog>
  );
}
