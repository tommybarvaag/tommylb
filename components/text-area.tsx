import * as React from "react";

import { Field } from "@base-ui/react/field";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import Text from "@/components/text";

type TextAreaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  id: string;
  label: string;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
};

const TextArea = React.forwardRef<React.ComponentRef<"textarea">, TextAreaProps>(function TextArea(
  { id, label, error, helperText = "Required", ...other }: TextAreaProps,
  ref
) {
  return (
    <Field.Root className={cn("mb-6 flex flex-col")}>
      <Field.Label className="block text-sm text-foreground">{label}</Field.Label>
      <Field.Control
        render={props => (
          <textarea
            {...props}
            {...other}
            className="mt-1 mb-2 block w-full resize-none scroll-py-2 rounded-md border border-border bg-background px-4 py-2 text-foreground focus:border-ring focus:ring-ring"
            ref={ref}
          />
        )}
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

export default TextArea;
