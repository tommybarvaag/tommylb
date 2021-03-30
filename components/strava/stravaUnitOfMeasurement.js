import * as React from "react";
import Text from "../text";

export default function StravaUnitOfMeasurement({ title, value, ...other }) {
  return (
    <div className="flex flex-col justify-center align-center mr-6" {...other}>
      <Text className="text-sm">{title}</Text>
      <Text className="text-lg font-bold">{value}</Text>
    </div>
  );
}
