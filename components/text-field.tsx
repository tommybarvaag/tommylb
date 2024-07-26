import Text from "@/components/text";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as React from "react";

type TextFieldProps = React.ComponentPropsWithoutRef<"input"> & {
  id: string;
  label: string;
  error?: boolean;
  helperText?: string;
  type?: string;
  placeholder?: string;
  value?: string;
};

const TextField = React.forwardRef<React.ElementRef<"input">, TextFieldProps>(function TextField(
  { className, id, label, error, helperText = "Required", type = "text", ...other },
  ref
) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col",
        {
          hidden: type === "hidden"
        },
        className
      )}
    >
      <label className="block text-sm text-zinc-100">{label}</label>
      <input
        className="mb-2 mt-1 block w-full rounded-md border  border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-100 focus:border-blue-500 focus:ring-blue-500"
        type={type}
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

export default TextField;
