import Text from "@/components/text";

type StravaNameAndValueProps = {
  name: string;
  value: number | string;
};

export default function StravaNameAndValue({ name, value, ...other }: StravaNameAndValueProps) {
  return (
    <div className="flex gap-3" {...other}>
      <Text className="mb-0 max-w-[220px] grow" noMargin>
        {name}
      </Text>
      <Text className="mb-0 ml-auto text-right" noMargin>
        {value}
      </Text>
    </div>
  );
}
