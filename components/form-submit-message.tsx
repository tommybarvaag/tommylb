"use client";

import Text from "@/components/text";
import { AnimatePresence, motion } from "framer-motion";

type FormSubmitMessageProps = {
  text: string;
  icon?: JSX.Element;
};

export default function FormSubmitMessage({ text, icon }: FormSubmitMessageProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: +300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: +300, opacity: 0 }}
        transition={{
          type: "spring",
          bounce: 0.25
        }}
      >
        <div className="mt-8 flex items-center space-x-4 rounded-lg border-zinc-700 bg-zinc-900 text-zinc-100">
          {icon ? <div className="flex-initial">{icon}</div> : null}
          <div className="flex-initial">
            <Text variant="small">{text}</Text>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
