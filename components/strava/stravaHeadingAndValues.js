import * as React from "react";
import Heading from "../heading";
import StravaNameAndValue from "./stravaNameAndValue";

export default function StravaHeadingAndValues({ title, nameAndValues = [], ...other }) {
  return nameAndValues?.length > 0 ? (
    <div className="mb-12 w-full" {...other}>
      <Heading as="h2">{title}</Heading>
      {nameAndValues.map((nameAndValue, index) => (
        <StravaNameAndValue
          key={`${title}-name-and-value-${index}`}
          name={nameAndValue.name}
          value={nameAndValue.value}
        />
      ))}
    </div>
  ) : null;
}
