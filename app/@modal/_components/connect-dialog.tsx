"use client";

import ContactMeForm from "@/components/contact-me-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/dialog";
import { useRouter } from "next/navigation";

export default function ConnectDialog() {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={open => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>Connect</DialogHeader>
        <DialogDescription>Connect with me</DialogDescription>
        <ContactMeForm className="mb-0" location="connect-dialog" />
      </DialogContent>
    </Dialog>
  );
}
