import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
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
        <div className="flex justify-center items-center p-4 space-x-4 border-gray-900 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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
