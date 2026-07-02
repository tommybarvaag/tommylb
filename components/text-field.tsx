import * as React from "react";

import { Field } from "@base-ui/react/field";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import Text from "@/components/text";

type TextFieldProps = React.ComponentPropsWithoutRef<"input"> & {
  id: string;
  label: string;
  error?: boolean;
  helperText?: string;
  type?: string;
  placeholder?: string;
  value?: string;
};

const TextField = React.forwardRef<React.ComponentRef<"input">, TextFieldProps>(function TextField(
  { className, id, label, error, helperText = "Required", type = "text", ...other },
  ref
) {
  return (
    <Field.Root
      className={cn(
        "mb-6 flex flex-col",
        {
          hidden: type === "hidden"
        },
        className
      )}
    >
      <Field.Label className="block text-sm text-foreground">{label}</Field.Label>
      <Field.Control
        render={
          <input
            className="mt-1 mb-2 block w-full rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-ring focus:ring-ring"
            type={type}
            ref={ref}
          />
        }
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
        <Text className="text-sm text-red-700!" noMargin>
          {error ? helperText : <>&nbsp;</>}
        </Text>
      </motion.div>
    </Field.Root>
  );
});

export default TextField;
