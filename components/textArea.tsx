import clsx from "clsx";
import { motion } from "framer-motion";
import * as React from "react";
import Text from "./text";

type TextAreaProps = {
  id: string;
  label: string;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
};

const TextArea = React.forwardRef<React.ElementRef<"textarea">, TextAreaProps>(function TextArea(
  { id, label, error, helperText = "Required", ...other }: TextAreaProps,
  ref
) {
  return (
    <div className={clsx("flex flex-col mb-6")}>
      <label className="block text-sm text-gray-900 dark:text-gray-100">{label}</label>
      <textarea
        className="resize-none px-4 py-2 mt-1 mb-2 focus:ring-blue-500 border focus:border-blue-500 block w-full border-gray-900 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        ref={ref}
        {...other}
      />
      <motion.div
        initial={error ? "open" : "collapsed"}
        animate={error ? "open" : "collapsed"}
        inherit={false}
        variants={{
          open: {
            opacity: 1,
            height: "auto"
          },
          collapsed: { opacity: 0, height: 0 }
        }}
        transition={{
          ease: "easeOut"
        }}
      >
        <Text className="text-sm !text-red-600 dark:!text-red-700" noMargin>
          {error ? helperText : <>&nbsp;</>}
        </Text>
      </motion.div>
    </div>
  );
});

export default TextArea;
