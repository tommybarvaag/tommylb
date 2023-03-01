"use client";

import { AnimatePresence, motion } from "framer-motion";
import Text from "./text";

type FormSubmitMessageProps = {
  text: string;
  icon?: JSX.Element;
};

export default function FormSubmitMessage({ text, icon }: FormSubmitMessageProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: "spring"
        }}
      >
        <div className="flex items-center space-x-4 rounded-md border-zinc-700 bg-zinc-900 text-zinc-100">
          {icon ? <div className="flex-initial">{icon}</div> : null}
          <div className="flex-initial">
            <Text className="text-sm" noMargin>
              {text}
            </Text>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
