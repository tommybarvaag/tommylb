import * as React from "react";
import Text from "../text";

export default function StravaNameAndValue({ name, value, ...other }) {
  return (
    <div className="flex" {...other}>
      <Text as="div" className="mr-2 flex-grow">
        {name}
      </Text>
      <Text as="div">{value}</Text>
    </div>
  );
}
