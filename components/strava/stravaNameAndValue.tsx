import * as React from "react";
import Text from "../text";

type StravaNameAndValueProps = {
  name: string;
  value: number | string;
};

export default function StravaNameAndValue({ name, value, ...other }: StravaNameAndValueProps) {
  return (
    <div className="flex" {...other}>
      <Text as="div" className="mr-2 flex-grow">
        {name}
      </Text>
      <Text as="div">{value}</Text>
    </div>
  );
}
