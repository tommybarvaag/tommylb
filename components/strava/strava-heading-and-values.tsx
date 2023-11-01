import { Heading } from "../heading";
import StravaNameAndValue from "./strava-name-and-value";

type StravaHeadingAndValuesProps = {
  title: string;
  nameAndValues: Array<{ name: string; value: string | number }>;
};

export default function StravaHeadingAndValues({
  title,
  nameAndValues = [],
  ...other
}: StravaHeadingAndValuesProps) {
  return nameAndValues?.length > 0 ? (
    <div className="mb-12 w-full" {...other}>
      <Heading variant="h2" className="mb-3">
        {title}
      </Heading>
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
