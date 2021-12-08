import * as React from "react";
import Text from "../text";

type StravaNameAndValueProps = {
  name: string;
  value: number | string;
};

export default function StravaNameAndValue({ name, value, ...other }: StravaNameAndValueProps) {
  return (
    <div className="flex gap-3" {...other}>
      <Text as="div" className="flex-grow max-w-[220px]">
        {name}
      </Text>
      <Text as="div" className="text-right ml-auto">
        {value}
      </Text>
    </div>
  );
}
