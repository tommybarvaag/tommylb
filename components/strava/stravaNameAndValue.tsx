import Text from "../text";

type StravaNameAndValueProps = {
  name: string;
  value: number | string;
};

export default function StravaNameAndValue({ name, value, ...other }: StravaNameAndValueProps) {
  return (
    <div className="flex gap-3" {...other}>
      <Text as="div" className="flex-grow max-w-[220px] mb-0">
        {name}
      </Text>
      <Text as="div" className="text-right ml-auto mb-0">
        {value}
      </Text>
    </div>
  );
}
