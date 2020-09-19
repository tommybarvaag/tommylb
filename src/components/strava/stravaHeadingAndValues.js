import * as React from "react";
import { Container, Heading } from "theme-ui";
import StravaNameAndValue from "./stravaNameAndValue";

export default function StravaHeadingAndValues({ title, nameAndValues = [], ...other }) {
  if (nameAndValues?.length <= 0) {
    return null;
  }

  return (
    <Container mt={0} {...other}>
      <Heading>{title}</Heading>
      {nameAndValues.map((nameAndValue, index) => (
        <StravaNameAndValue
          key={`${title}-name-and-value-${index}`}
          name={nameAndValue.name}
          value={nameAndValue.value}
        />
      ))}
    </Container>
  );
}
