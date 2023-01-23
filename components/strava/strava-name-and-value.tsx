import Text from "../text";

type StravaNameAndValueProps = {
  name: string;
  value: number | string;
};

export default function StravaNameAndValue({ name, value, ...other }: StravaNameAndValueProps) {
  return (
    <div className="flex gap-3" {...other}>
      <Text as="div" className="mb-0 max-w-[220px] grow">
        {name}
      </Text>
      <Text as="div" className="ml-auto mb-0 text-right">
        {value}
      </Text>
    </div>
  );
}
