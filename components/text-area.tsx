import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as React from "react";
import Text from "./text";

type TextAreaProps = React.ComponentPropsWithoutRef<"textarea"> & {
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
    <div className={cn("mb-6 flex flex-col")}>
      <label className="block text-sm text-zinc-100">{label}</label>
      <textarea
        className="mt-1 mb-2 block w-full resize-none scroll-py-2 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-100 focus:border-blue-500 focus:ring-blue-500"
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
        <Text className="text-sm !text-red-700" noMargin>
          {error ? helperText : <>&nbsp;</>}
        </Text>
      </motion.div>
    </div>
  );
});

export default TextArea;
